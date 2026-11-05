import type { ReactNode } from 'react';
import { Reveal } from '../motion/Reveal.tsx';

/** Closing call-to-action band on ink. Used only on Home and Leadership. */
export function CtaBand({ eyebrow, title, body, actions }: { eyebrow?: string; title: string; body: string; actions: ReactNode }) {
  return (
    <section className="on-ink relative overflow-hidden bg-olive-deep text-on-ink">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brick" />
      <div className="container-x section relative grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="text-h1">{title}</h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-6 lg:col-span-5">
          <p className="text-lead text-on-ink-muted">{body}</p>
          <div className="flex flex-wrap gap-3">{actions}</div>
        </Reveal>
      </div>
    </section>
  );
}
