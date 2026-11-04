/*
  R1, home (/). Copy: site-inputs/content/home.md (approved; the ship gates stay).
  Sequence (DESIGN-DIRECTION section 4): hero and figure strip (Deep olive), bridge (Chalk), featured
  cases (Deep olive, Paper cards), competencies (Chalk), testimonial (Cobalt), services (Paper),
  closing strip (Deep olive), then the footer from the layout.

  Gates (README routes table, row /): portrait on its fallback (Q26:
  the vertical Lifecycle Rule in the portrait column, and the bridge drops its horizontal rule); the
  bridge line at 41 hidden (Q39); the philosophy pull quote at 47 and the sentence at 87 hidden (Q10);
  pillar labels hidden (Q10); the CV link hidden (Q14). The testimonial, list item 105 (I17) and the
  /advisory link at 141 ship. Every Book a discovery call opens the advisory email until Q22 (README).
*/

import { BookDiscoveryCall } from '../components/BookDiscoveryCall.tsx';
import { ButtonLink, TextLink } from '../components/Button.tsx';
import { CaseCard } from '../components/CaseCard.tsx';
import { FigureStrip, type StripFigure } from '../components/FigureStrip.tsx';
import { Inline } from '../components/Inline.tsx';
import { JsonLd } from '../components/JsonLd.tsx';
import { LifecycleRule } from '../components/LifecycleRule.tsx';
import { Testimonial } from '../components/Testimonial.tsx';
import { isLinkable } from '../components/linkable.ts';
import { awaits, blocksOf, firstOf, gatedSentence, need, withoutSentence } from '../components/a/copy-helpers.ts';
import { schemaFor } from '../lib/schema.ts';
import s from '../components/a/home.module.css';
import { groupByHeading, microcopy, splitFigure, type Block } from '../lib/content.ts';
import { ships } from '../lib/gates.ts';
import { lifecycleFromCopy, stageLabel, type StageNumber } from '../lib/lifecycle.ts';
import { guardRoute, routeMetadata } from '../lib/route-guard.ts';

export const metadata = routeMetadata('/');

/* Stage chip per case (DESIGN-DIRECTION section 9: integration is Stage 5, the sale Stage 4). */
const CASE_STAGE: Record<string, StageNumber> = {
  '/track-record/kenya-office-integration': 5,
  '/track-record/sale-due-diligence': 4,
};

export default function HomePage() {
  const rf = guardRoute('/');
  const lifecycle = lifecycleFromCopy();
  const portrait = ships('Q26.portrait');
  if (portrait) throw new Error('Q26 shipped: build the 4:5 hero portrait (preloaded AVIF) and restore the bridge Lifecycle Rule');

  /* ---- hero ---- */
  const hero = need(rf, 'hero');
  const heroCtas = blocksOf(hero.blocks, 'cta');
  const heroParas = blocksOf(hero.blocks, 'paragraph');
  const primary = heroCtas.find((c) => c.variant === 'primary');
  const secondary = heroCtas.find((c) => c.variant === 'secondary');
  if (!primary || !secondary) throw new Error('home.md hero: expected a primary and a secondary CTA');

  /* ---- figure strip ---- */
  const proof = need(rf, 'proof-strip');
  const figures: StripFigure[] = blocksOf(proof.blocks, 'paragraph').map((p) => {
    const f = splitFigure(p.inline);
    if (!f) throw new Error(`home.md:${p.line}: a proof-strip line must open with a bold figure`);
    return { figure: f.figure, note: f.rest };
  });

  /* ---- bridge ---- */
  const bridge = need(rf, 'about-bridge');
  const hideBridge = (b: Block) =>
    (awaits(b, 'Q39') && !ships('Q39.advisory-clients')) || (b.hint === 'pull-quote' && !ships('Q10.philosophy-line'));
  const bridgeParas = blocksOf(bridge.blocks, 'paragraph').filter((b) => !hideBridge(b));
  const bridgeLink = firstOf(bridge.blocks, 'link');

  /* ---- featured cases ---- */
  const cases = need(rf, 'case-studies');
  const proofLine = microcopy('proof-line', 'home.md');
  const caseGroups = groupByHeading(cases).map((g) => {
    const link = firstOf(g.blocks, 'link');
    if (!link) throw new Error(`home.md:${g.heading.line}: case card has no link`);
    const paras = blocksOf(g.blocks, 'paragraph');
    const figurePara = paras.find((p) => splitFigure(p.inline));
    const summary = paras.find((p) => p !== figurePara && p.text !== proofLine);
    const f = figurePara ? splitFigure(figurePara.inline) : null;
    const n = CASE_STAGE[link.href];
    return {
      key: link.href,
      href: link.href,
      goLabel: link.label,
      title: g.heading.text,
      dateline: firstOf(g.blocks, 'dateline')?.text,
      summary: summary?.inline ?? [],
      figure: f?.figure,
      figureLine: f?.rest,
      stage: n && lifecycle ? { n, label: stageLabel(lifecycle, n) } : undefined,
    };
  });
  const cardHrefs = new Set(caseGroups.map((c) => c.href));
  const casesMore = blocksOf(cases.blocks, 'link').filter((l) => !cardHrefs.has(l.href));

  /* ---- competencies ---- */
  const comp = need(rf, 'competencies-preview');
  const firstHeading = comp.blocks.findIndex((b) => b.type === 'heading');
  const compIntro = blocksOf(comp.blocks.slice(0, firstHeading < 0 ? undefined : firstHeading), 'paragraph');
  const oneOperation = ships('Q10.one-operation-sentence') ? null : gatedSentence('Q10.one-operation-sentence');
  const compGroups = groupByHeading(comp).map((g) => ({ label: g.heading.text, list: firstOf(g.blocks, 'list') }));
  const compMore = blocksOf(comp.blocks, 'link');

  /* ---- testimonial ---- */
  const testimonial = need(rf, 'testimonial');
  const quote = firstOf(testimonial.blocks, 'quote');
  const testimonialLink = firstOf(testimonial.blocks, 'link');

  /* ---- services preview ---- */
  const services = need(rf, 'services-preview');
  const serviceGroups = groupByHeading(services).map((g) => ({ name: g.heading.text, line: firstOf(g.blocks, 'verbatim') }));
  const servicesLink = firstOf(services.blocks, 'link');
  const servicesCta = firstOf(services.blocks, 'cta');

  /* ---- closing strip ---- */
  const closing = need(rf, 'contact-strip');

  return (
    <>
      <JsonLd data={schemaFor('home')} />

      {/* 1. Hero and figure strip */}
      <section className={`band-dark ${s.hero}`} aria-labelledby="home-h1">
        <div className="wrap">
          <div className={`grid-12 ${s.heroGrid}`}>
            <div className="lg:col-span-7">
              <h1 id="home-h1" className="t-hero">
                {hero.hints.eyebrow ? <span className="t-label h1-eyebrow">{hero.hints.eyebrow}</span> : null}
                <span className="h1-main">{hero.heading}</span>
              </h1>
              <div className="actions actions-stack mt-8">
                <ButtonLink href={primary.target} variant="primary">
                  {primary.label}
                </ButtonLink>
                <BookDiscoveryCall label={secondary.label} variant="secondary" />
              </div>
              {/* After the buttons, per DESIGN-DIRECTION section 5 (Stage 7b QA); prose keeps the line at 75 characters or fewer. */}
              {heroParas.map((p) => (
                <p key={p.line} className="prose mt-6">
                  <Inline nodes={p.inline} />
                </p>
              ))}
            </div>

            <div className="lg:col-span-12 lg:row-start-2">
              <h2 id="home-proof" className={`t-label ${s.stripHeading}`}>
                {proof.heading}
              </h2>
              <FigureStrip items={figures} labelledBy="home-proof" />
            </div>

            {/* Q26 fallback: the Lifecycle Rule, vertical, in the portrait column (never a monogram or stock face). */}
            <div className={`lg:col-start-9 lg:col-span-4 lg:row-start-1 ${s.heroRule}`}>
              <LifecycleRule data={lifecycle} orientation="v" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bridge */}
      <section className="band-light section" aria-labelledby="home-bridge">
        <div className="wrap">
          <div className="grid-12">
            <div className="lg:col-span-5">
              <h2 id="home-bridge" className="t-h2">
                {bridge.heading}
              </h2>
            </div>
            <div className="lg:col-start-7 lg:col-span-6">
              <div className="prose">
                {bridgeParas.map((p) => (
                  <p key={p.line}>
                    <Inline nodes={p.inline} />
                  </p>
                ))}
              </div>
              {bridgeLink && isLinkable(bridgeLink.href) ? (
                <p className={s.bridgeLink}>
                  <TextLink href={bridgeLink.href}>{bridgeLink.label}</TextLink>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured cases */}
      <section className="band-dark section" aria-labelledby="home-cases">
        <div className="wrap">
          <h2 id="home-cases" className="t-h2">
            {cases.heading}
          </h2>
          <div className="grid-12 mt-10">
            {caseGroups.map((c) => (
              <div key={c.key} className="lg:col-span-6">
                <CaseCard
                  href={c.href}
                  stage={c.stage}
                  dateline={c.dateline}
                  title={c.title}
                  summary={c.summary}
                  figure={c.figure}
                  figureLine={c.figureLine}
                  proofLine={proofLine}
                  goLabel={c.goLabel}
                />
              </div>
            ))}
          </div>
          {casesMore.map((l) => (
            <p key={l.href} className="mt-8">
              <TextLink href={l.href}>{l.label}</TextLink>
            </p>
          ))}
        </div>
      </section>

      {/* 4. Competencies */}
      <section className="band-light section" aria-labelledby="home-competencies">
        <div className="wrap">
          <h2 id="home-competencies" className="t-h2 max-w-[24ch]">
            {comp.heading}
          </h2>
          {compIntro.map((p) => {
            const nodes = withoutSentence(p.inline, oneOperation);
            return nodes.length ? (
              <p key={p.line} className="prose mt-4">
                <Inline nodes={nodes} />
              </p>
            ) : null;
          })}
          <div className={`grid-12 ${s.groups}`}>
            {compGroups.map((g) =>
              g.list ? (
                <div key={g.list.line} className="lg:col-span-4">
                  {ships('Q10.pillar-labels') ? <h3 className="t-h3 mb-4">{g.label}</h3> : null}
                  <ul className={`ruled-list ${s.groupList}`}>
                    {g.list.items
                      .filter((it) => it.text !== gatedSentence('Q10.capability-9') || ships('Q10.capability-9'))
                      .map((it) => (
                        <li key={it.line}>
                          <Inline nodes={it.inline} />
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
          {compMore.map((l) => (
            <p key={l.href} className="mt-8">
              <TextLink href={l.href}>{l.label}</TextLink>
            </p>
          ))}
        </div>
      </section>

      {/* 5. Testimonial (Cobalt band; shows now, not gated on Q11) */}
      {quote ? (
        <Testimonial
          mode="excerpt"
          heading={testimonial.heading}
          headingId="home-testimonial"
          quote={quote.text}
          credit={microcopy('testimonial-credit', 'home.md')}
          link={testimonialLink ? { label: testimonialLink.label, href: testimonialLink.href } : undefined}
        />
      ) : null}

      {/* 6. Services preview */}
      <section className="band-paper section" aria-labelledby="home-services">
        <div className="wrap">
          <h2 id="home-services" className="t-h2">
            {services.heading}
          </h2>
          <div className="grid-12 mt-10">
            {serviceGroups.map((g) => (
              <div key={g.name} className={`lg:col-span-4 ${s.service}`}>
                <h3 className="t-h3">{g.name}</h3>
                {g.line ? <p>{g.line.text}</p> : null}
              </div>
            ))}
          </div>
          <div className={`actions ${s.footRow}`}>
            {servicesLink && isLinkable(servicesLink.href) ? <TextLink href={servicesLink.href}>{servicesLink.label}</TextLink> : null}
            {servicesCta ? <BookDiscoveryCall label={servicesCta.label} variant="secondary" /> : null}
          </div>
        </div>
      </section>

      {/* 7. Closing strip (centred: short heading, one line, centred button, no reply-time line) */}
      <section className={`band-dark section ${s.closing}`} aria-labelledby="home-closing">
        <div className="wrap">
          <h2 id="home-closing" className="t-h2 mx-auto max-w-[22ch]">
            {closing.heading}
          </h2>
          {blocksOf(closing.blocks, 'paragraph').map((p) => (
            <p key={p.line} className="mt-4 t-muted">
              <Inline nodes={p.inline} />
            </p>
          ))}
          <div className={`actions ${s.closingActions}`}>
            <ButtonLink href={primary.target} variant="primary">
              {primary.label}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
