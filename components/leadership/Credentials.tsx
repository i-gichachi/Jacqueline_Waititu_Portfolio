import { Award, CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import { certifications, education } from '../../content/career.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { IconTile } from '../ui/Icon.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

function SubHeading({ children }: { children: string }) {
  return (
    <h3 className="flex items-center gap-4 font-sans text-label font-semibold tracking-[0.14em] text-muted uppercase after:h-px after:flex-1 after:bg-line">
      {children}
    </h3>
  );
}

/** Education as two feature cards, certifications as an even grid closed by a summary card. */
export function Credentials() {
  const areas = [...new Set(certifications.map((c) => c.area))];
  return (
    <section id="credentials" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Credentials"
          title="Education, certifications and training"
        />

        <div className="mt-10 lg:mt-14">
          <SubHeading>Education</SubHeading>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-6">
            {education.map((e, i) => (
              <Reveal key={e.award} delay={i * 120} className="card card-hover relative h-full overflow-hidden p-6 sm:p-8">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-brick" />
                <GraduationCap aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-6 -bottom-8 size-40 text-stone" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <IconTile name="graduation-cap" tone="brick" />
                    <span className="rounded-full border border-line-strong px-3 py-1 text-small font-semibold text-muted">{e.level}</span>
                  </div>
                  <p className="mt-6 font-display text-h3 ">{e.award}</p>
                  <p className="mt-auto pt-5 font-semibold">{e.institution}</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-small text-muted">
                    <MapPin className="size-4 shrink-0" aria-hidden="true" />
                    {e.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <SubHeading>Certifications and training</SubHeading>
          <ul className="mt-5 grid gap-4 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.title} delay={(i % 4) * 90} className="card card-hover flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-olive-soft text-olive">
                    <Award className="size-4.5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-olive-soft px-2.5 py-1 text-small font-semibold text-olive">{c.area}</span>
                </div>
                <p className="mt-5 pb-4 font-display text-h4 ">{c.title}</p>
                <div className="mt-auto flex min-h-19 flex-col gap-1 border-t border-line pt-4 text-small text-muted">
                  {c.issuer && <span>{c.issuer}</span>}
                  {'date' in c && c.date && (
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <CalendarDays className="size-3.5" aria-hidden="true" />
                      {c.date}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={(certifications.length % 4) * 90} className="on-ink relative flex h-full flex-col overflow-hidden rounded-(--radius-card) bg-ink p-5 text-on-ink sm:p-6">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-brick" />
              <p className="font-display text-h2 leading-none tabular-nums">{certifications.length}</p>
              <p className="mt-2 font-semibold">Certifications and training courses</p>
              <p className="mt-auto pt-4 text-small text-on-ink-muted">{areas.join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
