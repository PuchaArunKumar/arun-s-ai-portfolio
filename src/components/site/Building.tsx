import { building } from '@/content/site';
import { Accent, Action, Folio } from './primitives';

const Building = () => (
  <section id="building" aria-labelledby="building-h" className="accent-band section-pad gutter">
    <div className="frame page-grid">
      <Folio num="03">Building</Folio>
      <h2 id="building-h" className="h2 max-w-[20ch]">
        <Accent {...building.heading} />
      </h2>
      {building.body.map((p) => (
        <p key={p} className="intro-text">
          {p}
        </p>
      ))}

      <div className="mt-8">
        <h3 className="mono-label mb-3">{building.builtLabel}</h3>
        <ul className="band-list">
          {building.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="aside mt-8 lg:mt-2">
        <p className="mono-label leading-[1.8]">{building.meta}</p>
        <p className="mt-5 text-[0.9375rem] leading-[1.6]">{building.planned}</p>
        <p className="mt-4 text-[0.9375rem] leading-[1.6]">{building.ask}</p>
        <div className="item-links mt-3 flex-col items-start">
          {building.links.map((l) => (
            <Action key={l.href} {...l} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Building;
