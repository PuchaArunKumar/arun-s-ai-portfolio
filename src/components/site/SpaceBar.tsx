import { Link, NavLink, useLocation } from 'react-router-dom';
import { spaces } from '@/content/site';

// The bar that moves between the three pages. On narrow screens the short label
// shows and the full one stays in the accessible name, so the link reads the
// same to everyone; swiping sideways (see Spaces) replaces the arrows there.
const SpaceBar = () => {
  const { pathname } = useLocation();
  const index = spaces.findIndex((space) => space.to === pathname);
  const prev = index > 0 ? spaces[index - 1] : null;
  const next = index >= 0 && index < spaces.length - 1 ? spaces[index + 1] : null;

  return (
    <nav aria-label="Pages" className="space-bar gutter no-print">
      <div className="frame">
        <ol className="space-tabs" role="list">
          {spaces.map((space) => (
            <li key={space.to}>
              <NavLink to={space.to} end className="space-tab">
                <span className="space-num" aria-hidden="true">
                  {space.num}
                </span>
                <span className="sm:hidden" aria-hidden="true">
                  {space.short}
                </span>
                <span className="sr-only sm:not-sr-only">{space.label}</span>
              </NavLink>
            </li>
          ))}
        </ol>
        <div className="space-arrows">
          {prev ? (
            <Link to={prev.to} className="space-arrow" aria-label={`Previous page: ${prev.label}`}>
              <span aria-hidden="true">←</span>
            </Link>
          ) : (
            <span className="space-arrow is-off" aria-hidden="true">
              ←
            </span>
          )}
          {next ? (
            <Link to={next.to} className="space-arrow" aria-label={`Next page: ${next.label}`}>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span className="space-arrow is-off" aria-hidden="true">
              →
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SpaceBar;
