import { headlineMetrics } from '../../content/site.ts';
import { CountUp } from '../motion/CountUp.tsx';

/* Dividers: 2x2 on phones, four across from lg. */
const cell = [
  'pr-4 lg:pr-8',
  'border-l pl-4 lg:px-8',
  'border-t pr-4 lg:border-t-0 lg:border-l lg:px-8',
  'border-t border-l pl-4 lg:border-t-0 lg:px-8',
];

/**
 * Headline metrics directly under the hero, on the same ink. Never revealed on scroll: the labels and the
 * final values are on the page from first paint, and the count-up is only an enhancement (CountUp).
 */
export function Metrics() {
  return (
    <section aria-label="Headline results" className="on-ink bg-ink text-on-ink">
      <div className="container-x">
      <dl className="grid grid-cols-2 border-t border-line-ink lg:grid-cols-4">
        {headlineMetrics.map((m, i) => (
          <div key={m.label} className={`flex flex-col-reverse justify-end gap-3 border-line-ink py-7 sm:py-9 lg:py-12 ${cell[i]}`}>
            <dt>
              <span className="block text-small font-semibold">{m.label}</span>
              {m.detail && <span className="mt-1.5 block text-small text-on-ink-muted">{m.detail}</span>}
            </dt>
            <dd className="relative pt-4 font-display text-figure text-on-ink">
              <span aria-hidden="true" className="absolute top-0 left-0 h-px w-10 bg-brick-light" />
              <CountUp metric={m} />
            </dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
