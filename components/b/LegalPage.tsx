/*
  Chalk reading page for the draft legal routes, /privacy-policy and /terms (DESIGN-DIRECTION section 14:
  "Chalk reading page at the 55ch measure"). Built behind the preview flag only; guardRoute() 404s them in
  production. The route page decides what is hidden (README gate rows) and passes predicates; this
  component only lays the copy out: eyebrow and H1, then each [legal] section as an H2 with its prose,
  lists and the contact action.
*/

import type { ReactNode } from 'react';
import type { Block, InlineNode, RouteFile, Section } from '../../lib/content.ts';
import { sectionByTag } from '../../lib/content.ts';
import { Band, Eyebrow } from '../ui.tsx';
import { ButtonLink, TextLink } from '../Button.tsx';
import { Inline } from '../Inline.tsx';
import { must, noteMatches } from './helpers.ts';

export interface LegalRules {
  hideSection?: (s: Section) => boolean;
  hideBlock?: (b: Block) => boolean;
  hideItem?: (line: number) => boolean;
  headingFor?: (s: Section) => string;
  inline?: (nodes: InlineNode[]) => InlineNode[];
}

export function LegalPage({ rf, rules = {} }: { rf: RouteFile; rules?: LegalRules }) {
  const hero = must(sectionByTag(rf, 'hero'), `the [hero] section of ${rf.file}`);
  const sections = rf.sections.filter((s) => s.tag === 'legal' && !rules.hideSection?.(s));
  const fix = rules.inline ?? ((n: InlineNode[]) => n);

  const renderBlock = (b: Block): ReactNode => {
    if (rules.hideBlock?.(b)) return null;
    switch (b.type) {
      case 'paragraph':
        return (
          <p key={b.line}>
            <Inline nodes={fix(b.inline)} />
          </p>
        );
      case 'list': {
        const items = b.items.filter((it) => !rules.hideItem?.(it.line));
        if (!items.length) return null;
        return (
          <ul key={b.line}>
            {items.map((it) => (
              <li key={it.line}>
                <Inline nodes={fix(it.inline)} />
              </li>
            ))}
          </ul>
        );
      }
      case 'cta':
        // The copy asks for a text link where a filled button would compete with the nav button.
        return noteMatches(b, /text link, not a filled button/) ? (
          <p key={b.line}>
            <TextLink href={b.target}>{b.label}</TextLink>
          </p>
        ) : (
          <div key={b.line} className="actions actions-stack">
            <ButtonLink href={b.target} variant={b.variant}>
              {b.label}
            </ButtonLink>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Band tone="light">
      <div className="grid-12">
        <div className="lg:col-span-9">
          {hero.hints.eyebrow ? <Eyebrow>{hero.hints.eyebrow}</Eyebrow> : null}
          <h1 className="t-h1 mt-4">{hero.heading}</h1>
        </div>
        <div className="b-legal mt-12 lg:col-span-8 lg:mt-16">
          {sections.map((s, i) => (
            <section key={s.line} className="prose" aria-labelledby={`legal-${i + 1}`}>
              <h2 id={`legal-${i + 1}`} className="t-h2">
                {rules.headingFor ? rules.headingFor(s) : s.heading}
              </h2>
              {s.blocks.map(renderBlock)}
            </section>
          ))}
        </div>
      </div>
    </Band>
  );
}
