import { headlineMetrics } from '../../content/site.ts';
import { CountUp } from '../motion/CountUp.tsx';
import { Reveal } from '../motion/Reveal.tsx';

/* Hairline dividers: 2x2 on phones, four across from lg. */
const cell = [
  'pr-4 lg:pr-8',
  'border-l pl-4 lg:px-8',
  'border-t pr-4 lg:border-t-0 lg:border-l lg:px-8',
  'border-t border-l pl-4 lg:border-t-0 lg:px-8',
];

/** Headline metrics directly under the hero, on a deeper ink. */
export function Metrics() {
  return (
    <section aria-label="Headline results" className="on-ink border-t border-line-ink bg-ink-2 text-on-ink">
      <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
        {headlineMetrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 110} className={`flex flex-col-reverse justify-end gap-3 border-line-ink py-7 sm:py-9 lg:py-12 ${cell[i]}`}>
            <dt>
              <span className="block text-[0.85rem] leading-snug font-semibold sm:text-[0.95rem]">{m.label}</span>
              {m.detail && <span className="mt-1.5 block text-[0.78rem] leading-snug text-on-ink-muted sm:text-[0.85rem]">{m.detail}</span>}
            </dt>
            <dd className="relative pt-4 font-display text-metric text-on-ink">
              <span aria-hidden="true" className="absolute top-0 left-0 h-px w-10 origin-left scale-x-0 bg-brick-light transition-transform delay-300 duration-1000 ease-(--ease-out-expo) in-[.is-in]:scale-x-100" />
              <CountUp metric={m} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
