import { CalendarCheck, FileText, MessagesSquare } from 'lucide-react';
import { Reveal } from '../motion/Reveal.tsx';

const steps = [
  { Icon: CalendarCheck, title: 'Book a time', body: 'Choose a slot in the calendar. A confirmation with the meeting details arrives by email.' },
  { Icon: MessagesSquare, title: 'Talk it through', body: 'We discuss the role or the organisation, the pressure on it and what a good result looks like.' },
  { Icon: FileText, title: 'Agree the next step', body: 'You receive a follow-up: next steps for a role, or a proposal with scope, timeline and investment.' },
] as const;

/** Compact "what happens next" row: three steps with icons and drawn rules, no numbers. */
export function NextSteps() {
  return (
    <section className="section bg-paper" aria-labelledby="next-title">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-3">After you book</p>
          <h2 id="next-title" className="text-h2">
            What happens next
          </h2>
        </Reveal>
        <ol className="grid gap-4 md:grid-cols-3 lg:col-span-8 lg:gap-5">
          {steps.map(({ Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 140} className="card flex h-full flex-col gap-3 p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-olive-soft text-olive">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 origin-left scale-x-0 bg-brick/40 transition-transform delay-300 duration-1000 ease-(--ease-out-expo) in-[.is-in]:scale-x-100"
                />
              </div>
              <h3 className="font-display text-[1.25rem] leading-snug">{title}</h3>
              <p className="text-[0.9rem] text-muted">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
