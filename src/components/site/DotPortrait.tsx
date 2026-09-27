import { useEffect, useRef } from 'react';

/*
  The hero portrait: a 3D point cloud drawn on a canvas, no WebGL or library.

  public/images/arun-points.bin was made offline from a photo:
  - bytes [0, 10680): dot bits, 240 x 356, row-major, most significant bit first
  - bytes [10680, 21360): depth, one uint8 per 2x4-dot cell, 120 x 89
  Dots sit on a Braille-like lattice (2x4-dot cells with a gap between cells).
  Each dot is lifted to its cell's depth and drawn in perspective: nearer dots
  are larger and darker. The head turns to follow the pointer across the whole
  window (on touch screens, the page scroll) and holds its pose when the
  pointer stops. Frames are only drawn while it is still moving.
*/
const SRC = '/images/arun-points.bin';
const NX = 240;
const NY = 356;
const COLS = NX / 2;
const ROWS = NY / 4;
const GAP = 0.5;
const CELL_W = 2 + GAP;
const CELL_H = 4 + GAP;
const LAT_W = COLS * CELL_W;
const LAT_H = ROWS * CELL_H;

const DEPTH = 0.42; // front-to-back extent, as a fraction of the portrait's width
const CAMERA = 2.4; // camera distance, same units
const FIT = 0.9; // portrait width as a share of the canvas, leaving room to turn
const MAX_YAW = (28 * Math.PI) / 180;
const MAX_PITCH = (8 * Math.PI) / 180;
const REST_YAW = -0.12; // before the pointer moves: turned slightly towards the text
const LAYERS = 4; // depth bands, each drawn with its own opacity
const INTRO_MS = 1500;

export const DOT_ASPECT = LAT_W / LAT_H;

type Cloud = {
  n: number;
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
  accent: Uint8Array;
  // where each dot starts for the intro
  sx: Float32Array;
  sy: Float32Array;
  sz: Float32Array;
};

// Deterministic 0..1 noise so the scatter and accent dots never change.
const hash = (i: number, salt: number) => {
  let h = Math.imul(i ^ salt, 0x9e3779b1);
  h ^= h >>> 15;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  return ((h >>> 0) % 10000) / 10000;
};

const buildCloud = (buf: ArrayBuffer): Cloud => {
  const bytes = new Uint8Array(buf);
  const depth = bytes.subarray((NX * NY) / 8);
  let n = 0;
  for (let i = 0; i < NX * NY; i++) if (bytes[i >> 3] & (0x80 >> (i & 7))) n++;

  const c: Cloud = {
    n,
    x: new Float32Array(n),
    y: new Float32Array(n),
    z: new Float32Array(n),
    accent: new Uint8Array(n),
    sx: new Float32Array(n),
    sy: new Float32Array(n),
    sz: new Float32Array(n),
  };
  let k = 0;
  for (let iy = 0; iy < NY; iy++) {
    for (let ix = 0; ix < NX; ix++) {
      const i = iy * NX + ix;
      if (!(bytes[i >> 3] & (0x80 >> (i & 7)))) continue;
      const lx = (ix >> 1) * CELL_W + (ix & 1) + 0.5;
      const ly = (iy >> 2) * CELL_H + (iy & 3) + 0.5;
      c.x[k] = (lx - LAT_W / 2) / LAT_W;
      c.y[k] = (ly - LAT_H / 2) / LAT_W;
      c.z[k] = (depth[(iy >> 2) * COLS + (ix >> 1)] / 255 - 0.5) * DEPTH;
      c.accent[k] = (ix * 7919 + iy * 104729) % 11 === 0 ? 1 : 0;
      c.sx[k] = (hash(k, 11) - 0.5) * 0.9;
      c.sy[k] = (hash(k, 23) - 0.5) * 0.5;
      c.sz[k] = 0.35 + hash(k, 37) * 0.9;
      k++;
    }
  }
  return c;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const DotPortrait = ({ className, label }: { className?: string; label: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    let alive = true;
    let cloud: Cloud | null = null;
    let raf = 0;
    let onScreen = true;
    let tabVisible = !document.hidden;
    let colours = { ink: '', accent: '' };
    let size = { w: 0, h: 0, dpr: 1 };

    // current and target orientation, in radians
    let yaw = REST_YAW;
    let pitch = 0;
    let targetYaw = yaw;
    let targetPitch = pitch;
    let introStart = 0;
    let lastFrame = 0;

    const readColours = () => {
      const css = getComputedStyle(document.documentElement);
      colours = {
        ink: `hsl(${css.getPropertyValue('--fg').trim()})`,
        accent: `hsl(${css.getPropertyValue('--signal').trim()})`,
      };
    };

    const fitCanvas = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      if (w === size.w && h === size.h && dpr === size.dpr) return;
      size = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    const draw = (intro: number) => {
      if (!cloud || !size.w || !size.h) return;
      const { w, h, dpr } = size;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const scale = w * FIT;
      const r0 = Math.max(0.5, (scale / LAT_W) * 0.42);
      const cx = w / 2;
      const cy = h / 2;
      const cy0 = Math.cos(yaw);
      const sy0 = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const e = easeOut(intro);
      const spread = 1 - e;

      const layers: Path2D[] = [];
      for (let i = 0; i < LAYERS * 2; i++) layers.push(new Path2D());

      const { n, x, y, z, accent, sx, sy, sz } = cloud;
      for (let i = 0; i < n; i++) {
        const X = x[i] + sx[i] * spread;
        const Y = y[i] + sy[i] * spread;
        const Z = z[i] + sz[i] * spread;
        const x2 = X * cy0 + Z * sy0;
        const z2 = Z * cy0 - X * sy0;
        const y3 = Y * cp - z2 * sp;
        const z3 = Y * sp + z2 * cp;
        const k = CAMERA / (CAMERA - z3);
        const px = cx + x2 * k * scale;
        const py = cy + y3 * k * scale;
        const r = r0 * k;
        let band = Math.floor(((z3 / DEPTH) + 0.5) * LAYERS);
        band = band < 0 ? 0 : band >= LAYERS ? LAYERS - 1 : band;
        layers[band * 2 + accent[i]].rect(px - r, py - r, r * 2, r * 2);
      }

      for (let b = 0; b < LAYERS; b++) {
        ctx.globalAlpha = (0.55 + (0.45 * (b + 0.5)) / LAYERS) * e;
        ctx.fillStyle = colours.ink;
        ctx.fill(layers[b * 2]);
        ctx.fillStyle = colours.accent;
        ctx.fill(layers[b * 2 + 1]);
      }
      ctx.globalAlpha = 1;
    };

    const settled = () => Math.abs(targetYaw - yaw) < 1e-4 && Math.abs(targetPitch - pitch) < 1e-4;

    const frame = (now: number) => {
      raf = 0;
      if (!cloud || !onScreen || !tabVisible) return;
      const dt = Math.min(0.05, lastFrame ? (now - lastFrame) / 1000 : 1 / 60);
      lastFrame = now;
      const ease = reduceMotion ? 1 : 1 - Math.exp(-dt * 3.5);
      yaw += (targetYaw - yaw) * ease;
      pitch += (targetPitch - pitch) * ease;

      const intro = reduceMotion ? 1 : Math.min(1, (now - introStart) / INTRO_MS);
      fitCanvas();
      draw(intro);
      if (intro < 1 || !settled()) {
        raf = requestAnimationFrame(frame);
      } else {
        // at rest: stop drawing until the pointer, scroll, size or theme changes
        yaw = targetYaw;
        pitch = targetPitch;
        lastFrame = 0;
      }
    };

    const kick = () => {
      if (!raf && alive && cloud && onScreen && tabVisible) raf = requestAnimationFrame(frame);
    };

    const clamp = (v: number) => (v < -1 ? -1 : v > 1 ? 1 : v);

    // Desktop: the head looks towards the pointer, anywhere in the window.
    const onPointer = (ev: PointerEvent) => {
      if (ev.pointerType === 'touch') return;
      targetYaw = clamp((ev.clientX / window.innerWidth) * 2 - 1) * MAX_YAW;
      targetPitch = -clamp((ev.clientY / window.innerHeight) * 2 - 1) * MAX_PITCH;
      kick();
    };

    // Touch screens: scrolling the hero away turns the head across.
    const onScroll = () => {
      const t = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      targetYaw = (REST_YAW / MAX_YAW + (1 - REST_YAW / MAX_YAW) * t) * MAX_YAW;
      kick();
    };

    readColours();
    fetch(SRC)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(res.status)))
      .then((buf) => {
        if (!alive) return;
        cloud = buildCloud(buf);
        introStart = performance.now();
        kick();
      })
      .catch(() => {
        /* decorative: the page reads fine without it */
      });

    const resize = new ResizeObserver(kick);
    resize.observe(canvas);

    const theme = new MutationObserver(() => {
      readColours();
      kick();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // only draw while the portrait is on screen and the tab is visible
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      kick();
    });
    seen.observe(canvas);
    const onVisibility = () => {
      tabVisible = !document.hidden;
      kick();
    };
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      if (coarse) window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      resize.disconnect();
      theme.disconnect();
      seen.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ aspectRatio: String(DOT_ASPECT) }}
      role="img"
      aria-label={label}
    />
  );
};

export default DotPortrait;
