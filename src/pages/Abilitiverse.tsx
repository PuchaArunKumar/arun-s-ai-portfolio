import { useState } from 'react';
import Header from '@/components/site/Header';
import { Action } from '@/components/site/primitives';
import { abilitiverseLive } from '@/content/site';

// Page 02: the Abilitiverse prototype, live in a frame that fills the screen
// below the sticky bars. The full-site link stays visible because some flows
// (Google sign-in) refuse to run inside a frame.
const Abilitiverse = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Header sections={false} />
      <main id="main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="abilitiverse-h" className="embed-head gutter">
          <div className="frame">
            <div className="embed-head-row">
              <div className="min-w-0">
                <p className="mono-label">{abilitiverseLive.label}</p>
                <h1 id="abilitiverse-h" className="embed-title">
                  {abilitiverseLive.title}
                </h1>
                <p className="muted">{abilitiverseLive.intro}</p>
              </div>
              <div className="item-links">
                {abilitiverseLive.links.map((link) => (
                  <Action key={link.href} href={link.href} label={link.label} />
                ))}
              </div>
            </div>
            <p className="embed-note muted">{abilitiverseLive.note}</p>
          </div>
        </section>
        <div className="embed-frame">
          {!loaded && (
            <p role="status" className="embed-loading mono-label">
              Loading the live site…
            </p>
          )}
          <iframe
            src={abilitiverseLive.url}
            title={abilitiverseLive.frameTitle}
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </main>
    </>
  );
};

export default Abilitiverse;
