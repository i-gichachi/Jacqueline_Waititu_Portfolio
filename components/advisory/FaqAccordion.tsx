import { Plus } from 'lucide-react';
import { Reveal } from '../motion/Reveal.tsx';

interface Faq {
  readonly q: string;
  readonly a: string;
}

/**
 * Native disclosure accordion (keyboard and screen-reader support built in, no client JavaScript).
 * Two columns on desktop, filled in reading order down each column.
 */
export function FaqAccordion({ faqs }: { faqs: readonly Faq[] }) {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-6">
      {columns.map((col, ci) => (
        <div key={ci} className="grid content-start gap-3 lg:gap-4">
          {col.map((f, i) => (
            <Reveal key={f.q} delay={(ci + i * 2) * 80}>
              <details className="card group overflow-hidden open:border-line-strong">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold transition-colors duration-300 hover:text-olive sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-olive transition-transform duration-300 group-open:rotate-45">
                    <Plus aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  </span>
                </summary>
                <p className="border-t border-line px-5 pt-4 pb-5 text-muted sm:px-6">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
