import { work } from '@/content/site';
import { Accent, Action, Folio } from './primitives';

const Work = () => (
  <section id="work" aria-labelledby="work-h" className="section-pad gutter">
    <div className="frame page-grid">
      <Folio num="01">Selected work</Folio>
      <h2 id="work-h" className="h2">
        <Accent {...work.heading} />
      </h2>
      <p className="readable muted">{work.intro}</p>

      <ol className="ruled with-notes span-all" aria-label="Projects">
        {work.projects.map((p) => (
          <li key={p.title}>
            <div>
              <p className={p.live ? 'kicker live' : 'kicker'}>{p.meta.join(' · ')}</p>
              <h3 className="item-title">{p.title}</h3>
              <p className="leading-[1.6]">{p.body}</p>
              {p.links.length > 0 && (
                <div className="item-links mt-3">
                  {p.links.map((l) => (
                    <Action key={l.href} {...l} />
                  ))}
                </div>
              )}
            </div>
            {(p.result || p.caveat) && (
              <aside className="sidenote" aria-label={`Result for ${p.title}`}>
                {p.result && (
                  <>
                    <p className="result-key">{p.result.key}</p>
                    <p className="result">{p.result.value}</p>
                  </>
                )}
                {p.caveat && <p className="sidenote-caveat">{p.caveat}</p>}
              </aside>
            )}
          </li>
        ))}
      </ol>

      <div className="span-all mt-[clamp(40px,6vw,64px)]">
        <h3 className="mono-label mb-0">{work.smaller.heading}</h3>
        <ul className="mt-4 grid list-none gap-0 border-t border-hairline p-0 lg:grid-cols-3 lg:gap-10 lg:border-t-0">
          {work.smaller.items.map((s) => (
            <li key={s.title} className="border-b border-hairline py-5 lg:border-b-0 lg:border-t lg:border-hairline">
              <h4 className="font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em]">{s.title}</h4>
              <p className="mt-2 text-[0.9375rem] leading-[1.55]">{s.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-5">
                <span className="when mt-0">{s.meta}</span>
                {s.links.map((l) => (
                  <Action key={l.href} {...l} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Work;
