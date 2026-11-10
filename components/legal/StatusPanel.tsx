import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { nav } from '../../content/site.ts';

/** Shared layout for the not-found and error pages: message and actions on the left, page links on the right. */
export function StatusPanel({ code, eyebrow, title, body, actions }: { code: string; eyebrow: string; title: string; body: string; actions: ReactNode }) {
  return (
    <section className="section flex min-h-[80dvh] items-center pt-24 lg:pt-28">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative lg:col-span-7">
          <p aria-hidden="true" className="pointer-events-none absolute -top-6 right-0 font-display text-[7rem] leading-none text-stone select-none sm:text-[10rem] lg:-top-14 lg:text-[13rem]">
            {code}
          </p>
          <div className="relative">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h1 className="text-h1">{title}</h1>
            <p className="mt-4 max-w-xl text-lead text-muted">{body}</p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
        <nav aria-label="Pages on this site" className="card p-5 sm:p-6 lg:col-span-5">
          <p className="text-label font-semibold tracking-[0.14em] text-muted uppercase">Where to next</p>
          <ul className="mt-3">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-line last:border-b-0">
                <Link href={n.href} className="group flex min-h-12 items-center justify-between gap-4 py-2 font-semibold transition-colors hover:text-brick">
                  {n.label}
                  <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brick" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
