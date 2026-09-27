import { hero, person } from '@/content/site';
import { Accent, ExtLink } from './primitives';
import DotPortrait from './DotPortrait';

const Hero = () => (
  <section id="top" aria-labelledby="hero-h" className="gutter">
    <div className="frame hero-grid pt-[clamp(40px,7vw,84px)] pb-[clamp(8px,2vw,24px)]">
      <h1 id="hero-h" className="display hero-h1 enter">
        <Accent {...hero.headline} />
      </h1>

      <p className="hero-subhead enter delay-1 mt-[clamp(18px,3vw,28px)] max-w-[40ch] font-display text-[clamp(1.25rem,1.05rem+1vw,1.75rem)] font-normal italic leading-[1.2] tracking-[-0.01em]">
        {hero.subhead}
      </p>

      <DotPortrait className="hero-portrait" label={hero.portrait.label} />

      <div className="hero-intro intro-text enter delay-2 mt-[clamp(28px,5vw,44px)] space-y-4">
        {hero.intro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <div className="hero-cta enter delay-3 mt-[clamp(28px,5vw,40px)] flex flex-wrap items-center gap-x-4 gap-y-3 no-print">
        <a href={`mailto:${person.email}`} className="ed-button">
          Email me
        </a>
        <ExtLink href={person.resume} className="ed-button ghost">
          Résumé <span aria-hidden="true">↗</span>
        </ExtLink>
        <ExtLink href={person.github} className="ed-action ml-1">
          <span className="ed-action-label">GitHub</span>
          <span aria-hidden="true">↗</span>
        </ExtLink>
      </div>

      <dl className="facts hero-facts enter delay-4" aria-label="At a glance">
        {hero.facts.map((row) => (
          <div key={row.key}>
            <dt>{row.key}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Hero;
