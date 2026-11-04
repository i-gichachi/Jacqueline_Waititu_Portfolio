/*
  R11 404 page body (DESIGN-DIRECTION section 14, Not found). Copy: site-inputs/content/not-found.md.
  Served with a 404 status by Next's not-found boundary, and noindex (set here too). The global header
  and footer stay on the page (root layout). Deep olive page: "404 / Not found" (the route eyebrow), the
  heading, See the track record as the one button, then text links to Connect and home inside the copy's
  own sentence. No copy is typed here.
*/

import type { Metadata } from 'next';
import { loadRouteFile, sectionByTag } from '../lib/content.ts';
import { NOT_FOUND_FILE } from '../lib/routes.ts';
import { Band, Eyebrow } from '../components/ui.tsx';
import { ButtonLink } from '../components/Button.tsx';
import { Inline } from '../components/Inline.tsx';
import { firstCta, isPara, must } from '../components/b/helpers.ts';

const rf = loadRouteFile(NOT_FOUND_FILE);

export const metadata: Metadata = {
  title: { absolute: rf.title },
  description: rf.description,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const hero = must(sectionByTag(rf, 'hero'), 'the [hero] section of not-found.md');
  const next = must(sectionByTag(rf, 'next-step'), 'the [next-step] section of not-found.md');
  const cta = must(firstCta(next), 'the not-found button');
  const i = next.blocks.indexOf(cta);
  const before = next.blocks.slice(0, i).filter(isPara);
  const after = next.blocks.slice(i + 1).filter(isPara);

  return (
    <Band tone="dark" labelledBy="nf-heading">
      <div className="grid-12" data-route="not-found">
        <div className="lg:col-span-8">
          {hero.hints.eyebrow ? <Eyebrow>{hero.hints.eyebrow}</Eyebrow> : null}
          <h1 id="nf-heading" className="t-h1 mt-4">
            {hero.heading}
          </h1>
        </div>
        <div className="mt-8 lg:col-span-7 lg:mt-12">
          <h2 className="t-h2">{next.heading}</h2>
          <div className="prose mt-6">
            {before.map((p) => (
              <p key={p.line}>
                <Inline nodes={p.inline} />
              </p>
            ))}
          </div>
          <div className="actions actions-stack mt-8">
            <ButtonLink href={cta.target} variant={cta.variant}>
              {cta.label}
            </ButtonLink>
          </div>
          <div className="prose mt-8">
            {after.map((p) => (
              <p key={p.line}>
                <Inline nodes={p.inline} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}
