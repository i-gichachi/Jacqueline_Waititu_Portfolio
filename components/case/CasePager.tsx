import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cases } from '../../content/cases.ts';

/** Previous and next case study, wrapping at the ends so both cards are always present. */
export function CasePager({ slug }: { slug: string }) {
  const i = cases.findIndex((c) => c.slug === slug);
  const prev = cases[(i - 1 + cases.length) % cases.length];
  const next = cases[(i + 1) % cases.length];
  const items = [
    { c: prev, label: 'Previous case study', dir: 'prev' as const },
    { c: next, label: 'Next case study', dir: 'next' as const },
  ];
  return (
    <nav aria-label="More case studies" className="border-t border-line bg-stone py-10 sm:py-12">
      <div className="container-x grid gap-4 sm:grid-cols-2 lg:gap-6">
        {items.map(({ c, label, dir }) => (
          <Link
            key={dir}
            href={`/track-record/${c.slug}`}
            className={`card card-hover group flex h-full flex-col gap-2 p-5 sm:p-7 ${dir === 'next' ? 'sm:items-end sm:text-right' : ''}`}
          >
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.14em] text-olive uppercase">
              {dir === 'prev' && <ArrowLeft aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />}
              {label}
              {dir === 'next' && <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </span>
            <span className="font-display text-h3 group-hover:text-olive">{c.title}</span>
            <span className="mt-auto text-sm text-muted">{c.organisation}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
