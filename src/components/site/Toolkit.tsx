import { toolkit } from '@/content/site';
import { Folio } from './primitives';

const Toolkit = () => (
  <section id="toolkit" aria-labelledby="toolkit-h" className="section-pad gutter pt-0">
    <div className="frame page-grid">
      <Folio num="05">Toolkit</Folio>
      <h2 id="toolkit-h" className="h2">
        The tools behind <em>this work.</em>
      </h2>
      <p className="readable muted">Listed only if I have used it in a project, a course or an internship.</p>

      <dl className="tools span-all">
        {toolkit.map((g) => (
          <div key={g.group}>
            <dt className="mono-label">{g.group}</dt>
            <dd>
              {g.items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < g.items.length - 1 && (
                    <>
                      {' '}
                      <span aria-hidden="true" className="sep">
                        ·
                      </span>{' '}
                    </>
                  )}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default Toolkit;
