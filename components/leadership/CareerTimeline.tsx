import { Building2, CalendarDays, MapPin } from 'lucide-react';
import { career } from '../../content/career.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { ScrollLine } from './ScrollLine.tsx';

/** Every role, newest first, on a vertical timeline whose brick line draws as the reader scrolls. */
export function CareerTimeline() {
  return (
    <section id="career" aria-labelledby="career-title" className="section bg-stone">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career"
          title={<span id="career-title">From the service desk to the General Manager’s office</span>}
        />
        <div className="relative mt-10 lg:mt-14">
          <div aria-hidden="true" className="absolute inset-y-0 left-2 lg:left-3">
            <ScrollLine className="left-0 -translate-x-1/2" />
          </div>
          <ol className="grid gap-5 lg:gap-6">
            {career.map((role, i) => {
              const cols = role.responsibilities.length <= 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2';
              return (
                <li key={`${role.title}-${role.start}`} className="relative pl-8 lg:pl-12">
                  <span
                    aria-hidden="true"
                    className={`absolute top-8 left-2 size-4 -translate-x-1/2 rounded-full border-2 border-brick lg:top-10 lg:left-3 ${i === 0 ? 'bg-brick shadow-[0_0_0_5px_var(--color-brick-soft)]' : 'bg-surface'}`}
                  />
                  <Reveal as="article" delay={60} className="card card-hover p-5 sm:p-7 lg:p-8">
                    <header className="grid gap-4 md:grid-cols-12 md:items-start md:gap-8">
                      <div className="md:col-span-8">
                        <p className="inline-flex rounded-full bg-olive-soft px-3 py-1 text-xs font-semibold text-olive">{role.stage}</p>
                        <h3 className="mt-3 text-h3">{role.title}</h3>
                        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                          <span className="inline-flex items-center gap-2 font-semibold text-text">
                            <Building2 className="size-4 shrink-0 text-olive" aria-hidden="true" />
                            {role.organisation}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="size-4 shrink-0" aria-hidden="true" />
                            {role.location}
                          </span>
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 text-sm font-semibold tabular-nums md:col-span-4 md:justify-self-end md:pt-1">
                        <CalendarDays className="size-4 shrink-0 text-muted" aria-hidden="true" />
                        <span>
                          {role.start} – {role.end}
                        </span>
                      </p>
                    </header>
                    <ul className={`mt-5 grid gap-x-10 gap-y-3 border-t border-line pt-5 text-[0.95rem] text-muted ${cols}`}>
                      {role.responsibilities.map((r) => (
                        <li key={r.slice(0, 40)} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-brick">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
