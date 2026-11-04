/* Renders parsed inline copy (bold and links). Links go through SiteLink; a link to a route that is not
   live keeps its words as plain text so the sentence still reads. */

import { Fragment } from 'react';
import type { InlineNode } from '../lib/content.ts';
import { SiteLink } from './SiteLink.tsx';

export function Inline({ nodes, linkClassName = 'ilink', links = true }: { nodes: InlineNode[]; linkClassName?: string; links?: boolean }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === 'text') return <Fragment key={i}>{n.value}</Fragment>;
        if (n.type === 'br') return <br key={i} />;
        if (n.type === 'strong')
          return (
            <strong key={i}>
              <Inline nodes={n.children} linkClassName={linkClassName} links={links} />
            </strong>
          );
        // Inside a card that is already a link, a nested link is not allowed: keep the words only.
        if (!links) return <Inline key={i} nodes={n.children} links={false} />;
        return (
          <SiteLink key={i} href={n.href} className={linkClassName} whenHidden="text">
            <Inline nodes={n.children} linkClassName={linkClassName} />
          </SiteLink>
        );
      })}
    </>
  );
}
