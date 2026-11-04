/*
  R12, /advisory. Copy: site-inputs/content/advisory.md (approved by Ian, 4 November 2026; the ship
  gates stay). Anatomy (DESIGN-DIRECTION section 14 with Ian's Stage 7 rulings): full Cobalt opener with
  Chalk type; six ruled service rows with Timeframe and Investment (Q1: "Depends on scope of project");
  no Best for rows and no process block (Q24, Q10); the FAQ with answered items only (a hidden item
  renders nothing, question included); the closing band with the email button (R7-D1).

  Booking (Q22 fallback): every Book a discovery call opens the advisory email. Card buttons add the
  service name to the subject (I9, advisory.md microcopy note). Calendly never loads here.
*/

import { ButtonLink } from '../../components/Button.tsx';
import { Inline } from '../../components/Inline.tsx';
import { JsonLd } from '../../components/JsonLd.tsx';
import { Eyebrow } from '../../components/ui.tsx';
import { blocksOf, firstOf, need } from '../../components/a/copy-helpers.ts';
import { schemaFor } from '../../lib/schema.ts';
import s from '../../components/a/advisory.module.css';
import { groupByHeading, microcopy, optionalMicrocopy, type Block } from '../../lib/content.ts';
import { ships } from '../../lib/gates.ts';
import { guardRoute, routeMetadata } from '../../lib/route-guard.ts';
import { email } from '../../lib/site.ts';

export const metadata = routeMetadata('/advisory');

const FILE = 'advisory.md';

/** mailto for the advisory email; a card passes its service name, which is added to the subject (I9). */
function advisoryMailto(serviceName?: string): string {
  if (ships('Q22.calendly')) throw new Error('Q22 shipped: switch /advisory booking buttons to the Calendly gate via /connect#advisory');
  const base = microcopy('advisory-email-subject', FILE);
  const subject = serviceName ? `${base}: ${serviceName}` : base;
  const body = optionalMicrocopy('advisory-email-body', FILE);
  const q = [`subject=${encodeURIComponent(subject)}`, body ? `body=${encodeURIComponent(body)}` : ''].filter(Boolean).join('&');
  return `mailto:${email()}?${q}`;
}

/** "Timeframe: Depends on scope of project." -> label and value, using the route's own label microcopy. */
function fact(text: string, labelKey: string): { label: string; value: string } | null {
  const label = microcopy(labelKey, FILE);
  const prefix = `${label}: `;
  return text.startsWith(prefix) ? { label, value: text.slice(prefix.length) } : null;
}

export default function AdvisoryPage() {
  const rf = guardRoute('/advisory');

  const hero = need(rf, 'hero');
  const services = need(rf, 'services');
  const faq = need(rf, 'faq');
  const closing = need(rf, 'contact-strip');
  const cardButton = microcopy('service-card-button', FILE);
  const primaryLabel = rf.frontmatter.primary_cta;
  if (!primaryLabel) throw new Error('advisory.md: primary_cta missing');

  const heroParas = blocksOf(hero.blocks, 'paragraph');

  const rows = groupByHeading(services).map((g) => {
    const verbatim = blocksOf(g.blocks, 'verbatim');
    const facts = blocksOf(g.blocks, 'list').flatMap((l) => l.items);
    const timeframe = facts.map((it) => fact(it.text, 'service-card-timeframe-label')).find(Boolean) ?? null;
    const investment = facts.map((it) => fact(it.text, 'service-card-investment-label')).find(Boolean) ?? null;
    const paras = blocksOf(g.blocks, 'paragraph');
    return { name: g.heading.text, anchor: g.heading.anchor, line: g.heading.line, verbatim, timeframe, investment, paras };
  });
  if (rows.length !== 6) throw new Error(`advisory.md: expected six services, found ${rows.length}`);

  // A FAQ item renders only with its answer in the copy; a held item (Q24) has none and renders nothing.
  const faqItems = groupByHeading(faq)
    .map((g) => ({ q: g.heading, answers: blocksOf(g.blocks, 'paragraph') }))
    .filter((it) => it.answers.length > 0);

  const closingParas = blocksOf(closing.blocks, 'paragraph');
  const closingCta = firstOf(closing.blocks, 'cta');
  const address = email();

  const renderEmailLine = (b: Extract<Block, { type: 'paragraph' }>) => {
    const i = b.text.indexOf(address);
    if (i < 0 || b.inline.some((n) => n.type !== 'text')) return <Inline nodes={b.inline} />;
    return (
      <>
        {b.text.slice(0, i)}
        <a href={`mailto:${address}`} className={`ilink ${s.emailLink}`}>
          {address}
        </a>
        {b.text.slice(i + address.length)}
      </>
    );
  };

  return (
    <>
      <JsonLd data={schemaFor('advisory')} />

      {/* Opener: full Cobalt band, Chalk type */}
      <section className="band-cobalt section" aria-labelledby="advisory-h1">
        <div className="wrap">
          <div className="grid-12">
            <div className="lg:col-span-9">
              {hero.hints.eyebrow ? <Eyebrow>{hero.hints.eyebrow}</Eyebrow> : null}
              <h1 id="advisory-h1" className="t-h1 mt-4">
                {hero.heading}
              </h1>
              <div className={`prose ${s.lead}`}>
                {heroParas.map((p) => (
                  <p key={p.line}>
                    <Inline nodes={p.inline} />
                  </p>
                ))}
              </div>
              <div className={`actions actions-stack ${s.heroActions}`}>
                <ButtonLink href={advisoryMailto()} variant="primary">
                  {primaryLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six ruled service rows */}
      <section className="band-light section" aria-labelledby="advisory-services">
        <div className="wrap">
          <h2 id="advisory-services" className="t-h2 max-w-[28ch]">
            {services.heading}
          </h2>
          <ol className={s.rows}>
            {rows.map((r) => (
              <li key={r.line} id={r.anchor} className={`grid-12 ${s.row}`}>
                <div className="lg:col-span-4">
                  <h3 className="t-h3">
                    {r.name}
                  </h3>
                </div>
                <div className={`lg:col-start-6 lg:col-span-7 ${s.rowBody}`}>
                  {r.verbatim.map((v) => (
                    <p key={v.line}>{v.text}</p>
                  ))}
                  {r.timeframe || r.investment ? (
                    <dl className={s.facts}>
                      {[r.timeframe, r.investment].map((f) =>
                        f ? (
                          <div key={f.label}>
                            <dt className="t-label">{f.label}</dt>
                            <dd>{f.value}</dd>
                          </div>
                        ) : null,
                      )}
                    </dl>
                  ) : null}
                  {r.paras.map((p) => (
                    <p key={p.line}>
                      <Inline nodes={p.inline} />
                    </p>
                  ))}
                  <div className={`actions actions-stack ${s.rowAction}`}>
                    <ButtonLink href={advisoryMailto(r.name)} variant="secondary">
                      {cardButton}
                    </ButtonLink>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ: answered items only */}
      {faqItems.length ? (
        <section className="band-paper section" aria-labelledby="advisory-faq">
          <div className="wrap">
            <h2 id="advisory-faq" className="t-h2">
              {faq.heading}
            </h2>
            <div className={s.faq}>
              {faqItems.map((it) => (
                <div key={it.q.line} className={s.faqItem}>
                  <h3 className="t-h3">{it.q.text}</h3>
                  {it.answers.map((a) => (
                    <p key={a.line}>
                      <Inline nodes={a.inline} />
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing band: the email button (R7-D1) */}
      <section className="band-dark section" aria-labelledby="advisory-closing">
        <div className="wrap">
          <h2 id="advisory-closing" className="t-h2">
            {closing.heading}
          </h2>
          {closingParas.slice(0, 1).map((p) => (
            <p key={p.line} className={`${s.closingBody} prose`}>
              <Inline nodes={p.inline} />
            </p>
          ))}
          {closingCta ? (
            <div className={`actions actions-stack ${s.closingActions}`}>
              <ButtonLink href={closingCta.target} variant={closingCta.variant}>
                {closingCta.label}
              </ButtonLink>
            </div>
          ) : null}
          {closingParas.slice(1).map((p) => (
            <p key={p.line} className={s.emailLine}>
              {renderEmailLine(p)}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
