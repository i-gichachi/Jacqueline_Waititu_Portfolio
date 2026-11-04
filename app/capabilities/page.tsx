/*
  R3 /capabilities (DESIGN-DIRECTION section 14, Expertise). Copy: site-inputs/content/capabilities.md.
  Paper opener with the H1 (ships as written, Ian 4 November 2026) and the first H2 on its Q10 fallback
  (gateFallbackText) above the answer paragraph. Three pillar groups, each a band of ruled text columns
  (never cards), all open; pillar labels hidden (Q10). Card 9 ships in the third group with no employer
  name (I17). Tools as a ruled text list (no chips, Q9); the Q10 tools sentence hidden. No CTA: the
  primary action is one text cross-link to Track Record at the foot (route note "text link only").
  No count of capabilities anywhere on the route.
*/

import { groupByHeading, sectionByTag, type InlineNode, type Section } from '../../lib/content.ts';
import { JsonLd } from '../../components/JsonLd.tsx';
import { schemaFor } from '../../lib/schema.ts';
import { routeMetadata, guardRoute } from '../../lib/route-guard.ts';
import { gateFallbackText, ships } from '../../lib/gates.ts';
import { Band, Eyebrow, type Tone } from '../../components/ui.tsx';
import { TextLink } from '../../components/Button.tsx';
import { Blocks } from '../../components/Blocks.tsx';
import { Inline } from '../../components/Inline.tsx';
import { RouteOpener } from '../../components/b/RouteOpener.tsx';
import { firstCta, fromNotes, isPara, must, noteMatches } from '../../components/b/helpers.ts';
import '../../components/b/batch-b.css';

export const metadata = routeMetadata('/capabilities');

const PILLAR_TONES: Tone[] = ['light', 'paper', 'light'];

function splitLines(inline: InlineNode[]): InlineNode[][] {
  const lines: InlineNode[][] = [[]];
  for (const n of inline) {
    if (n.type === 'br') lines.push([]);
    else lines[lines.length - 1].push(n);
  }
  return lines.filter((l) => l.length);
}

export default function CapabilitiesPage() {
  const rf = guardRoute('/capabilities');
  const hero = must(sectionByTag(rf, 'hero'), 'the [hero] section');
  const answer = must(
    rf.sections.find((s) => s.tag === null),
    'the untagged H2 section under the hero',
  );
  const pillars = rf.sections.filter((s) => s.tag === 'competencies');
  const tools = must(sectionByTag(rf, 'tools'), 'the [tools] section');
  const languages = must(sectionByTag(rf, 'languages'), 'the [languages] section');
  const primary = must(firstCta(hero, (c) => c.variant === 'primary'), 'the primary action');

  // Card ids from the copy's own note ("Card ids: `operating-model`, ..."), in card order.
  const idNote = must(fromNotes(rf, /Card ids: (.+)$/), 'the card ids note');
  const cardIds = [...idNote[1].matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]);

  const h2 = ships('Q10.capabilities-h2') ? answer.heading : gateFallbackText('Q10.capabilities-h2');
  const toolParas = tools.blocks.filter(isPara).filter((p) => ships('Q10.tools-sentence') || !noteMatches(p, /Q10/));
  const languageLines = languages.blocks.filter(isPara).flatMap((p) => splitLines(p.inline));

  let card = 0;
  const renderPillar = (s: Section, i: number) => {
    const caps = groupByHeading(s);
    const hId = `pillar-${i + 1}-heading`;
    return (
      <Band key={s.line} tone={PILLAR_TONES[i % PILLAR_TONES.length]} labelledBy={hId}>
        {s.hints.eyebrow && ships('Q10.pillar-labels') ? <Eyebrow className="mb-4">{s.hints.eyebrow}</Eyebrow> : null}
        <h2 id={hId} className="t-h2 max-w-[24ch]">
          {s.heading}
        </h2>
        <div className="grid-12 mt-10 lg:mt-12">
          {caps.map((c) => {
            const id = must(cardIds[card++], `a card id for "${c.heading.text}"`);
            // Card 9 is released by Ian (I17); the gate stays so a reversal hides it in one place.
            if (id === 'workplace-vendor-governance' && !ships('Q10.capability-9')) return null;
            return (
              <article key={id} id={id} className="b-cap lg:col-span-4" aria-labelledby={`${id}-title`}>
                <h3 id={`${id}-title`} className="t-h3">
                  {c.heading.text}
                </h3>
                <Blocks blocks={c.blocks} />
              </article>
            );
          })}
        </div>
      </Band>
    );
  };

  return (
    <>
      <JsonLd data={schemaFor('capabilities')} />
      <RouteOpener tone="paper" eyebrow={hero.hints.eyebrow} heading={hero.heading}>
        <div className="grid-12 mt-12 lg:mt-16">
          <h2 className="t-h2 lg:col-span-5">{h2}</h2>
          <div className="prose lg:col-span-6 lg:col-start-7">
            <Blocks blocks={answer.blocks} />
          </div>
        </div>
      </RouteOpener>

      {pillars.map(renderPillar)}

      <Band tone="paper">
        <div className="grid-12">
          <section className="lg:col-span-6" aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="t-h2">
              {tools.heading}
            </h2>
            <ul className="ruled-list mt-8">
              {toolParas.map((p) => (
                <li key={p.line}>
                  <Inline nodes={p.inline} />
                </li>
              ))}
            </ul>
          </section>
          <section className="lg:col-span-5 lg:col-start-8" aria-labelledby="languages-heading">
            <h2 id="languages-heading" className="t-h2">
              {languages.heading}
            </h2>
            <ul className="ruled-list mt-8">
              {languageLines.map((l, k) => (
                <li key={k}>
                  <Inline nodes={l} />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <p className="mt-12 lg:mt-16">
          <TextLink href={primary.target}>{primary.label}</TextLink>
        </p>
      </Band>
    </>
  );
}
