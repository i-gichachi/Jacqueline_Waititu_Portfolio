/*
  Small shared pieces (DESIGN-DIRECTION section 7): Band, Eyebrow, Note, NoteRef, StageChip, Tag,
  Breadcrumb, Pager, ErrorState. Copy always arrives as props from the content layer.
*/

import type { ReactNode } from 'react';
import { SiteLink } from './SiteLink.tsx';
import { isLinkable } from './linkable.ts';
import type { StageNumber } from '../lib/lifecycle.ts';

export type Tone = 'light' | 'paper' | 'chalk2' | 'dark' | 'cobalt';

export function Band({
  tone,
  as: As = 'section',
  tight = false,
  id,
  className,
  labelledBy,
  children,
}: {
  tone: Tone;
  as?: 'section' | 'div' | 'aside';
  tight?: boolean;
  id?: string;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <As id={id} aria-labelledby={labelledBy} className={[`band-${tone}`, tight ? 'section-tight' : 'section', className ?? ''].filter(Boolean).join(' ')}>
      <div className="wrap">{children}</div>
    </As>
  );
}

export function Eyebrow({ children, as: As = 'p', className }: { children: ReactNode; as?: 'p' | 'span'; className?: string }) {
  return <As className={['t-label', className ?? ''].filter(Boolean).join(' ')}>{children}</As>;
}

/** A note to a figure: boxed number in the band's note colour, then the scope in the copy's own words. */
export function Note({ n, children, fade = false, className }: { n: number; children: ReactNode; fade?: boolean; className?: string }) {
  return (
    <p className={['note', className ?? ''].filter(Boolean).join(' ')} data-note-fade={fade ? '' : undefined}>
      <span className="note-num" aria-hidden="true">
        {n}
      </span>
      <span>{children}</span>
    </p>
  );
}

/** The boxed note number set after a figure. At most one per figure, never on headings. */
export function NoteRef({ n }: { n: number }) {
  return (
    <sup className="note-ref" aria-hidden="true">
      {n}
    </sup>
  );
}

export function StageChip({ n, label }: { n: StageNumber; label: string }) {
  return (
    <span className="stage-chip t-label" style={{ ['--seg' as string]: `var(--color-stage-${n})` }}>
      <span className="chip-bar" aria-hidden="true" />
      {label}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function Breadcrumb({ items, label }: { items: { href?: string; label: string }[]; label: string }) {
  return (
    <nav className="breadcrumb" aria-label={label}>
      <ol>
        {items.map((it, i) => (
          <li key={i}>
            {it.href && isLinkable(it.href) ? <SiteLink href={it.href}>{it.label}</SiteLink> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Pager: All cases and Next case (no previous on the first case). Targets come from the route microcopy. */
export function Pager({ links }: { links: { label: string; href: string }[] }) {
  const shown = links.filter((l) => isLinkable(l.href));
  if (!shown.length) return null;
  return (
    <div className="pager">
      {shown.map((l) => (
        <SiteLink key={l.href} href={l.href} className={/^previous\b/i.test(l.label) ? "tlink tlink-arrow-back" : "tlink tlink-arrow"}>
          {l.label}
        </SiteLink>
      ))}
    </div>
  );
}

/** Empty, error and offline states take the error-generic / error-offline microcopy as children. */
export function ErrorState({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="t-small t-muted">
      {children}
    </p>
  );
}
