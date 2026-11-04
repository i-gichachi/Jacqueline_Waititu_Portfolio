/*
  Batch C helpers for /track-record and the five case pages (server only).
  Every visible string comes from site-inputs/content; this file only selects, splits and gates it.

  - CASE_STAGE: which Lifecycle Rule stage each case is (DESIGN-DIRECTION section 9): Integration, Sale,
    Continuity, Scale (office), Scale (HR). Labels come from the lifecycle microcopy.
  - Q29: the "Phase ..." subheadings are hidden on the integration and due diligence cases only; the
    content under them stays visible, in the order written (README, Ian 4 November 2026).
  - Q31: the HR clause ", including the move to 24-hour coverage" is hidden; the sentence ends at
    "shift patterns." The matcher is read from the gate's own description in lib/gates.ts, not typed here.
*/

import { inlineText, splitTarget, type Block, type InlineNode, type RouteFile, type Section } from '../../lib/content.ts';
import { GATES, ships } from '../../lib/gates.ts';
import type { StageNumber } from '../../lib/lifecycle.ts';

export const CASE_STAGE: Record<string, StageNumber> = {
  '/track-record/kenya-office-integration': 5,
  '/track-record/sale-due-diligence': 4,
  '/track-record/pandemic-remote-transition': 3,
  '/track-record/office-projects': 2,
  '/track-record/hr-function': 2,
};

/** Routes whose phase subheadings Q29 holds (README "Phase order" row). */
const Q29_ROUTES = new Set(['/track-record/kenya-office-integration', '/track-record/sale-due-diligence']);

export function phaseHeadingsHidden(route: string): boolean {
  return Q29_ROUTES.has(route) && !ships('Q29.phase-headings');
}

/* ---------- Q31: remove a clause from inline copy ---------- */

function q31Clause(): string {
  const m = GATES['Q31.24-hour-clause'].covers.match(/the clause "([^"]+)"/);
  if (!m) throw new Error('Q31 gate no longer names its clause');
  return m[1];
}

/** Removes the character range [start, end) of the inline text, keeping the node structure around it. */
function cutRange(nodes: InlineNode[], start: number, end: number): InlineNode[] {
  let pos = 0;
  const walk = (list: InlineNode[]): InlineNode[] => {
    const out: InlineNode[] = [];
    for (const n of list) {
      if (n.type === 'text') {
        const a = pos;
        const len = n.value.length;
        pos += len;
        const s0 = Math.min(len, Math.max(0, start - a));
        const e0 = Math.min(len, Math.max(0, end - a));
        if (s0 === e0) out.push(n);
        else {
          const keep = n.value.slice(0, s0) + n.value.slice(e0);
          if (keep) out.push({ type: 'text', value: keep });
        }
      } else if (n.type === 'br') {
        pos += 1;
        out.push(n);
      } else {
        const kids = walk(n.children);
        if (inlineText(kids).length) out.push({ ...n, children: kids });
      }
    }
    return out;
  };
  return walk(nodes);
}

/** Applies the Q31 gate to a paragraph's inline nodes; throws if the copy changed under the gate. */
export function applyInlineGates(inline: InlineNode[]): InlineNode[] {
  if (ships('Q31.24-hour-clause')) return inline;
  const clause = q31Clause();
  const text = inlineText(inline);
  const at = text.indexOf(clause);
  if (at < 0) {
    if (/24-hour/.test(text) && /shift patterns/.test(text)) throw new Error('Q31: the 24-hour clause changed in the copy; update the gate');
    return inline;
  }
  return cutRange(inline, at, at + clause.length);
}

export function gateBlock(b: Block): Block {
  if (b.type === 'paragraph') return { ...b, inline: applyInlineGates(b.inline) };
  if (b.type === 'list') return { ...b, items: b.items.map((it) => ({ ...it, inline: applyInlineGates(it.inline) })) };
  return b;
}

/* ---------- sections ---------- */

export function section(rf: RouteFile, tag: string): Section | undefined {
  return rf.sections.find((s) => s.tag === tag);
}

/** Blocks before the first "### " heading, and the heading groups after it. */
export function splitIntro(s: Section): { intro: Block[]; groups: { heading: Extract<Block, { type: 'heading' }>; blocks: Block[] }[] } {
  const intro: Block[] = [];
  const groups: { heading: Extract<Block, { type: 'heading' }>; blocks: Block[] }[] = [];
  for (const b of s.blocks) {
    if (b.type === 'heading') groups.push({ heading: b, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(gateBlock(b));
    else intro.push(gateBlock(b));
  }
  return { intro, groups };
}

/** pager-previous, pager-all, pager-next from the route microcopy ("Label -> /href"), in that order. */
export function pagerLinks(rf: RouteFile): { label: string; href: string }[] {
  return ['pager-previous', 'pager-all', 'pager-next']
    .map((k) => rf.microcopy[k])
    .filter((v): v is string => Boolean(v))
    .map((v) => splitTarget(v))
    .filter((t) => t.target)
    .map((t) => ({ label: t.label, href: t.target! }));
}

/** The first bold run in an outcome line, shown large (the full sentence stays beside it). */
export function firstStrong(inline: InlineNode[]): string | null {
  for (const n of inline) {
    if (n.type === 'strong') return inlineText(n.children);
    if (n.type === 'link') {
      const inner = firstStrong(n.children);
      if (inner) return inner;
    }
  }
  return null;
}

/**
 * Row labels for the twin audit calendars, read from the challenge copy
 * ("ours ran July to June, the acquirer's January to December"). Null when the copy has no such sentence.
 */
export function calendarLabels(s: Section | undefined): { ours: string; theirs: string } | null {
  if (!s) return null;
  for (const b of s.blocks) {
    if (b.type !== 'paragraph') continue;
    const m = b.text.match(/\b(ours ran [^,]+), (the acquirer's [^.]+)\./);
    if (m) {
      const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
      return { ours: cap(m[1]), theirs: cap(m[2]) };
    }
  }
  return null;
}

/** The outcome figure, keeping a range such as "5 to over 100" whole (route audit). */
export function outcomeFigure(inline: InlineNode[]): string | null {
  const i = inline.findIndex((n) => n.type === 'strong');
  const a = inline[i], mid = inline[i + 1], b = inline[i + 2];
  if (a?.type === 'strong' && mid?.type === 'text' && /^\s*to( over)?\s*$/.test(mid.value) && b?.type === 'strong') {
    return `${inlineText(a.children)} ${mid.value.trim()} ${inlineText(b.children)}`;
  }
  return firstStrong(inline);
}
