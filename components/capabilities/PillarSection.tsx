import { Check, TrendingUp } from 'lucide-react';
import type { Pillar } from '../../content/competencies.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { IconTile } from '../ui/Icon.tsx';

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * One pillar: sticky title and contents on the left, its competencies on the right as roomy,
 * equal-width cards. Each card: title, full description, what it covers, and the result in practice.
 */
export function PillarSection({ pillar, tone }: { pillar: Pillar; tone: 'paper' | 'stone' }) {
  return (
    <section id={pillar.id} aria-labelledby={`${pillar.id}-title`} className={`section ${tone === 'stone' ? 'bg-stone' : ''}`}>
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow mb-3">Capability pillar</p>
            <h2 id={`${pillar.id}-title`} className="text-h2">
              {pillar.title}
            </h2>
            <ul className="mt-6 hidden border-t border-line lg:block">
              {pillar.competencies.map((c) => (
                <li key={c.title} className="border-b border-line">
                  <a href={`#${slug(c.title)}`} className="group flex min-h-11 items-center gap-3 py-2.5 text-sm text-muted transition-colors hover:text-text">
                    <span aria-hidden="true" className="h-px w-3 bg-brick transition-all duration-300 group-hover:w-5" />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <ul className="grid gap-5 lg:col-span-8 lg:gap-6">
          {pillar.competencies.map((c, i) => (
            <Reveal as="li" key={c.title} id={slug(c.title)} delay={i * 110} className="card card-hover group relative overflow-hidden">
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brick transition-transform duration-500 group-hover:scale-y-100" />
              <div className="p-6 sm:p-8 lg:p-9">
                <div className="flex items-start gap-4">
                  <IconTile name={c.icon} />
                  <h3 className="pt-1 text-h3 sm:text-[1.5rem]">{c.title}</h3>
                </div>
                <p className="mt-5 leading-relaxed text-muted">{c.body}</p>
              </div>
              <div className="grid border-t border-line md:grid-cols-2">
                <div className="px-6 py-5 sm:px-8 lg:px-9">
                  <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-olive uppercase">What it covers</p>
                  <ul className="mt-3 grid gap-2">
                    {c.scope.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-text">
                        <Check className="mt-0.5 size-4 shrink-0 text-olive" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line bg-olive-soft/50 px-6 py-5 sm:px-8 md:border-t-0 md:border-l lg:px-9">
                  <p className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-olive uppercase">
                    <TrendingUp className="size-4" aria-hidden="true" />
                    In practice
                  </p>
                  <p className="mt-3 font-semibold leading-snug text-text">{c.evidence}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
