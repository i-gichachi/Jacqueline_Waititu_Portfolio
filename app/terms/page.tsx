/*
  P3 /terms (DRAFT; preview flag only). Copy: site-inputs/content/terms.md.
  guardRoute() returns the 404 page in a production build; with PREVIEW_DRAFT_ROUTES=1 it renders, noindex,
  out of the sitemap. Chalk reading page at 55ch (LegalPage).
  Hidden (README terms table):
  - R7-T11: the section heading at 51 renders its fallback (gateFallbackText, read from the copy's note),
    and line 55 is hidden, until Ian confirms and the reviewer clears them.
  - Q22: the Calendly sentence (70) until the link is live.
  - I15: no "Last updated" line.
  The phone at 93 is a tel: link (route note 98); the contact action renders as a text link (note 97).
*/

import { JsonLd } from '../../components/JsonLd.tsx';
import { schemaFor } from '../../lib/schema.ts';
import { routeMetadata, guardRoute } from '../../lib/route-guard.ts';
import { gateFallbackText, ships } from '../../lib/gates.ts';
import { phone } from '../../lib/site.ts';
import { LegalPage } from '../../components/b/LegalPage.tsx';
import { linkInText, noteMatches } from '../../components/b/helpers.ts';
import '../../components/b/batch-b.css';

export const metadata = routeMetadata('/terms');

export default function TermsPage() {
  const rf = guardRoute('/terms');
  const tel = phone();

  return (
    <>
      <JsonLd data={schemaFor('terms')} />
      <LegalPage
        rf={rf}
        rules={{
          headingFor: (s) =>
            !ships('R7-T11.terms-heading') && s.notes.some((n) => /^Gated with line \d+ \(R7-T11/.test(n))
              ? gateFallbackText('R7-T11.terms-heading')
              : s.heading,
          hideBlock: (b) =>
            (!ships('R7-T11.copy-ownership') && noteMatches(b, /^Gated for the reviewer \(Ian, R7-T11/)) ||
            (!ships('Q22.calendly') && noteMatches(b, /The Calendly sentence is hidden/)),
          inline: (nodes) => (tel ? linkInText(nodes, tel.label, tel.href) : nodes),
        }}
      />
    </>
  );
}
