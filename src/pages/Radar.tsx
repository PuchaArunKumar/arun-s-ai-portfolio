import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { Accent, Action, ExtLink, Folio } from '@/components/site/primitives';
import { radar } from '@/content/site';
import { daysUntil, loadRadarFeed, localToday, sortRadar, type RadarFeed, type RadarItem } from '@/lib/radar';

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; feed: RadarFeed };

const day = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const When = ({ item, today }: { item: RadarItem; today: string }) => {
  if (item.deadline) {
    const left = daysUntil(item.deadline, today);
    return (
      <span>
        <span className="result-key">Deadline</span> <time dateTime={item.deadline}>{day(item.deadline)}</time>
        {left <= 21 && <> · {left <= 0 ? 'closes today' : left === 1 ? 'closes tomorrow' : `${left} days left`}</>}
      </span>
    );
  }
  if (item.date) {
    return (
      <span>
        <time dateTime={item.date}>{day(item.date)}</time>
        {item.dateEnd && item.dateEnd !== item.date && (
          <>
            {' '}– <time dateTime={item.dateEnd}>{day(item.dateEnd)}</time>
          </>
        )}
      </span>
    );
  }
  return null;
};

// Page 03: the public part of the Opportunity Radar, read from the feed the
// weekly run publishes on the Abilitiverse site.
const Radar = () => {
  const [today] = useState(() => localToday());
  const [state, setState] = useState<State>({ status: 'loading' });

  const load = useCallback(() => {
    setState({ status: 'loading' });
    loadRadarFeed(radar.feedUrl, today).then(
      (feed) => setState({ status: 'ready', feed }),
      () => setState({ status: 'error' }),
    );
  }, [today]);

  useEffect(load, [load]);

  return (
    <>
      <Header sections={false} />
      <main id="main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="radar-h" className="gutter section-pad">
          <div className="frame">
            <Folio num="03">{radar.label}</Folio>
            <h1 id="radar-h" className="h2">
              <Accent {...radar.heading} />
            </h1>
            <p className="intro-text">{radar.intro}</p>
            <p className="readable muted mt-3">{radar.caveat}</p>

            {state.status === 'loading' && (
              <p role="status" className="mono-label mt-10">
                Loading this week’s list…
              </p>
            )}

            {state.status === 'error' && (
              <div className="mt-10" role="alert">
                <p>{radar.error}</p>
                <button type="button" className="ed-button ghost mt-4" onClick={load}>
                  Try again
                </button>
              </div>
            )}

            {state.status === 'ready' && (
              <>
                <p className="result mt-8" aria-live="polite">
                  <span>
                    {state.feed.items.length} open {state.feed.items.length === 1 ? 'listing' : 'listings'}
                  </span>
                  {state.feed.updated && <span>· updated {day(state.feed.updated)}</span>}
                  {state.feed.nextRun && <span>· next sweep {state.feed.nextRun}</span>}
                </p>
                {state.feed.items.length === 0 ? (
                  <p className="radar-empty muted">{radar.empty}</p>
                ) : (
                  radar.groups.map((group) => {
                    const items = sortRadar(state.feed.items.filter((item) => item.kind === group.kind));
                    return (
                      <section key={group.kind} aria-labelledby={`radar-${group.kind}`} className="radar-group">
                        <h2 id={`radar-${group.kind}`} className="section-label">
                          <span>{group.heading}</span>
                          <span className="section-num">({items.length})</span>
                        </h2>
                        {items.length === 0 ? (
                          <p className="muted">{group.empty}</p>
                        ) : (
                          <ul className="ruled" role="list">
                            {items.map((item) => (
                              <li key={item.id}>
                                <h3 className="item-title">
                                  <ExtLink href={item.url} className="ed-link">
                                    {item.title}
                                  </ExtLink>
                                </h3>
                                <p className="result">
                                  {[item.org, item.location].filter(Boolean).length > 0 && (
                                    <span>{[item.org, item.location].filter(Boolean).join(' · ')}</span>
                                  )}
                                  <When item={item} today={today} />
                                </p>
                                {item.summary && <p className="readable muted mt-2">{item.summary}</p>}
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    );
                  })
                )}
              </>
            )}

            <div className="item-links mt-10">
              {radar.links.map((link) => (
                <Action key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Radar;
