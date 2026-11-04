/*
  Generic renderer for a section's blocks (paragraphs, lists, go-deeper links, CTAs, verbatim lines,
  datelines, h3). Route builders use it for prose and pick blocks out themselves for bespoke layouts.
  - verbatim lines render character for character (README build rule 3)
  - links and CTAs go through SiteLink (a CTA to a route that is not live disappears)
  - quote blocks are not rendered here: a "> ..." line is a testimonial and goes through <Testimonial>
  - skip lets a builder drop gated blocks by source line or predicate
*/

import type { Block } from '../lib/content.ts';
import { ButtonLink, TextLink } from './Button.tsx';
import { Inline } from './Inline.tsx';

export function Blocks({ blocks, skip, listClassName = 'ruled-list' }: { blocks: Block[]; skip?: (b: Block) => boolean; listClassName?: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (skip?.(b)) return null;
        switch (b.type) {
          case 'paragraph':
            return (
              <p key={i} id={b.anchor}>
                <Inline nodes={b.inline} />
              </p>
            );
          case 'verbatim':
            return (
              <p key={i} id={b.anchor}>
                {b.text}
              </p>
            );
          case 'dateline':
            return (
              <p key={i} className="t-small t-muted">
                {b.text}
              </p>
            );
          case 'list':
            return (
              <ul key={i} className={listClassName} id={b.anchor}>
                {b.items.map((it, k) => (
                  <li key={k}>
                    <Inline nodes={it.inline} />
                  </li>
                ))}
              </ul>
            );
          case 'link':
            return (
              <p key={i}>
                <TextLink href={b.href}>{b.label}</TextLink>
              </p>
            );
          case 'cta':
            return (
              <p key={i} id={b.anchor}>
                <ButtonLink href={b.target} variant={b.variant}>
                  {b.label}
                </ButtonLink>
              </p>
            );
          case 'heading':
            return (
              <h3 key={i} id={b.anchor} className="t-h3">
                {b.text}
              </h3>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
