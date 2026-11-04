/*
  R10 /connect (DESIGN-DIRECTION section 14, Contact). Copy: site-inputs/content/connect.md.
  Chalk opener; the hiring snapshot is hidden until Q2 to Q4 (empty fields are removed, never filled);
  then the two paths side by side on Paper. No form (Ian, D8).
  - Role path (#role): what to send and the reply time as written, "Discuss a role" as a mailto with the
    role subject and body (connect.md microcopy), then email (mailto), phone (tel) and LinkedIn as rows.
  - Advisory path (#advisory): the Calendly sentence and the booking gate are hidden until Q22 brings the
    link; "Book a discovery call" opens the advisory email (BookDiscoveryCall). The /privacy-policy link in
    the hidden sentence would go through the live-route flag.
*/

import type { Block } from '../../lib/content.ts';
import { sectionByTag } from '../../lib/content.ts';
import { JsonLd } from '../../components/JsonLd.tsx';
import { schemaFor } from '../../lib/schema.ts';
import { routeMetadata, guardRoute } from '../../lib/route-guard.ts';
import { ships } from '../../lib/gates.ts';
import { email, roleMailto } from '../../lib/site.ts';
import { Band } from '../../components/ui.tsx';
import { ButtonLink } from '../../components/Button.tsx';
import { BookDiscoveryCall } from '../../components/BookDiscoveryCall.tsx';
import { Inline } from '../../components/Inline.tsx';
import { RouteOpener } from '../../components/b/RouteOpener.tsx';
import { isPara, linkInText, must, type Cta, type Para } from '../../components/b/helpers.ts';
import '../../components/b/batch-b.css';

export const metadata = routeMetadata('/connect');

function splitAt(blocks: Block[], cta: Cta): { before: Para[]; after: Para[] } {
  const i = blocks.indexOf(cta);
  return { before: blocks.slice(0, i).filter(isPara), after: blocks.slice(i + 1).filter(isPara) };
}

export default function ConnectPage() {
  const rf = guardRoute('/connect');
  const hero = must(sectionByTag(rf, 'hero'), 'the [hero] section');
  const snapshot = sectionByTag(rf, 'hiring-snapshot');
  const role = must(sectionByTag(rf, 'contact', 0), 'the role [contact] section');
  const advisory = must(sectionByTag(rf, 'contact', 1), 'the advisory [contact] section');

  const roleCta = must(role.blocks.find((b): b is Cta => b.type === 'cta'), 'the role CTA');
  const roleParts = splitAt(role.blocks, roleCta);
  const address = email();
  const roleHref = roleMailto();

  const bookCta = must(advisory.blocks.find((b): b is Cta => b.type === 'cta'), 'the booking CTA');
  const advParts = splitAt(advisory.blocks, bookCta);
  // The paragraph directly before the booking button is the Calendly sentence: hidden until Q22.
  const advBefore = ships('Q22.calendly') ? advParts.before : advParts.before.slice(0, -1);

  return (
    <>
      <JsonLd data={schemaFor('connect')} />
      <RouteOpener tone="light" eyebrow={hero.hints.eyebrow} heading={hero.heading} />

      {snapshot && ships('Q2-Q4.hiring-snapshot') ? (
        <Band tone="paper" labelledBy="snapshot-heading">
          <h2 id="snapshot-heading" className="t-h2">
            {snapshot.heading}
          </h2>
        </Band>
      ) : null}

      <Band tone="paper">
        <div className="grid-12 gap-y-16">
          <section id={role.anchor} className="b-path lg:col-span-6" aria-labelledby="role-heading">
            <h2 id="role-heading" className="t-h2">
              {role.heading}
            </h2>
            <div className="prose mt-6">
              {roleParts.before.map((p) => (
                <p key={p.line}>
                  <Inline nodes={p.inline} />
                </p>
              ))}
            </div>
            <div className="actions actions-stack mt-8">
              <ButtonLink href={roleHref} variant={roleCta.variant}>
                {roleCta.label}
              </ButtonLink>
            </div>
            <ul className="ruled-list b-rows mt-8">
              {roleParts.after.map((p) => (
                <li key={p.line}>
                  <Inline nodes={linkInText(p.inline, address, roleHref)} linkClassName="ilink b-taplink" />
                </li>
              ))}
            </ul>
          </section>

          <section id={advisory.anchor} className="b-path b-path-advisory lg:col-span-6" aria-labelledby="advisory-heading">
            <h2 id="advisory-heading" className="t-h2">
              {advisory.heading}
            </h2>
            <div className="prose mt-6">
              {advBefore.map((p) => (
                <p key={p.line}>
                  <Inline nodes={p.inline} />
                </p>
              ))}
            </div>
            <div className="actions actions-stack mt-8">
              <BookDiscoveryCall label={bookCta.label} variant={bookCta.variant} />
            </div>
            <div className="prose mt-8">
              {advParts.after.map((p) => (
                <p key={p.line}>
                  <Inline nodes={p.inline} />
                </p>
              ))}
            </div>
          </section>
        </div>
      </Band>
    </>
  );
}
