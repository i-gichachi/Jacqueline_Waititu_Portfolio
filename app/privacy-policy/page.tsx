/*
  P2 /privacy-policy (DRAFT; preview flag only). Copy: site-inputs/content/privacy-policy.md.
  guardRoute() returns the 404 page in a production build; with PREVIEW_DRAFT_ROUTES=1 it renders, noindex,
  out of the sitemap. Chalk reading page at 55ch (LegalPage).
  Hidden (README Q22 row and the copy's own note 49): the Calendly section (lines 40 to 47) and the
  Calendly bullet (62) until the link is live. No "Last updated" line (I15). The page is not approved and
  stays a launch blocker until the qualified reviewer has finished.
*/

import { JsonLd } from '../../components/JsonLd.tsx';
import { schemaFor } from '../../lib/schema.ts';
import { routeMetadata, guardRoute } from '../../lib/route-guard.ts';
import { ships } from '../../lib/gates.ts';
import { LegalPage } from '../../components/b/LegalPage.tsx';
import { fromNotes, must } from '../../components/b/helpers.ts';
import '../../components/b/batch-b.css';

export const metadata = routeMetadata('/privacy-policy');

export default function PrivacyPolicyPage() {
  const rf = guardRoute('/privacy-policy');

  // "until the link is live, lines 40 to 47, the Calendly bullet at 62 ... render hidden"
  const m = must(fromNotes(rf, /lines (\d+) to (\d+), the Calendly bullet at (\d+)/), 'the Q22 note naming the hidden Calendly lines');
  const [from, to, bullet] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const calendlyHidden = !ships('Q22.calendly');
  const inRange = (line: number) => calendlyHidden && line >= from && line <= to;

  return (
    <>
      <JsonLd data={schemaFor('privacy-policy')} />
      <LegalPage
        rf={rf}
        rules={{
          hideSection: (s) => inRange(s.line),
          hideBlock: (b) => inRange(b.line),
          hideItem: (line) => calendlyHidden && line === bullet,
        }}
      />
    </>
  );
}
