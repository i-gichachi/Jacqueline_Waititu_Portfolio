/*
  Component kit: DEV ONLY. The .dev.tsx extension is a page extension only on the dev server
  (next.config.ts), so this page never exists in a production build (check-output fails if it does).
  Every sample string is read from site-inputs; the only typed text is the kit's own grey annotations.
*/

import type { Metadata } from 'next';
import {
  groupByHeading,
  loadRouteFile,
  microcopy,
  sectionByTag,
  splitFigure,
  type Block,
  type InlineNode,
} from '../../lib/content.ts';
import { GATES, ships, hasGateFallback, gateFallbackText, type GateId } from '../../lib/gates.ts';
import { ROUTES, isLive, previewDrafts, type RouteDef } from '../../lib/routes.ts';
import { lifecycleFromCopy, type LifecycleData, type StageNumber } from '../../lib/lifecycle.ts';
import { Band, Breadcrumb, Eyebrow, Note, Pager, StageChip, Tag } from '../../components/ui.tsx';
import { Button, ButtonLink, TextLink } from '../../components/Button.tsx';
import { FigureStrip } from '../../components/FigureStrip.tsx';
import { LifecycleRule } from '../../components/LifecycleRule.tsx';
import { CaseCard } from '../../components/CaseCard.tsx';
import { Testimonial } from '../../components/Testimonial.tsx';
import { AuditCalendars } from '../../components/AuditCalendars.tsx';
import { BookDiscoveryCall } from '../../components/BookDiscoveryCall.tsx';
import { Inline } from '../../components/Inline.tsx';
import { Gate } from '../../components/Gate.tsx';

export const metadata: Metadata = { title: 'Kit (dev only)', robots: { index: false, follow: false } };

function KitNote({ children }: { children: React.ReactNode }) {
  return <p className="t-small t-muted mt-2 border border-dashed px-2 py-1 inline-block">{children}</p>;
}

/* The Lifecycle Rule comes from the site-wide lifecycle-* microcopy (not-found.md). */
function lifecycleForKit(): { data: LifecycleData; fromCopy: boolean } {
  const copy = lifecycleFromCopy();
  if (!copy) throw new Error('lifecycle-* microcopy missing from site-inputs/content/not-found.md');
  return { data: copy, fromCopy: true };
}

function firstParagraph(blocks: Block[], pred: (b: Extract<Block, { type: 'paragraph' }>) => boolean) {
  return blocks.find((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph' && pred(b));
}

export default function Kit() {
  const home = loadRouteFile('home.md');
  const integration = loadRouteFile('track-record-kenya-office-integration.md');
  const leadership = loadRouteFile('leadership.md');
  const capabilities = loadRouteFile('capabilities.md');
  const hero = sectionByTag(home, 'hero')!;
  const heroCtas = hero.blocks.filter((b): b is Extract<Block, { type: 'cta' }> => b.type === 'cta');
  const strip = sectionByTag(home, 'proof-strip')!;
  const figures = strip.blocks
    .filter((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph')
    .map((b) => splitFigure(b.inline))
    .filter((f): f is { figure: string; rest: InlineNode[] } => !!f)
    .map((f) => ({ figure: f.figure, note: f.rest }));
  const lc = lifecycleForKit();
  const cases = groupByHeading(sectionByTag(home, 'case-studies')!);
  const proofLine = microcopy('case-proof-line');
  const competencies = sectionByTag(home, 'competencies-preview')!;
  const tools = sectionByTag(capabilities, 'tools')!;
  const homeTestimonial = sectionByTag(home, 'testimonial');
  const excerpt = homeTestimonial?.blocks.find((b): b is Extract<Block, { type: 'quote' }> => b.type === 'quote');
  const excerptLink = homeTestimonial?.blocks.find((b): b is Extract<Block, { type: 'link' }> => b.type === 'link');
  const leadTestimonial = sectionByTag(leadership, 'testimonial');
  const quote = leadTestimonial?.blocks.find((b): b is Extract<Block, { type: 'quote' }> => b.type === 'quote');
  const bridge = sectionByTag(home, 'about-bridge')!;
  const firstBridge = firstParagraph(bridge.blocks, () => true)!;
  const bridgeLink = bridge.blocks.find((b): b is Extract<Block, { type: 'link' }> => b.type === 'link');
  const toolNames = tools.blocks
    .filter((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph')
    .map((b) => b.text.split(',')[0])
    .filter((t) => t.split(' ').length <= 3);
  const pagerAll = integration.microcopy['pager-all']?.split(' -> ') ?? [];
  const pagerNext = integration.microcopy['pager-next']?.split(' -> ') ?? [];
  const stageOf = [5, 4] as StageNumber[];

  return (
    <>
      <Band tone="dark" tight>
        <Eyebrow>Kit, dev only (not in the production build)</Eyebrow>
        <h1 className="t-hero mt-4">
          <span className="t-label h1-eyebrow">{hero.hints.eyebrow}</span>
          <span className="h1-main">{hero.heading}</span>
        </h1>
        <div className="actions actions-stack mt-8">
          {heroCtas.map((c) => (
            <ButtonLink key={c.label} href={c.target} variant={c.variant}>
              {c.label}
            </ButtonLink>
          ))}
        </div>
        <h2 id="kit-strip" className="t-label mt-12">
          {strip.heading}
        </h2>
        <div className="mt-4">
          <FigureStrip items={figures} labelledBy="kit-strip" />
        </div>
      </Band>

      {(['light', 'paper', 'chalk2', 'dark', 'cobalt'] as const).map((tone) => (
        <Band key={tone} tone={tone} tight>
          <Eyebrow>Buttons on {tone}</Eyebrow>
          <div className="actions mt-4">
            <ButtonLink href={heroCtas[0].target}>{heroCtas[0].label}</ButtonLink>
            <ButtonLink href={heroCtas[1].target} variant="secondary">
              {heroCtas[1].label}
            </ButtonLink>
            <ButtonLink href={heroCtas[0].target} size="header">
              {heroCtas[0].label}
            </ButtonLink>
            <Button disabled aria-disabled="true">
              {heroCtas[0].label}
            </Button>
            <Button loading loadingLabel={microcopy('loading-generic')}>
              {heroCtas[0].label}
            </Button>
            {bridgeLink ? <TextLink href={bridgeLink.href}>{bridgeLink.label}</TextLink> : null}
          </div>
          <p className="prose mt-6">
            <Inline nodes={firstBridge.inline} />
          </p>
          <div className="mt-6 max-w-sm">
            <Note n={1}>{proofLine}</Note>
          </div>
        </Band>
      ))}

      <Band tone="light">
        <Eyebrow>Type scale</Eyebrow>
        <p className="t-h1 mt-4" style={{ fontFamily: 'var(--font-display)' }}>
          {loadRouteFile('track-record.md').sections[0].heading}
        </p>
        <h2 className="t-h2 mt-6">{bridge.heading}</h2>
        <h3 className="t-h3 mt-4">{cases[0].heading.text}</h3>
        <p className="prose mt-4">
          <Inline nodes={firstBridge.inline} />
        </p>
        <p className="t-small t-muted mt-4">{integration.microcopy.eyebrow}</p>
        <p className="quote mt-6 prose">{quote?.text}</p>
      </Band>

      <Band tone="light">
        <Eyebrow>Lifecycle Rule, horizontal, Integration current</Eyebrow>
        {!lc.fromCopy ? <KitNote>Kit stand-in from DESIGN-DIRECTION section 9: the copy has no lifecycle-* microcopy yet, so routes render no rule.</KitNote> : null}
        <div className="mt-6">
          <LifecycleRule data={lc.data} current={5} />
        </div>
      </Band>
      <Band tone="dark">
        <Eyebrow>Lifecycle Rule, vertical (late-portrait hero column), Sale current</Eyebrow>
        <div className="mt-6 max-w-xs">
          <LifecycleRule data={lc.data} current={4} orientation="v" />
        </div>
      </Band>

      <Band tone="dark">
        <h2 className="t-h2">{sectionByTag(home, 'case-studies')!.heading}</h2>
        <div className="grid-12 mt-10">
          {cases.map((c, i) => {
            const dateline = c.blocks.find((b): b is Extract<Block, { type: 'dateline' }> => b.type === 'dateline');
            const paras = c.blocks.filter((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph');
            const fig = paras.map((p) => splitFigure(p.inline)).find(Boolean);
            const go = c.blocks.find((b): b is Extract<Block, { type: 'link' }> => b.type === 'link');
            return (
              <div key={i} className="lg:col-span-6">
                <CaseCard
                  href={go?.href ?? '/track-record'}
                  stage={{ n: stageOf[i], label: lc.data.stages.find((s) => s.n === stageOf[i])?.label ?? '' }}
                  dateline={dateline?.text}
                  title={c.heading.text}
                  summary={paras[0].inline}
                  figure={fig?.figure}
                  figureLine={fig?.rest}
                  proofLine={proofLine}
                  goLabel={go?.label ?? ''}
                />
              </div>
            );
          })}
        </div>
      </Band>

      {excerpt && homeTestimonial ? (
        <Testimonial
          mode="excerpt"
          heading={homeTestimonial.heading}
          quote={excerpt.text}
          credit={microcopy('testimonial-credit', 'home.md')}
          id="kit-excerpt"
          link={excerptLink ? { label: excerptLink.label, href: excerptLink.href } : undefined}
        />
      ) : null}
      {quote && leadTestimonial ? (
        <Testimonial mode="full" heading={leadTestimonial.heading} quote={quote.text} credit={microcopy('testimonial-credit', 'leadership.md')} id={leadTestimonial.anchor ?? 'kit-full'} />
      ) : null}

      <Band tone="paper">
        <h2 className="t-h2">{competencies.heading}</h2>
        <div className="grid-12 mt-8">
          {groupByHeading(competencies).map((g, i) => (
            <div key={i} className="lg:col-span-4 pillar">
              <Gate id="Q10.pillar-labels">
                <h3 className="t-h3">{g.heading.text}</h3>
              </Gate>
              {g.blocks.map((b, k) =>
                b.type === 'list' ? (
                  <ul key={k} className="ruled-list mt-3">
                    {b.items.map((it, j) => (
                      <li key={j}>{it.text}</li>
                    ))}
                  </ul>
                ) : null,
              )}
            </div>
          ))}
        </div>
        <KitNote>Pillar labels are held by Q10 and do not render; the groups render without them.</KitNote>
        <div className="mt-8 flex flex-wrap gap-2">
          {toolNames.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Band>

      <Band tone="light">
        <Eyebrow>Twin audit calendars (aria-hidden)</Eyebrow>
        <KitNote>Row labels typed for the kit only; routes take them from the copy.</KitNote>
        <div className="mt-6 max-w-2xl">
          <AuditCalendars ours="July to June" theirs="January to December" />
        </div>
        <div className="mt-10">
          <Breadcrumb label={integration.microcopy.breadcrumb} items={[{ href: '/track-record', label: integration.microcopy.breadcrumb }, { label: integration.sections[0].heading }]} />
        </div>
        <div className="mt-6">
          <Pager links={[pagerAll, pagerNext].filter((p) => p.length === 2).map(([label, href]) => ({ label, href }))} />
        </div>
        <div className="mt-6 actions">
          <BookDiscoveryCall />
          <StageChip n={3} label={lc.data.stages[2]?.label ?? ''} />
        </div>
      </Band>

      <Band tone="chalk2">
        <Eyebrow>Routes ({previewDrafts() ? 'PREVIEW_DRAFT_ROUTES=1' : 'production flags'})</Eyebrow>
        <ul className="ruled-list mt-4 t-small">
          {(Object.entries(ROUTES) as [string, RouteDef][]).map(([p, d]) => (
            <li key={p}>
              {p}: {d.status}, {isLive(p) ? 'live in this build' : 'hidden'}
            </li>
          ))}
        </ul>
        <Eyebrow className="mt-10">Gates</Eyebrow>
        <ul className="ruled-list mt-4 t-small">
          {(Object.keys(GATES) as GateId[]).map((id) => (
            <li key={id}>
              <strong>{id}</strong>: {GATES[id].state}, {GATES[id].meanwhile}, {ships(id) ? 'renders' : 'held'}
              {'fallback' in GATES[id] ? ` (fallback: ${hasGateFallback(id) ? gateFallbackText(id) : 'not in the copy yet'})` : ''}
            </li>
          ))}
        </ul>
      </Band>
    </>
  );
}
