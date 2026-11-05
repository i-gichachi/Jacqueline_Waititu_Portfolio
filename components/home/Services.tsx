import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '../../content/services.ts';
import { cta } from '../../content/site.ts';
import { IconTile } from '../ui/Icon.tsx';
import { Button } from '../ui/Button.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

/** Three featured advisory services. From lg the cards share rows (subgrid) so titles, text and footers line up. */
export function Services() {
  return (
    <section className="section bg-paper" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Advisory services"
          title={<span id="services-title">Structure, built for organisations that need it</span>}
          action={
            <Button href={cta.services.href} variant="olive">
              {cta.services.label}
            </Button>
          }
        />
        <ul className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {services.slice(0, 3).map((s, i) => (
            <Reveal
              as="li"
              key={s.slug}
              delay={i * 110}
              className="card card-hover group relative flex flex-col gap-4 p-5 sm:p-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-4 lg:p-7"
            >
              <div aria-hidden="true" className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-brick transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100 lg:inset-x-7" />
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <IconTile name={s.icon} />
                <h3 className="font-display text-[1.2rem] leading-snug lg:text-[1.35rem]">{s.title}</h3>
              </div>
              <p className="text-[0.92rem] text-muted">{s.description}</p>
              <div className="rounded-xl border border-line bg-stone/70 p-4">
                <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-olive uppercase">Best for</p>
                <p className="mt-1.5 text-[0.86rem] leading-snug text-text">{s.bestFor}</p>
              </div>
              <Link
                href={`/advisory#${s.slug}`}
                aria-label={`Read more about ${s.title}`}
                className="inline-flex min-h-11 items-center gap-2 border-t border-line pt-3 text-sm font-semibold text-olive hover:text-olive-600"
              >
                <span className="link-underline">Read more</span>
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
