import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pillars } from '../../content/competencies.ts';
import { cta } from '../../content/site.ts';
import { Icon } from '../ui/Icon.tsx';
import { Button } from '../ui/Button.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

/**
 * Three pillars as equal cards. From md the cards share the parent's rows (subgrid), so the header
 * and each competency row line up across all three.
 */
export function Competencies() {
  return (
    <section className="section bg-paper" aria-labelledby="competencies-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Core competencies"
          title={<span id="competencies-title">Build, transform and govern the whole operation</span>}
          action={
            <Button href={cta.capabilities.href} variant="olive">
              {cta.capabilities.label}
            </Button>
          }
        />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {pillars.map((p, i) => (
            <Reveal
              key={p.id}
              as="article"
              delay={i * 120}
              className="card card-hover group relative flex flex-col overflow-hidden lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-0"
            >
              <header className="on-ink relative overflow-hidden bg-ink p-6 text-on-ink lg:p-7">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brick transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100" />
                <div className="relative">
                  <h3 className="text-h3 text-h3 ">{p.title}</h3>
                  <p className="mt-2 text-body-sm text-on-ink-muted">{p.summary}</p>
                </div>
              </header>
              {p.competencies.map((c) => (
                <div key={c.title} className="flex gap-4 px-6 py-4 lg:px-7">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive">
                    <Icon name={c.icon} className="size-[1.1rem]" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-sans text-body-sm font-semibold">{c.title}</h4>
                    <p className="mt-1.5 text-small text-muted">{c.short}</p>
                  </div>
                </div>
              ))}
              <Link
                href={`/capabilities#${p.id}`}
                className="mt-auto flex min-h-14 items-center justify-between gap-3 bg-olive-soft/60 px-6 text-small font-semibold text-olive transition-colors duration-300 hover:bg-olive hover:text-on-ink lg:px-7"
              >
                Explore {p.title}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
