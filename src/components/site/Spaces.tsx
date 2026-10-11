import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { spaces } from '@/content/site';
import SpaceBar from './SpaceBar';

const SWIPE_MIN_PX = 80;
const SWIPE_MAX_MS = 700;

/** True when the touch began inside something that scrolls sideways itself. */
const inHorizontalScroller = (target: EventTarget | null) => {
  for (let el = target instanceof Element ? target : null; el && el !== document.body; el = el.parentElement) {
    if (el.matches('input, textarea, select, [contenteditable="true"]')) return true;
    const overflowX = getComputedStyle(el).overflowX;
    if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth) return true;
  }
  return false;
};

// Layout for the three pages. Each page renders its own <main id="main">.
const Spaces = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const index = spaces.findIndex((space) => space.to === pathname);

  // Which way the new page slides in: derived from the previous render's page.
  const [last, setLast] = useState(index);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  if (index !== last) {
    setDirection(index > last ? 'next' : 'prev');
    setLast(index);
  }

  const firstRender = useRef(true);
  useEffect(() => {
    document.title = spaces[index]?.title ?? spaces[0].title;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // A new page: start at its top, and move focus there so screen reader and
    // keyboard users are not left on the link they followed.
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [index]);

  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = (event: TouchEvent) => {
    touch.current =
      event.touches.length === 1 && !inHorizontalScroller(event.target)
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY, t: Date.now() }
        : null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start || index < 0) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < 2 * Math.abs(dy) || Date.now() - start.t > SWIPE_MAX_MS) return;
    const target = spaces[index + (dx < 0 ? 1 : -1)];
    if (target) navigate(target.to);
  };

  return (
    <div className="spaces" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SpaceBar />
      <div key={pathname} className={direction ? `space-enter-${direction}` : undefined}>
        <Outlet />
      </div>
    </div>
  );
};

export default Spaces;
