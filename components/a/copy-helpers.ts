/*
  Small helpers for batch A route files (/ and /advisory). They pick blocks out of the parsed copy and
  decide gated blocks from the copy's own notes and hints, so no visible string is typed into code.
*/

import type { Block, InlineNode, RouteFile, Section } from '../../lib/content.ts';
import { sectionByTag } from '../../lib/content.ts';
import { gate, type GateId } from '../../lib/gates.ts';

export type BlockOf<T extends Block['type']> = Extract<Block, { type: T }>;

/** The section with the tag; throws so a renamed tag fails the build instead of dropping a section. */
export function need(rf: RouteFile, tag: string, nth = 0): Section {
  const s = sectionByTag(rf, tag, nth);
  if (!s) throw new Error(`${rf.file}: no [${tag}] section`);
  return s;
}

export function blocksOf<T extends Block['type']>(blocks: Block[], type: T): BlockOf<T>[] {
  return blocks.filter((b): b is BlockOf<T> => b.type === type);
}

export function firstOf<T extends Block['type']>(blocks: Block[], type: T): BlockOf<T> | undefined {
  return blocksOf(blocks, type)[0];
}

/** True when one of the block's [note] lines says it waits on the given question (e.g. "Q39"). */
export function awaits(block: Block, ref: string): boolean {
  const re = new RegExp(`awaiting client:[^.]*\\b${ref}\\b`);
  return block.notes.some((n) => re.test(n));
}

/** The quoted sentence a gate covers (lib/gates.ts), e.g. "I have run one operation, not several." */
export function gatedSentence(id: GateId): string | null {
  const m = gate(id).covers.match(/"([^"]+)"/);
  return m ? m[1] : null;
}

/**
 * Removes a gated sentence from a paragraph's inline nodes and leaves the copy around it standing
 * (README: "each sentence is left out and the copy around it stands"). Only plain text nodes are cut.
 */
export function withoutSentence(nodes: InlineNode[], sentence: string | null): InlineNode[] {
  if (!sentence) return nodes;
  const out: InlineNode[] = [];
  for (const n of nodes) {
    if (n.type === 'text' && n.value.includes(sentence)) {
      const value = n.value.replace(sentence, '').replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
      if (value) out.push({ type: 'text', value });
    } else out.push(n);
  }
  return out;
}
