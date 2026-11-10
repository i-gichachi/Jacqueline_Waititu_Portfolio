import type { ReactNode } from 'react';

/**
 * Closing call-to-action band on olive-deep, so it never merges with the ink footer. Used only on Home and
 * Leadership. Never revealed on scroll: the heading and the actions show on first paint.
 */
export function CtaBand({ eyebrow, title, body, actions }: { eyebrow?: string; title: string; body: string; actions: ReactNode }) {
  return (
    <section className="on-ink relative overflow-hidden bg-olive-deep text-on-ink">
      <div className="container-x section relative grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h2 className="text-h1">{title}</h2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-6">
          <p className="text-lead text-on-ink-muted">{body}</p>
          <div className="flex flex-wrap gap-3">{actions}</div>
        </div>
      </div>
    </section>
  );
}
