/*
  R4 /track-record (DESIGN-DIRECTION section 14): Deep olive opener with the eyebrow, H1 and the Lifecycle
  Rule; the answer band on Chalk; two featured case cards (6 and 6 columns) then three (4, 4, 4) on Paper;
  the contact strip as the copy has it (open decision 2: built as the copy says), on Deep olive, centred.
  Every string comes from track-record.md and the site-wide microcopy. CollectionPage JSON-LD from
  SCHEMA-PLAN.md, nothing without SITE_URL.
*/

import { groupByHeading, microcopy, splitFigure, type Block, type InlineNode } from '../../lib/content.ts';
import { lifecycleFromCopy, stageLabel } from '../../lib/lifecycle.ts';
import { guardRoute } from '../../lib/route-guard.ts';
import { Blocks } from '../Blocks.tsx';
import { ButtonLink } from '../Button.tsx';
import { CaseCard } from '../CaseCard.tsx';
import { JsonLd } from '../JsonLd.tsx';
import { LifecycleRule } from '../LifecycleRule.tsx';
import { Band, Eyebrow } from '../ui.tsx';
import { CASE_STAGE, firstStrong, section } from './case-data.ts';
import { assertListSchema, schemaFor } from '../../lib/schema.ts';
import s from './c.module.css';

export function TrackRecordPage() {
  const rf = guardRoute('/track-record');
  const hero = section(rf, 'hero');
  const answer = section(rf, 'answer');
  const cases = section(rf, 'case-studies');
  const strip = section(rf, 'contact-strip');
  if (!hero || !answer || !cases) throw new Error('/track-record: the copy is missing [hero], [answer] or [case-studies]');

  const lc = lifecycleFromCopy();
  const goLabel = microcopy('card-link-label', rf.file);

  const cards = groupByHeading(cases).map((c) => {
    const paras = c.blocks.filter((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph');
    const dateline = c.blocks.find((b) => b.type === 'dateline');
    const [summary, figurePara, proofPara] = paras;
    let figure: string | undefined;
    let figureLine: InlineNode[] | undefined;
    if (figurePara) {
      const split = splitFigure(figurePara.inline);
      if (split) {
        figure = split.figure;
        figureLine = split.rest;
      } else {
        figure = firstStrong(figurePara.inline) ?? undefined;
        figureLine = figurePara.inline;
      }
    }
    const href = c.heading.target!;
    const n = CASE_STAGE[href];
    return {
      featured: c.heading.notes.some((x) => /^Featured\b/i.test(x)),
      props: {
        href,
        stage: n && lc ? { n, label: stageLabel(lc, n) } : undefined,
        dateline: dateline?.type === 'dateline' ? dateline.text : undefined,
        title: c.heading.text,
        summary: summary?.inline ?? [],
        figure,
        figureLine,
        proofLine: proofPara?.text ?? microcopy('case-proof-line'),
        goLabel,
      },
    };
  });
  assertListSchema(cards.map((c) => ({ href: c.props.href, title: c.props.title })));

  const stripText = strip?.blocks.filter((b) => b.type === 'paragraph') ?? [];
  const stripCtas = (strip?.blocks ?? []).filter((b): b is Extract<Block, { type: 'cta' }> => b.type === 'cta');

  return (
    <>
      <JsonLd data={schemaFor('track-record')} />

      <Band tone="dark" labelledBy="tr-title">
        {hero.hints.eyebrow ? <Eyebrow>{hero.hints.eyebrow}</Eyebrow> : null}
        <h1 id="tr-title" className="t-h1 mt-4 max-w-4xl">
          {hero.heading}
        </h1>
        <LifecycleRule data={lc} className={s.lifecycle} />
      </Band>

      <Band tone="light" labelledBy="tr-answer">
        <h2 id="tr-answer" className="t-h2">
          {answer.heading}
        </h2>
        <div className="prose mt-6">
          <Blocks blocks={answer.blocks} />
        </div>
      </Band>

      <Band tone="paper" labelledBy="tr-cases">
        <h2 id="tr-cases" className="t-h2">
          {cases.heading}
        </h2>
        <ul className={`grid-12 ${s.cards}`}>
          {cards.map((c) => (
            <li key={c.props.href} className={c.featured ? 'lg:col-span-6' : 'lg:col-span-4'}>
              <CaseCard {...c.props} />
            </li>
          ))}
        </ul>
      </Band>

      {strip ? (
        <Band tone="dark" labelledBy="tr-strip" className={s.strip}>
          <h2 id="tr-strip" className="t-h2">
            {strip.heading}
          </h2>
          {stripText.length ? (
            <div className={s.stripText}>
              <Blocks blocks={stripText} />
            </div>
          ) : null}
          <div className={`actions actions-stack ${s.stripActions}`}>
            {stripCtas.map((c) => (
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

