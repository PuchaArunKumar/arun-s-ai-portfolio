import { person } from '@/content/site';
import { ExtLink } from './primitives';

const Footer = () => (
  <footer className="site-footer gutter">
    <div className="frame">
      <div className="mb-5 h-px bg-hairline" />
      <p>
        © {new Date().getFullYear()} {person.name} ·{' '}
        <ExtLink href={person.source} className="ed-link">
          Source on GitHub
        </ExtLink>
      </p>
    </div>
  </footer>
);

export default Footer;
