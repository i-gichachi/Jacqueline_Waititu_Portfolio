import Link from 'next/link';
import { ArrowRight, Clock, Wallet } from 'lucide-react';
import type { Service } from '../../content/services.ts';
import { getCase } from '../../content/cases.ts';
import { cta } from '../../content/site.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { IconTile } from '../ui/Icon.tsx';
import { Button } from '../ui/Button.tsx';
import { CheckList } from '../case/CheckList.tsx';

const label = 'text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase';

/**
 * Rich service card. On large screens each card is a subgrid spanning seven rows of the parent,
 * so titles, lists, meta rows and buttons line up across the two cards in a row.
 */
export function ServiceCard({ s, delay = 0 }: { s: Service; delay?: number }) {
  const related = s.cases.map((slug) => getCase(slug)).filter((c) => c !== undefined);
  return (
    <Reveal
      as="article"
      id={s.slug}
      delay={delay}
      className="card flex flex-col gap-5 p-6 sm:p-8 lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:gap-y-5"
    >
      <div className="flex items-center gap-4">
        <IconTile name={s.icon} />
        <h3 className="text-h3">{s.title}</h3>
      </div>

      <p className="text-muted">{s.description}</p>

      <div>
        <p className={label}>Benefits</p>
        <CheckList items={s.benefits} className="mt-3 gap-2.5 text-[0.94rem] sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1" />
      </div>

      <div className="rounded-r-xl border-l-2 border-brick bg-paper px-4 py-3">
        <p className={label}>Best for</p>
        <p className="mt-1 text-[0.94rem]">{s.bestFor}</p>
      </div>

      <dl className="grid grid-cols-2 divide-x divide-line rounded-xl border border-line">
        <div className="flex flex-col gap-1 p-4">
          <dt className={`${label} inline-flex items-center gap-1.5`}>
            <Wallet aria-hidden="true" className="size-3.5 text-olive" strokeWidth={1.75} />
            Investment
          </dt>
          <dd className="text-[0.92rem] font-semibold">{s.investment}</dd>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <dt className={`${label} inline-flex items-center gap-1.5`}>
            <Clock aria-hidden="true" className="size-3.5 text-olive" strokeWidth={1.75} />
            Duration
          </dt>
          <dd className="text-[0.92rem] font-semibold">{s.duration}</dd>
        </div>
      </dl>

      <div>
        <p className={label}>Related case studies</p>
        <ul className="mt-1.5 grid">
          {related.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/track-record/${c.slug}`}
                className="group inline-flex min-h-11 items-start gap-2 py-2.5 text-[0.94rem] font-semibold text-olive transition-colors duration-300 hover:text-brick"
              >
                <ArrowRight aria-hidden="true" className="mt-[0.2em] size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="link-underline">{c.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line pt-5 lg:self-end">
        <Button href={cta.consult.href}>{cta.consult.label}</Button>
      </div>
    </Reveal>
  );
}
