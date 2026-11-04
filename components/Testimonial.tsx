/*
  Testimonial: Andrew Bolton's words on the Cobalt band (DESIGN-DIRECTION sections 4 and 7; Ian, 4 November 2026).

  mode "excerpt" (home): the quote from the route copy (a "> ..." line), which must be an exact substring
    of the testimonial file; the credit; an optional link from the copy (through SiteLink).
  mode "full" (/leadership): optional lead pull quote from the copy, then the full text rendered open
    (no toggle) from site-inputs/content/data/testimonial-andrew-bolton.txt, paragraph by paragraph.

  Never: a date, greeting, sign-off, signature, email, letterhead or PDF; Review or Quotation schema;
  the word for a written recommendation used as a label, heading, aria-label, id or link. His own words
  inside the text stay as written; the element holding them carries data-testimonial-text, which is the
  only place the build check allows that word.

  data-testimonial-quote marks every rendered piece of his text so the build check can confirm each one
  is an exact substring of the file; data-testimonial-full marks the full text so the check can confirm
  its paragraphs, joined, equal the file.
*/

import type { ReactNode } from 'react';
import { isTestimonialExcerpt, testimonialParagraphs } from '../lib/testimonial.ts';
import { SiteLink } from './SiteLink.tsx';
import { isLinkable } from './linkable.ts';

interface Common {
  credit: string;
  heading?: string;
  headingId?: string;
  id?: string;
  /** Section wrapper: the testimonial renders its own Cobalt band unless embedded. */
  band?: boolean;
}

type Props =
  | (Common & { mode: 'excerpt'; quote: string; link?: { label: string; href: string } })
  | (Common & { mode: 'full'; quote?: string });

function assertExcerpt(quote: string) {
  if (!isTestimonialExcerpt(quote)) {
    throw new Error(`Testimonial quote is not an exact substring of the testimonial file: "${quote.slice(0, 60)}..."`);
  }
}

function Wrapper({ band, id, headingId, children }: { band: boolean; id?: string; headingId?: string; children: ReactNode }) {
  if (!band) return <div id={id}>{children}</div>;
  return (
    <section id={id} className="band-cobalt section" aria-labelledby={headingId}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Testimonial(props: Props) {
  const { credit, heading, headingId, id, band = true } = props;
  if (props.quote) assertExcerpt(props.quote);
  const hId = heading ? headingId ?? (id ? `${id}-heading` : undefined) : undefined;

  return (
    <Wrapper band={band} id={id} headingId={hId}>
      <div className="grid-12">
        <div className="lg:col-span-9">
          {heading ? (
            <h2 id={hId} className="t-h2 mb-8">
              {heading}
            </h2>
          ) : null}
          <figure>
            {props.quote ? (
              <blockquote className="quote" data-testimonial-text="">
                <p>
                  <span aria-hidden="true">{'“'}</span>
                  <span data-testimonial-quote="">{props.quote}</span>
                  <span aria-hidden="true">{'”'}</span>
                </p>
              </blockquote>
            ) : null}
            <figcaption className="testimonial-credit">{credit}</figcaption>
          </figure>

          {props.mode === 'full' ? (
            <div className="testimonial-full prose" data-testimonial-text="" data-testimonial-full="">
              {testimonialParagraphs().map((p, i) => (
                <p key={i} data-testimonial-quote="">
                  {p}
                </p>
              ))}
            </div>
          ) : null}

          {props.mode === 'excerpt' && props.link && isLinkable(props.link.href) ? (
            <p className="mt-6">
              <SiteLink href={props.link.href} className="tlink tlink-arrow">
                {props.link.label}
              </SiteLink>
            </p>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}
