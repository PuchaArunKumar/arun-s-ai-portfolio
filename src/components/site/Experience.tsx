import { experience } from '@/content/site';
import { Action, Folio } from './primitives';

const Experience = () => (
  <section id="experience" aria-labelledby="experience-h" className="section-pad gutter">
    <div className="frame page-grid">
      <Folio num="02">Experience</Folio>
      <h2 id="experience-h" className="h2">
        Research, teaching, <em>and industry.</em>
      </h2>

      <ol className="ruled with-notes span-all" aria-label="Roles">
        {experience.map((r) => (
          <li key={r.title + r.when}>
            <div>
              <h3 className="item-title">{r.title}</h3>
              <p className="mb-2 text-[0.9375rem] font-medium">{r.org}</p>
              <p className="leading-[1.6]">{r.body}</p>
              {r.links && (
                <div className="item-links mt-2">
                  {r.links.map((l) => (
                    <Action key={l.href} {...l} />
                  ))}
                </div>
              )}
            </div>
            <p className="when">{r.when}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
