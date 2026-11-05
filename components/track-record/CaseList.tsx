import type { CaseStudy } from '../../content/cases.ts';
import { CaseCard } from '../shared/CaseCard.tsx';
import { Reveal } from '../motion/Reveal.tsx';

/** All case studies as full-width row cards of one uniform height, revealed in a stagger. */
export function CaseList({ cases }: { cases: CaseStudy[] }) {
  return (
    <ul className="mt-10 grid auto-rows-fr gap-5 lg:mt-14 lg:gap-6">
      {cases.map((c, i) => (
        <Reveal as="li" key={c.slug} delay={i * 90} className="h-full">
          <CaseCard c={c} variant="row" />
        </Reveal>
      ))}
    </ul>
  );
}
