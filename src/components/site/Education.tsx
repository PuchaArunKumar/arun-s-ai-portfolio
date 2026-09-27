import { education } from '@/content/site';
import { Folio } from './primitives';

const Education = () => (
  <section id="education" aria-labelledby="education-h" className="section-pad gutter pt-0">
    <div className="frame page-grid">
      <Folio num="04">Education</Folio>
      <h2 id="education-h" className="h2">
        Two degrees and <em>one paper.</em>
      </h2>

      <ol className="ruled with-notes span-all" aria-label="Degrees and paper">
        {education.degrees.map((d) => (
          <li key={d.title}>
            <div>
              <h3 className="item-title">{d.title}</h3>
              <p className="text-[0.9375rem] font-medium">{d.org}</p>
              {d.body && <p className="mt-2 leading-[1.6]">{d.body}</p>}
            </div>
            <p className="when">{d.when}</p>
          </li>
        ))}
        <li>
          <div>
            <p className="kicker live">Paper</p>
            <h3 className="font-display text-[length:var(--fs-item)] font-normal italic leading-[1.2] tracking-[-0.01em]">
              {education.paper.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] muted">{education.paper.detail}</p>
          </div>
          <p className="when">{education.paper.venue}</p>
        </li>
      </ol>
    </div>
  </section>
);

export default Education;
