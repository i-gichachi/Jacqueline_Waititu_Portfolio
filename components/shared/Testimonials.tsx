'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import type { Testimonial } from '../../content/career.ts';

/**
 * Testimonials for any number of entries. One entry shows as a feature quote; two or more become a
 * slider with arrows and dots. Each can expand to its longer text. Works on ink or light backgrounds.
 */
export function Testimonials({ items, tone = 'ink' }: { items: Testimonial[]; tone?: 'ink' | 'light' }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const many = items.length > 1;
  const t = items[index];
  const ink = tone === 'ink';
  const go = (d: number) => {
    setExpanded(false);
    setIndex((i) => (i + d + items.length) % items.length);
  };

  const initials = t.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${ink ? 'text-on-ink' : 'text-text'}`}>
      <div className="lg:col-span-1">
        <span aria-hidden="true" className={`block font-display text-[5rem] leading-[0.7] sm:text-[7rem] ${ink ? 'text-brick-light' : 'text-brick'}`}>
          “
        </span>
      </div>
      <figure key={index} className="animate-[tIn_0.6s_var(--ease-out-expo)_both] lg:col-span-11" aria-roledescription={many ? 'slide' : undefined} aria-label={many ? `${index + 1} of ${items.length}` : undefined}>
        <blockquote>
          <p className="font-display text-[1.35rem] leading-[1.35] sm:text-[1.75rem] lg:text-[2.1rem] lg:leading-[1.3]">{t.quote}</p>
          {t.full && expanded && (
            <div className={`mt-6 grid gap-4 text-[0.95rem] md:grid-cols-3 ${ink ? 'text-on-ink-muted' : 'text-muted'}`}>
              {t.full.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          )}
        </blockquote>
        <div className={`mt-8 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between ${ink ? 'border-line-ink' : 'border-line'}`}>
          <figcaption className="flex items-center gap-4">
            <span aria-hidden="true" className={`inline-flex size-12 items-center justify-center rounded-full font-display text-lg ${ink ? 'bg-ink-3 text-on-ink' : 'bg-olive-soft text-olive'}`}>
              {initials}
            </span>
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className={`block text-sm ${ink ? 'text-on-ink-muted' : 'text-muted'}`}>
                {t.role}, {t.organisation}
              </span>
            </span>
          </figcaption>
          <div className="flex items-center gap-3">
            {t.full && (
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${ink ? 'border-on-ink/30 hover:border-on-ink' : 'border-line-strong hover:border-text'}`}
              >
                {expanded ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
            {many && (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={`inline-flex size-11 items-center justify-center rounded-full border ${ink ? 'border-on-ink/30 hover:bg-on-ink hover:text-ink' : 'border-line-strong hover:bg-text hover:text-paper'}`}>
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={`inline-flex size-11 items-center justify-center rounded-full border ${ink ? 'border-on-ink/30 hover:bg-on-ink hover:text-ink' : 'border-line-strong hover:bg-text hover:text-paper'}`}>
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
        {many && (
          <div className="mt-5 flex gap-2" role="tablist" aria-label="Choose a testimonial">
            {items.map((x, i) => (
              <button
                key={x.name + i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${x.name}`}
                onClick={() => {
                  setExpanded(false);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-brick' : `w-3 ${ink ? 'bg-on-ink/25' : 'bg-line-strong'}`}`}
              />
            ))}
          </div>
        )}
      </figure>
      <style>{`@keyframes tIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
