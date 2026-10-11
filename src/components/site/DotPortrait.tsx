import { useEffect, useRef } from 'react';

/*
  The hero portrait, drawn as dots rather than shown as a photo.

  public/images/arun-dots.bin is a dithered dot map made offline from the
  photo: 1 bit per dot, row-major, most significant bit first. Dots sit on a
  Braille-like lattice of 2x4-dot cells with a small gap between cells.
*/
const SRC = '/images/arun-dots.bin';
const NX = 240;
const NY = 356;
const GAP = 0.5;
const CELL_W = 2 + GAP;
const CELL_H = 4 + GAP;
const COLS = NX / 2;
const ROWS = NY / 4;

// width / height of the drawn lattice, so CSS can reserve the right box
export const DOT_ASPECT = (COLS * CELL_W) / (ROWS * CELL_H);

// Roughly one dot in eleven takes the accent colour, the same ones every time.
const isAccent = (ix: number, iy: number) => (ix * 7919 + iy * 104729) % 11 === 0;

const DotPortrait = ({ className, label }: { className?: string; label: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let bits: Uint8Array | null = null;
    let raf = 0;
    let revealed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      if (!bits) return;
      cancelAnimationFrame(raf);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const p = Math.min(w / (COLS * CELL_W), h / (ROWS * CELL_H));
      const r = Math.max(0.45, p * 0.34);
      const ox = (w - COLS * CELL_W * p) / 2 + p / 2;
      const oy = (h - ROWS * CELL_H * p) / 2 + p / 2;
      const css = getComputedStyle(document.documentElement);
      const ink = `hsl(${css.getPropertyValue('--fg').trim()})`;
      const accent = `hsl(${css.getPropertyValue('--signal').trim()})`;
      const data = bits;

      const drawRows = (from: number, to: number) => {
        const plain = new Path2D();
        const tinted = new Path2D();
        for (let iy = from; iy < to; iy++) {
          const py = oy + ((iy >> 2) * CELL_H + (iy & 3)) * p;
          for (let ix = 0; ix < NX; ix++) {
            const i = iy * NX + ix;
            if (!(data[i >> 3] & (0x80 >> (i & 7)))) continue;
            const px = ox + ((ix >> 1) * CELL_W + (ix & 1)) * p;
            (isAccent(ix, iy) ? tinted : plain).rect(px - r, py - r, 2 * r, 2 * r);
          }
        }
        ctx.fillStyle = ink;
        ctx.fill(plain);
        ctx.fillStyle = accent;
        ctx.fill(tinted);
      };

      if (revealed) {
        drawRows(0, NY);
        return;
      }
      // First paint: print the portrait a few rows at a time, top to bottom.
      let row = 0;
      const step = () => {
        const next = Math.min(NY, row + 6);
        drawRows(row, next);
        row = next;
        if (row < NY) raf = requestAnimationFrame(step);
        else revealed = true;
      };
      raf = requestAnimationFrame(step);
    };

    fetch(SRC)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(res.status)))
      .then((buf) => {
        bits = new Uint8Array(buf);
        draw();
      })
      .catch(() => {
        /* the portrait is decorative; the page reads fine without it */
      });

    // Redraw on resize (instantly once revealed) and when the theme changes.
    const resize = new ResizeObserver(() => {
      if (revealed) draw();
    });
    resize.observe(canvas);
    const theme = new MutationObserver(() => {
      revealed = true;
      draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      theme.disconnect();
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
