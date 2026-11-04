/* Inline copy with the boxed note number after each bold figure (DESIGN-DIRECTION section 7:
   at most one note number per figure, never on headings). Links go through SiteLink via <Inline>. */

import { Fragment } from 'react';
import type { InlineNode } from '../../lib/content.ts';
import { Inline } from '../Inline.tsx';
import { NoteRef } from '../ui.tsx';

export function NotedInline({ nodes, n = 1 }: { nodes: InlineNode[]; n?: number }) {
  return (
    <>
      {nodes.map((node, i) =>
        node.type === 'strong' ? (
          <Fragment key={i}>
            <Inline nodes={[node]} />
            <NoteRef n={n} />
          </Fragment>
        ) : (
          <Inline key={i} nodes={[node]} />
        ),
      )}
    </>
  );
}
