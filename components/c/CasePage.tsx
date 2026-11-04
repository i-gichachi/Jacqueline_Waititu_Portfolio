/*
  The one case-page template (R5 to R9), DESIGN-DIRECTION section 14 anatomy:
  Chalk opener (breadcrumb, dateline eyebrow, H1, Lifecycle Rule with the case's stage current) and the
  summary with its margin note; Context and Challenge side by side on Paper (twin audit calendars where
  the challenge copy names both cycles); Approach on Deep olive; Outcomes on Chalk with noted figures;
  Achievements (and the takeaway, hidden until Q10) on the Cobalt band; Tools and "How to check this case"
  with the proof line, then the pager, on Paper; the CTA band as the copy has it, on Deep olive.

  Gates: Q10.case-takeaways (hidden), Q29.phase-headings (integration and due diligence only; content
  stays), Q31.24-hour-clause (HR). Article JSON-LD from SCHEMA-PLAN.md, nothing without SITE_URL.
*/

import type { Block } from '../../lib/content.ts';
import { microcopy } from '../../lib/content.ts';
import { lifecycleFromCopy } from '../../lib/lifecycle.ts';
import { guardRoute } from '../../lib/route-guard.ts';
import type { RoutePath } from '../../lib/routes.ts';
import { AuditCalendars } from '../AuditCalendars.tsx';
import { Blocks } from '../Blocks.tsx';
import { ButtonLink } from '../Button.tsx';
import { Gate } from '../Gate.tsx';
import { Inline } from '../Inline.tsx';
import { JsonLd } from '../JsonLd.tsx';
import { LifecycleRule } from '../LifecycleRule.tsx';
import { Band, Breadcrumb, Eyebrow, Note, NoteRef, Pager } from '../ui.tsx';
import { NotedInline } from './NotedInline.tsx';
import { CASE_STAGE, calendarLabels, firstStrong, outcomeFigure, gateBlock, pagerLinks, phaseHeadingsHidden, section, splitIntro } from './case-data.ts';
import { assertCaseSchema, schemaFor } from '../../lib/schema.ts';
import s from './c.module.css';

export type CasePath =
  | '/track-record/kenya-office-integration'
  | '/track-record/sale-due-diligence'
  | '/track-record/pandemic-remote-transition'
  | '/track-record/office-projects'
  | '/track-record/hr-function';

function need<T>(v: T | undefined, what: string): T {
  if (v === undefined) throw new Error(`Case page: the copy has no ${what}`);
  return v;
}

export function CasePage({ path }: { path: CasePath }) {
  const rf = guardRoute(path as RoutePath);
  const slug = path.slice('/track-record/'.length);
  const h1 = need(section(rf, 'hero'), '[hero]').heading;
  assertCaseSchema(slug, h1);

  const lc = lifecycleFromCopy();
  const proofLine = rf.microcopy['proof-line'] ?? microcopy('case-proof-line');
  const crumb = microcopy('breadcrumb', rf.file);

  const summary = need(section(rf, 'case-summary'), '[case-summary]');
  const context = section(rf, 'context');
  const challenge = section(rf, 'challenge');
  const approach = need(section(rf, 'approach'), '[approach]');
  const outcomes = need(section(rf, 'outcomes'), '[outcomes]');
  const achievements = section(rf, 'achievements');
  const takeaway = section(rf, 'takeaway');
  const tools = section(rf, 'tools');
  const proof = section(rf, 'proof');
  const cta = section(rf, 'cta-band');

  const { intro, groups } = splitIntro(approach);
  const hideHeadings = phaseHeadingsHidden(path);
  const calendars = path === '/track-record/kenya-office-integration' ? calendarLabels(challenge) : null;

  const outcomeItems = outcomes.blocks.flatMap((b) => (b.type === 'list' ? b.items : []));
  const outcomeOther = outcomes.blocks.filter((b) => b.type !== 'list').map(gateBlock);

  const summaryParas = summary.blocks.map(gateBlock);
  const ctas = (cta?.blocks ?? []).filter((b): b is Extract<Block, { type: 'cta' }> => b.type === 'cta');

  return (
    <>
      <JsonLd data={schemaFor(`case-${slug}`)} />

      {/* Opener and summary (Chalk) */}
      <Band tone="light" labelledBy="case-title">
        <Breadcrumb label={crumb} items={[{ href: '/track-record', label: crumb }]} />
        <Eyebrow className="mt-4">{microcopy('eyebrow', rf.file)}</Eyebrow>
        <h1 id="case-title" className="t-h1 mt-4">
          {h1}
        </h1>
        <LifecycleRule data={lc} current={CASE_STAGE[path]} className={s.lifecycle} />

        <div className={`grid-12 ${s.summary}`}>
          <h2 className="t-h2 lg:col-span-4">{summary.heading}</h2>
          <div className="prose lg:col-span-5">
            {summaryParas.map((b, i) =>
              b.type === 'paragraph' ? (
                <p key={i}>
                  <NotedInline nodes={b.inline} />
                </p>
              ) : (
                <Blocks key={i} blocks={[b]} />
              ),
            )}
          </div>
          <div className="margin-note lg:col-span-3">
            <Note n={1}>{proofLine}</Note>
          </div>
        </div>
      </Band>

      {/* Context and Challenge, side by side (Paper) */}
      {context || challenge ? (
        <Band tone="paper">
          <div className="grid-12 gap-y-16">
            {context ? (
              <div className="lg:col-span-6">
                <h2 className="t-h2">{context.heading}</h2>
                <div className="prose mt-6">
                  <Blocks blocks={context.blocks.map(gateBlock)} />
                </div>
              </div>
            ) : null}
            {challenge ? (
              <div className="lg:col-span-6">
                <h2 className="t-h2">{challenge.heading}</h2>
                <div className="prose mt-6">
                  <Blocks blocks={challenge.blocks.map(gateBlock)} />
                </div>
                {calendars ? (
                  <div className="mt-8">
                    <AuditCalendars ours={calendars.ours} theirs={calendars.theirs} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </Band>
      ) : null}

      {/* Approach (Deep olive) */}
      <Band tone="dark" labelledBy="case-approach">
        <div className="grid-12">
          <h2 id="case-approach" className="t-h2 lg:col-span-4">
            {approach.heading}
          </h2>
          <div className="prose lg:col-span-5">
            <Blocks blocks={intro} />
            {hideHeadings ? groups.map((g, i) => <Blocks key={i} blocks={g.blocks} />) : null}
          </div>
        </div>
        {!hideHeadings && groups.length ? (
          <div className={`grid-12 ${s.groups}`}>
            {groups.map((g, i) => (
              <div key={i} className={`${s.group} ${groups.length === 4 ? 'lg:col-span-6' : 'lg:col-span-4'}`}>
                <h3 className="t-h3">{g.heading.text}</h3>
                <Blocks blocks={g.blocks} />
              </div>
            ))}
          </div>
        ) : null}
      </Band>

      {/* Outcomes with noted figures (Chalk) */}
      <Band tone="light" labelledBy="case-outcomes">
        <h2 id="case-outcomes" className="t-h2 prose">
          {outcomes.heading}
        </h2>
        <ul className={`${s.outcomes} ${outcomeItems.length === 3 ? s.outcomes3 : s.outcomes2}`}>
          {outcomeItems.map((it, i) => {
            const fig = outcomeFigure(it.inline);
            return (
              <li key={i}>
                {fig ? (
                  <p className={`${s.outcomeFig} fig fig-outcome`} aria-hidden="true">
                    {fig}
                    <NoteRef n={1} />
                  </p>
                ) : null}
                <p className={s.outcomeText}>
                  <Inline nodes={it.inline} />
                </p>
              </li>
            );
          })}
        </ul>
        {outcomeOther.length ? (
          <div className="prose mt-8">
            <Blocks blocks={outcomeOther} />
          </div>
        ) : null}
        <div className={s.outcomesNote}>
          <Note n={1}>{proofLine}</Note>
        </div>
      </Band>

      {/* Achievements, and the takeaway (hidden until Q10), on the Cobalt band */}
      {achievements ? (
        <Band tone="cobalt" labelledBy="case-achievements">
          <div className="grid-12">
            <h2 id="case-achievements" className="t-h2 lg:col-span-5">
              {achievements.heading}
            </h2>
            <div className="prose lg:col-span-6 lg:col-start-7">
              <Blocks blocks={achievements.blocks.map(gateBlock)} />
            </div>
          </div>
          {takeaway ? (
            <Gate id="Q10.case-takeaways">
              <div className={`grid-12 ${s.takeaway}`}>
                <h2 className="t-h2 lg:col-span-5">{takeaway.heading}</h2>
                <div className="quote lg:col-span-6 lg:col-start-7">
                  <Blocks blocks={takeaway.blocks.map(gateBlock)} />
                </div>
              </div>
            </Gate>
          ) : null}
        </Band>
      ) : null}

      {/* Tools, how to check this case, pager (Paper) */}
      <Band tone="paper">
        <div className="grid-12">
          {tools ? (
            <div className="lg:col-span-6">
              <h2 className="t-h3">{tools.heading}</h2>
              <div className="prose mt-4">
                <Blocks blocks={tools.blocks.map(gateBlock)} />
              </div>
            </div>
          ) : null}
          {proof ? (
            <div className={tools ? 'lg:col-span-6' : 'lg:col-span-8'}>
              <h2 className="t-h3">{proof.heading}</h2>
              <div className="prose mt-4">
                <Blocks blocks={proof.blocks.map(gateBlock)} />
              </div>
            </div>
          ) : null}
        </div>
        <div className={s.pager}>
          <Pager links={pagerLinks(rf)} />
        </div>
      </Band>

      {/* CTA band, as the copy has it (Deep olive; centred) */}
      {cta ? (
        <Band tone="dark" labelledBy="case-cta" className={s.strip}>
          <h2 id="case-cta" className="t-h2">
            {cta.heading}
          </h2>
          <div className={`actions actions-stack ${s.stripActions}`}>
            {ctas.map((c) => (
              <ButtonLink key={c.line} href={c.target} variant={c.variant}>
                {c.label}
              </ButtonLink>
            ))}
          </div>
        </Band>
      ) : null}
    </>
  );
}
