import { careerArc } from '../../content/career.ts';
import { Reveal } from '../motion/Reveal.tsx';

/**
 * The career arc from 2008 to General Manager: a brick line that draws across (down on phones)
 * once the strip is in view, with each step staggering in behind it.
 */
export function CareerArc() {
  const last = careerArc.length - 1;
  return (
    <Reveal className="card p-5 sm:p-7 lg:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase font-sans">Career arc</h2>
        <p className="text-sm text-muted">
          {careerArc[0].year} to today
        </p>
      </div>
      <div className="relative mt-6 lg:mt-8">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-2 w-px -translate-x-1/2 bg-line lg:top-2 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2" />
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-2 w-px -translate-x-1/2 origin-top scale-y-0 bg-brick transition-transform duration-1600 ease-(--ease-out-expo) in-[.is-in]:scale-y-100 lg:top-2 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:translate-x-0 lg:-translate-y-1/2 lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:in-[.is-in]:scale-x-100"
        />
        <ol className="grid gap-6 pl-8 lg:grid-cols-5 lg:gap-6 lg:pt-10 lg:pl-0">
        {careerArc.map((step, i) => {
          const delay = { transitionDelay: `${250 + i * 220}ms` };
          const now = i === last;
          return (
            <li key={`${step.year}-${step.org}`} className="relative">
              <span
                aria-hidden="true"
                style={delay}
                className={`absolute top-1 -left-8 size-4 scale-50 rounded-full border-2 border-brick opacity-0 transition-[opacity,scale] duration-700 ease-(--ease-out-expo) in-[.is-in]:scale-100 in-[.is-in]:opacity-100 lg:-top-10 lg:left-0 ${now ? 'bg-brick shadow-[0_0_0_5px_var(--color-brick-soft)]' : 'bg-surface'}`}
              />
              <div style={delay} className="translate-y-2 opacity-0 transition-[opacity,translate] duration-700 ease-(--ease-out-expo) in-[.is-in]:translate-y-0 in-[.is-in]:opacity-100">
                <p className="text-sm font-semibold tabular-nums text-olive">{step.year}</p>
                <p className="mt-1 font-display text-lg leading-snug lg:text-xl">{step.title}</p>
                <p className="mt-0.5 text-sm text-muted">{step.org}</p>
              </div>
            </li>
          );
        })}
        </ol>
      </div>
    </Reveal>
  );
}
