import type { ReactNode } from 'react';

export const isExternal = (href: string) => /^https?:\/\//.test(href);

// A link that opens off-site in a new tab and says so to screen readers.
export const ExtLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) =>
  isExternal(href) ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );

// Mono underlined action, e.g. "Code ↗".
export const Action = ({ href, label }: { href: string; label: string }) => (
  <ExtLink href={href} className="ed-action">
    <span className="ed-action-label">{label}</span>
    {isExternal(href) && <span aria-hidden="true">↗</span>}
  </ExtLink>
);

// Section label: a numbered label above each heading.
export const Folio = ({ num, children }: { num: string; children: ReactNode }) => (
  <p className="section-label span-all">
    <span className="section-num">{num}</span>
    <span>{children}</span>
  </p>
);

// Headline with a trailing italic accent phrase.
export const Accent = ({ before, emphasis }: { before: string; emphasis: string }) => (
  <>
    {before}
    <em>{emphasis}</em>
  </>
);
