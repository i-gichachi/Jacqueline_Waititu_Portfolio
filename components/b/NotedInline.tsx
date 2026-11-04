/*
  Prose with notes to the figures (DESIGN-DIRECTION sections 7 and 14, /leadership "notes on every sourced
  figure"): each bold figure is followed by its boxed note number. At most one number per figure; never on
  headings. When the figure runs into the next word ("5-person"), the number follows that word so it never
  splits it. The note text itself renders once, below the prose, through <Note>.
*/

import type { ReactNode } from 'react';
import type { InlineNode } from '../../lib/content.ts';
import { Inline } from '../Inline.tsx';
import { NoteRef } from '../ui.tsx';

export function NotedInline({ nodes, n }: { nodes: InlineNode[]; n: number }) {
  const out: ReactNode[] = [];
  const queue = [...nodes];
  let key = 0;
  while (queue.length) {
    const node = queue.shift()!;
    if (node.type !== 'strong') {
      out.push(<Inline key={key++} nodes={[node]} />);
      continue;
    }
    let suffix = '';
    const next = queue[0];
    if (next?.type === 'text' && /^\S/.test(next.value)) {
      const m = next.value.match(/^\S+/)!;
      suffix = m[0];
      queue[0] = { type: 'text', value: next.value.slice(suffix.length) };
    }
    out.push(
      <span key={key++} className="whitespace-nowrap">
        <Inline nodes={[node]} />
        {suffix}
        <NoteRef n={n} />
      </span>,
    );
  }
  return <>{out}</>;
}
