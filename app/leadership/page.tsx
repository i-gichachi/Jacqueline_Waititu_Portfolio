/*
  R2 /leadership (DESIGN-DIRECTION section 14, Profile). Copy: site-inputs/content/leadership.md.
  Bands: Chalk opener, profile on Paper (55ch, notes on every figure), career record on Chalk beneath the
  Lifecycle Rule with an expander for earlier roles, credentials on Chalk 2, the testimonial on Cobalt
  (pull quote, then the full text open from the data file), contact strip on Deep olive.
  Gates: no portrait (Q26: no image, nothing in its place); mission line and "Automation starts with the
  workflow." hidden (Q10); no availability line (Q3); no CV link (Q14). Testimonial ships (not Q11).
*/

import { microcopy, sectionByTag } from '../../lib/content.ts';
import { JsonLd } from '../../components/JsonLd.tsx';
import { schemaFor } from '../../lib/schema.ts';
import { routeMetadata, guardRoute } from '../../lib/route-guard.ts';
import { ships } from '../../lib/gates.ts';
import '../../components/b/batch-b.css';
import { lifecycleFromCopy } from '../../lib/lifecycle.ts';
import { Band, Note } from '../../components/ui.tsx';
import { ButtonLink } from '../../components/Button.tsx';
import { Inline } from '../../components/Inline.tsx';
import { LifecycleRule } from '../../components/LifecycleRule.tsx';
import { Testimonial } from '../../components/Testimonial.tsx';
import { RouteOpener } from '../../components/b/RouteOpener.tsx';
import { NotedInline } from '../../components/b/NotedInline.tsx';
import { dropLeadingSentence, firstQuote, isPara, must, noteMatches, type List } from '../../components/b/helpers.ts';

export const metadata = routeMetadata('/leadership');

const FILE = 'leadership.md';

export default function LeadershipPage() {
  const rf = guardRoute('/leadership');
  const hero = must(sectionByTag(rf, 'hero'), 'the [hero] section');
  const about = must(sectionByTag(rf, 'about-full'), 'the [about-full] section');
  const timeline = must(sectionByTag(rf, 'timeline'), 'the [timeline] section');
  const credentials = must(sectionByTag(rf, 'credentials'), 'the [credentials] section');
  const testimonial = must(sectionByTag(rf, 'testimonial'), 'the [testimonial] section');
  const strip = must(sectionByTag(rf, 'contact-strip'), 'the [contact-strip] section');

  /* Profile paragraphs, with the two Q10 sentences left out (README "Studio sentences in her voice"). */
  const automation = must(
    about.blocks.flatMap((b) => b.notes).map((n) => n.match(/Q10\. "([^"]+)" is unapproved/)).find(Boolean)?.[1],
    'the Q10 note naming the unapproved automation sentence',
  );
  const profile = about.blocks.filter(isPara).flatMap((p) => {
    if (noteMatches(p, /Q10 \(mission line/)) return ships('Q10.mission-line') ? [p.inline] : [];
    if (noteMatches(p, /Q10\. "[^"]+" is unapproved/)) {
      return [ships('Q10.automation-sentence') ? p.inline : dropLeadingSentence(p.inline, automation)];
    }
    return [p.inline];
  });

  /* Career record: the current list, the "Earlier roles" expander (label from microcopy; the copy's
     "Earlier roles:" line is the expander's summary, so it does not render twice). */
  const lists = timeline.blocks.filter((b): b is List => b.type === 'list');
  const [current, earlier] = [must(lists[0], 'the career list'), lists[1]];
  const earlierLabel = microcopy('timeline-earlier-label', FILE);

  const creds = must(credentials.blocks.find((b): b is List => b.type === 'list'), 'the credentials list');
  const quote = must(firstQuote(testimonial), 'the testimonial pull quote');

  const stripParas = strip.blocks.filter(isPara);
  const stripCtas = strip.blocks.filter((b) => b.type === 'cta');

  return (
    <>
      <JsonLd data={schemaFor('leadership')} />
      <RouteOpener tone="light" eyebrow={hero.hints.eyebrow} heading={hero.heading} />

      <Band tone="paper" labelledBy="profile-heading">
        <div className="grid-12">
          <h2 id="profile-heading" className="t-h2 lg:col-span-4">
            {about.heading}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="prose">
              {profile.map((inline, i) => (
                <p key={i}>
                  <NotedInline nodes={inline} n={1} />
                </p>
              ))}
            </div>
            <Note n={1} className="mt-8 border-t border-[var(--rule)] pt-3 max-w-[var(--max-width-prose)]">
              {microcopy('case-proof-line')}
            </Note>
          </div>
        </div>
      </Band>

      <Band tone="light" labelledBy="record-heading">
        <h2 id="record-heading" className="t-h2 max-w-[22ch] lg:max-w-[26ch]">
          {timeline.heading}
        </h2>
        <LifecycleRule data={lifecycleFromCopy()} className="mt-8 lg:mt-12" />
        <div className="grid-12 mt-10 lg:mt-12">
          <div className="lg:col-span-8">
            <ul className="ruled-list">
              {current.items.map((it, k) => (
                <li key={k}>
                  <Inline nodes={it.inline} />
                </li>
              ))}
            </ul>
            {earlier ? (
              <details className="b-expander mt-6">
                <summary className="b-summary">{earlierLabel}</summary>
                <ul className="ruled-list mt-2">
                  {earlier.items.map((it, k) => (
                    <li key={k}>
                      <Inline nodes={it.inline} />
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </div>
        </div>
      </Band>

      <Band tone="chalk2" labelledBy="credentials-heading">
        <div className="grid-12">
          <h2 id="credentials-heading" className="t-h2 lg:col-span-4">
            {credentials.heading}
          </h2>
          <ul className="ruled-list lg:col-span-7 lg:col-start-6">
            {creds.items.map((it, k) => (
              <li key={k}>
                <Inline nodes={it.inline} />
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Testimonial
        mode="full"
        id={testimonial.anchor ?? undefined}
        heading={testimonial.heading}
        quote={quote.text}
        credit={microcopy('testimonial-credit', FILE)}
      />

      <Band tone="dark" labelledBy="strip-heading">
        <div className="grid-12">
          <div className="lg:col-span-8">
            <h2 id="strip-heading" className="t-h2">
              {strip.heading}
            </h2>
            {stripParas.map((p, i) => (
              <p key={i} className="mt-4">
                <Inline nodes={p.inline} />
              </p>
            ))}
            <div className="actions actions-stack mt-8">
              {stripCtas.map((c) =>
                // The CV link (a PDF target) is hidden until Q14 brings the updated CV.
                c.type !== 'cta' || (c.target.endsWith('.pdf') && !ships('Q14.cv')) ? null : (
                  <ButtonLink key={c.line} href={c.target} variant={c.variant}>
                    {c.label}
                  </ButtonLink>
                ),
              )}
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
