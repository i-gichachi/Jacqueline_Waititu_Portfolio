import { CalendarDays } from 'lucide-react';
import type { LegalDoc } from '../../content/legal.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { LegalToc } from './LegalToc.tsx';
import { RichText } from './RichText.tsx';

/** Shared layout for the Privacy Policy and Terms of Use: compact header row, sticky contents, full-width sections. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <header className="border-b border-line pt-24 pb-10 lg:pt-28 lg:pb-12">
        <Reveal className="container-x grid gap-5 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3">{doc.eyebrow}</p>
            <h1 className="text-h1">{doc.title}</h1>
          </div>
          <div className="flex flex-col gap-4 md:col-span-5 md:pb-1">
            <p className="text-lead text-muted">{doc.intro}</p>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <CalendarDays className="size-4 text-olive" aria-hidden="true" />
              Last updated <time dateTime="2026-11-05" className="font-semibold text-text">{doc.updated}</time>
            </p>
          </div>
        </Reveal>
      </header>

      <div className="container-x grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <aside className="lg:col-span-3">
          <LegalToc items={doc.sections.map(({ id, title }) => ({ id, title }))} />
        </aside>
        <div className="lg:col-span-9">
          {doc.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className={`grid gap-3 py-8 md:grid-cols-12 md:gap-8 ${i === 0 ? 'pt-0' : 'border-t border-line'}`}
            >
              <div className="md:col-span-4">
                <span aria-hidden="true" className="mb-3 block h-px w-8 bg-brick" />
                <h2 id={`${s.id}-title`} className="text-h3">
                  {s.title}
                </h2>
              </div>
              <div className="prose-x text-muted md:col-span-8 [&_a]:font-semibold [&_strong]:text-text">
                {s.blocks.map((b, j) =>
                  typeof b === 'string' ? (
                    <p key={j}>
                      <RichText text={b} />
                    </p>
                  ) : (
                    <ul key={j} className="mb-[0.9em]">
                      {b.list.map((li) => (
                        <li key={li}>
                          <RichText text={li} />
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
