/*
  Case card (DESIGN-DIRECTION section 7): Paper, 4px radius, 2px Cobalt top rule (3px on hover), no shadow.
  Order: stage chip, dateline, title (H3), summary, one figure with note number 1, the figure line,
  the proof note above a hairline, then the "Read the case" label. The whole card is the link, with one
  focusable element. Organisation names are text, never logos. Every string arrives from the copy.
*/

import type { InlineNode } from '../lib/content.ts';
import type { StageNumber } from '../lib/lifecycle.ts';
import { Inline } from './Inline.tsx';
import { SiteLink } from './SiteLink.tsx';
import { isLinkable } from './linkable.ts';
import { Note, NoteRef, StageChip } from './ui.tsx';

export interface CaseCardProps {
  href: string;
  stage?: { n: StageNumber; label: string };
  dateline?: string;
  title: string;
  summary: InlineNode[];
  figure?: string;
  figureLine?: InlineNode[];
  proofLine: string;
  goLabel: string;
  headingLevel?: 'h2' | 'h3';
}

export function CaseCard({ href, stage, dateline, title, summary, figure, figureLine, proofLine, goLabel, headingLevel = 'h3' }: CaseCardProps) {
  if (!isLinkable(href)) return null;
  const H = headingLevel;
  return (
    <SiteLink href={href} className="case-card" data-draw="">
      <span className="card-rule" aria-hidden="true" />
      {stage ? <StageChip n={stage.n} label={stage.label} /> : null}
      {dateline ? <p className="card-dateline t-small t-muted">{dateline}</p> : null}
      <H className="card-title t-h3">{title}</H>
      <p className="card-summary">
        <Inline nodes={summary} links={false} />
      </p>
      {figure ? (
        <p className="card-figure fig fig-card">
          {figure}
          <NoteRef n={1} />
        </p>
      ) : null}
      {figureLine ? (
        <p className="card-figure-line t-small t-muted">
          <Inline nodes={figureLine} links={false} />
        </p>
      ) : null}
      <div className="card-proof">
        <Note n={1}>{proofLine}</Note>
      </div>
      <span className="card-go">{goLabel}</span>
    </SiteLink>
  );
}
