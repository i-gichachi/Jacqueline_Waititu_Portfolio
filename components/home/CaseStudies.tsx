import { cases } from '../../content/cases.ts';
import { cta } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { CaseCard } from '../shared/CaseCard.tsx';

/** Three case studies: the first as a full-width feature, the other two as equal tiles beneath it. */
export function CaseStudies() {
  const [featured, ...rest] = cases.slice(0, 3);
  return (
    <section className="section bg-stone" aria-labelledby="cases-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Track record"
          title={<span id="cases-title">Selected case studies</span>}
          action={
            <Button href={cta.cases.href} variant="olive">
              {cta.cases.label}
            </Button>
          }
        />
        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2 lg:gap-6">
          <Reveal className="lg:col-span-2">
            <CaseCard c={featured} variant="row" />
          </Reveal>
          {rest.map((c, i) => (
            <Reveal key={c.slug} delay={(i + 1) * 120} className="h-full">
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
