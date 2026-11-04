/*
  Batch B route helpers (server only). Small, typed readers over lib/content.ts so the route pages pick
  blocks out of the copy by structure or by the copy's own notes, never by typed sentences.
*/

import type { Block, InlineNode, RouteFile, Section } from '../../lib/content.ts';

export type Para = Extract<Block, { type: 'paragraph' }>;
export type Cta = Extract<Block, { type: 'cta' }>;
export type Quote = Extract<Block, { type: 'quote' }>;
export type List = Extract<Block, { type: 'list' }>;

export function must<T>(v: T | undefined | null, what: string): T {
  if (v === undefined || v === null) throw new Error(`Copy is missing ${what}`);
  return v;
}

export function isPara(b: Block): b is Para {
  return b.type === 'paragraph';
}

export function firstCta(s: Section, pred: (c: Cta) => boolean = () => true): Cta | undefined {
  return s.blocks.find((b): b is Cta => b.type === 'cta' && pred(b));
}

export function firstQuote(s: Section): Quote | undefined {
  return s.blocks.find((b): b is Quote => b.type === 'quote');
}

/** True when any [note] attached to the block matches. */
export function noteMatches(b: Block, re: RegExp): boolean {
  return b.notes.some((n) => re.test(n));
}

/** Every [note] in a route file (file-level, section-level and block-level), in order. */
export function allNotes(rf: RouteFile): string[] {
  return [...rf.microcopyNotes, ...rf.sections.flatMap((s) => [...s.notes, ...s.blocks.flatMap((b) => b.notes)])];
}

/** First capture group of the first note that matches, or undefined. */
export function fromNotes(rf: RouteFile, re: RegExp): RegExpMatchArray | undefined {
  for (const n of allNotes(rf)) {
    const m = n.match(re);
    if (m) return m;
  }
  return undefined;
}

/**
 * Removes a leading sentence from a paragraph's inline nodes (a gated sentence the README says is
 * "left out" while the copy around it stands). The sentence comes from the copy's own note.
 * Throws when the paragraph does not open with it, so a changed export fails the build.
 */
export function dropLeadingSentence(inline: InlineNode[], sentence: string): InlineNode[] {
  const first = inline[0];
  if (!first || first.type !== 'text' || !first.value.startsWith(sentence)) {
    throw new Error(`Gated sentence "${sentence.slice(0, 40)}..." is not at the start of its paragraph`);
  }
  const rest = first.value.slice(sentence.length).replace(/^\s+/, '');
  return [...(rest ? [{ type: 'text' as const, value: rest }] : []), ...inline.slice(1)];
}

/** Splits a text node around an exact substring (used to turn a published number or address into a link). */
export function linkInText(inline: InlineNode[], needle: string, href: string): InlineNode[] {
  let done = false;
  return inline.flatMap((n): InlineNode[] => {
    if (done || n.type !== 'text') return [n];
    const at = n.value.indexOf(needle);
    if (at < 0) return [n];
    done = true;
    const out: InlineNode[] = [];
    if (at > 0) out.push({ type: 'text', value: n.value.slice(0, at) });
    out.push({ type: 'link', href, children: [{ type: 'text', value: needle }] });
    const after = n.value.slice(at + needle.length);
    if (after) out.push({ type: 'text', value: after });
    return out;
  });
}
