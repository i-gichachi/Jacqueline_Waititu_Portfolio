import Link from 'next/link';
import { ArrowRight, Building2, CalendarDays } from 'lucide-react';
import type { CaseStudy } from '../../content/cases.ts';
import { CountUp } from '../motion/CountUp.tsx';

/**
 * Case study card: title, organisation, executive summary, key metrics and the scope of the work.
 * 'tile' is the equal-height grid card (home); 'row' is the full-width ledger card (track record).
 */
export function CaseCard({ c, variant = 'tile' }: { c: CaseStudy; variant?: 'tile' | 'row' }) {
  const href = `/track-record/${c.slug}`;

  const meta = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] font-semibold text-muted">
      <span className="inline-flex items-center gap-1.5 text-olive">
        <Building2 className="size-3.5" aria-hidden="true" />
        {c.organisation}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="size-3.5" aria-hidden="true" />
        {c.period}
      </span>
    </div>
  );

  const scope = (
    <ul className="flex flex-wrap gap-1.5" aria-label="Scope of the work">
      {c.scope.map((s) => (
        <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[0.72rem] font-semibold text-muted">
          {s}
        </li>
      ))}
    </ul>
  );

  if (variant === 'row') {
    return (
      <article className="card card-hover group relative grid h-full overflow-hidden lg:grid-cols-12">
        <div className="flex flex-col gap-4 p-6 sm:p-8 lg:col-span-8 lg:p-10">
          {meta}
          <h3 className="text-h3 sm:text-[1.65rem] sm:leading-tight lg:text-[2rem]">
            <Link href={href} className="after:absolute after:inset-0 group-hover:text-olive">
              {c.title}
            </Link>
          </h3>
          <p className="text-muted">{c.summary}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
            {scope}
            <span className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-olive px-5 text-sm font-semibold text-on-ink transition-colors duration-300 group-hover:bg-brick">
              Read the case study
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
        <dl className="on-ink grid grid-cols-3 border-t border-line bg-olive-deep text-on-ink lg:col-span-4 lg:grid-cols-1 lg:border-t-0 lg:border-l">
          {c.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col-reverse justify-end gap-1.5 p-4 lg:justify-center sm:p-6 lg:px-8 ${i > 0 ? 'border-l border-line-ink lg:border-t lg:border-l-0' : ''}`}
            >
              <dt className="text-[0.72rem] leading-snug text-on-ink-muted sm:text-xs">{m.label}</dt>
              <dd className="font-display text-[1.6rem] leading-none text-on-ink sm:text-[2.1rem]">
                <CountUp metric={m} />
              </dd>
            </div>
          ))}
        </dl>
      </article>
    );
  }

  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div aria-hidden="true" className="h-1 w-full origin-left scale-x-0 bg-brick transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8 lg:p-9">
        {meta}
        <h3 className="text-h3 sm:text-[1.6rem] sm:leading-tight">
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-olive">
            {c.title}
          </Link>
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-muted">{c.summary}</p>
        <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line pt-6">
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1.5">
              <dt className="text-[0.74rem] leading-snug text-muted">{m.label}</dt>
              <dd className="font-display text-[1.6rem] leading-none text-olive sm:text-[2rem]">
                <CountUp metric={m} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          {scope}
          <span className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-olive px-5 text-sm font-semibold text-on-ink transition-colors duration-300 group-hover:bg-brick sm:self-auto">
            Read the case study
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
