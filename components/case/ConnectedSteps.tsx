import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal.tsx';

export interface ConnectedStep {
  icon: ReactNode;
  title: string;
  body: string;
}

const LG_COLS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

/**
 * Equal cards joined by a drawn brick line through their icon nodes.
 * Phones: a vertical line between stacked steps. Desktop: one horizontal line from the first node to the last.
 * No index numbers; the icon carries each step.
 */
export function ConnectedSteps({ steps }: { steps: ConnectedStep[] }) {
  const n = steps.length;
  return (
    <Reveal className="group/draw relative">
      <span
        aria-hidden="true"
        className="absolute top-6 left-6 hidden h-px origin-left scale-x-0 bg-brick/45 transition-transform delay-300 duration-[1600ms] ease-(--ease-out-expo) group-[.is-in]/draw:scale-x-100 lg:block"
        style={{ right: `calc((100% - ${n - 1} * 1.5rem) / ${n} - 1.5rem)` }}
      />
      <ol className={`relative grid gap-4 lg:gap-6 ${LG_COLS[n] ?? 'lg:grid-cols-3'}`}>
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={120 + i * 110} className="relative flex gap-4 lg:flex-col lg:gap-5">
            {i < n - 1 && (
              <span
                aria-hidden="true"
                className="absolute top-12 -bottom-4 left-6 w-px origin-top scale-y-0 bg-brick/45 transition-transform delay-500 duration-1000 ease-(--ease-out-expo) group-[.is-in]/draw:scale-y-100 lg:hidden"
              />
            )}
            <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-olive shadow-(--shadow-card)">
              {s.icon}
            </span>
            <div className="card flex min-w-0 flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-h3">{s.title}</h3>
              <p className="mt-2.5 text-[0.94rem] text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Reveal>
  );
}
