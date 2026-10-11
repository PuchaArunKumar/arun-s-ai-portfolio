import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { nav, person } from '@/content/site';
import { ExtLink } from './primitives';

// On the portfolio page the header carries the section links; on the other two
// pages (Abilitiverse, the radar) it is just the name, résumé and theme.
const Header = ({ sections = true }: { sections?: boolean }) => (
  <header className="site-header gutter no-print">
    <div className="frame">
      {sections ? (
        <a href="#top" className="site-name">
          {person.name}
        </a>
      ) : (
        <Link to="/" className="site-name">
          {person.name}
        </Link>
      )}
      {sections && (
        <nav aria-label="Sections" className="site-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
      <div className="flex items-center gap-5">
        <ExtLink href={person.resume} className="ed-action">
          <span className="ed-action-label">Résumé</span>
          <span aria-hidden="true">↗</span>
        </ExtLink>
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default Header;
