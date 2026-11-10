'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import type { Testimonial } from '../../content/career.ts';

type Tone = 'ink' | 'light';

/**
 * Testimonials for any number of entries.
 * - One entry: a feature quote, attribution beside it on desktop, so a single voice reads as deliberate.
 * - Two or more: equal-height cards side by side from lg (three to a row), a slider with arrows and dots below lg.
 * Every entry can expand to its longer text. Works on ink or light backgrounds.
 */
export function Testimonials({ items, tone = 'ink' }: { items: Testimonial[]; tone?: Tone }) {
  if (items.length === 0) return null;
  if (items.length === 1) return <Feature t={items[0]} tone={tone} />;
  return (
    <>
      <ul className={`hidden gap-6 lg:grid ${items.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
        {items.map((t) => (
          <li key={t.name + t.organisation} className="flex">
            <Card t={t} tone={tone} />
          </li>
        ))}
      </ul>
      <div className="lg:hidden">
        <Slider items={items} tone={tone} />
      </div>
    </>
  );
}

const muted = (tone: Tone) => (tone === 'ink' ? 'text-on-ink-muted' : 'text-muted');
const mark = (tone: Tone) => (tone === 'ink' ? 'text-brick-light' : 'text-brick');
const hair = (tone: Tone) => (tone === 'ink' ? 'border-line-ink' : 'border-line');

function Caption({ t, tone }: { t: Testimonial; tone: Tone }) {
  return (
    <figcaption>
      <span className="block font-semibold">{t.name}</span>
      <span className={`block text-small ${muted(tone)}`}>
        {t.role}, {t.organisation}
      </span>
    </figcaption>
  );
}

function ExpandButton({ open, onClick, tone, name }: { open: boolean; onClick: () => void; tone: Tone; name: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={`${open ? 'Show less' : 'Read more'} from ${name}`}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-small font-semibold transition-colors ${
        tone === 'ink' ? 'border-on-ink/30 hover:border-on-ink' : 'border-line-strong hover:border-text'
      }`}
    >
      {open ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
      {open ? 'Show less' : 'Read more'}
    </button>
  );
}

/** A single testimonial: attribution as the side column, the quote as the main column. */
function Feature({ t, tone }: { t: Testimonial; tone: Tone }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={`grid gap-6 lg:grid-cols-12 lg:gap-12 ${tone === 'ink' ? 'text-on-ink' : 'text-text'}`}>
      <div className={`flex flex-col gap-6 lg:col-span-4 lg:border-r lg:pr-12 ${tone === 'ink' ? 'lg:border-line-ink' : 'lg:border-line'}`}>
        <span aria-hidden="true" className={`block font-display text-[5rem] leading-[0.7] ${mark(tone)}`}>
          “
        </span>
        <div className="hidden flex-col gap-5 lg:flex">
          <Caption t={t} tone={tone} />
          {t.full && <ExpandButton open={open} onClick={() => setOpen((o) => !o)} tone={tone} name={t.name} />}
        </div>
      </div>
      <div className="lg:col-span-8">
        <blockquote>
          <p className="font-display text-h3">{t.quote}</p>
          {t.full && open && (
            <div className={`mt-6 grid gap-4 text-body-sm ${muted(tone)}`}>
              {t.full.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          )}
        </blockquote>
        <div className={`mt-8 flex flex-col gap-5 border-t pt-6 lg:hidden ${hair(tone)}`}>
          <Caption t={t} tone={tone} />
          {t.full && (
            <div>
              <ExpandButton open={open} onClick={() => setOpen((o) => !o)} tone={tone} name={t.name} />
            </div>
          )}
        </div>
      </div>
    </figure>
  );
}

/** One of several, as an equal-height card (desktop grid and mobile slider). */
function Card({ t, tone }: { t: Testimonial; tone: Tone }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={`flex w-full flex-col rounded-(--radius-card) border p-6 sm:p-8 ${hair(tone)} ${tone === 'ink' ? 'text-on-ink' : 'bg-surface text-text'}`}>
      <span aria-hidden="true" className={`block font-display text-[3.5rem] leading-[0.7] ${mark(tone)}`}>
        “
      </span>
      <blockquote className="mt-4 mb-8">
        <p className="font-display text-h4">{t.quote}</p>
        {t.full && open && (
          <div className={`mt-5 grid gap-3 text-body-sm ${muted(tone)}`}>
            {t.full.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        )}
      </blockquote>
      <div className={`mt-auto flex flex-col gap-4 border-t pt-5 ${hair(tone)}`}>
        <Caption t={t} tone={tone} />
        {t.full && (
          <div>
            <ExpandButton open={open} onClick={() => setOpen((o) => !o)} tone={tone} name={t.name} />
          </div>
        )}
      </div>
    </figure>
  );
}

function Slider({ items, tone }: { items: Testimonial[]; tone: Tone }) {
  const [index, setIndex] = useState(0);
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);
  const btn = `inline-flex size-11 items-center justify-center rounded-full border ${
    tone === 'ink' ? 'border-on-ink/30 hover:bg-on-ink hover:text-ink' : 'border-line-strong hover:bg-text hover:text-paper'
  }`;
  return (
    <div aria-roledescription="carousel" aria-label="Testimonials">
      <div key={index} aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}`} className="flex">
        <Card t={items[index]} tone={tone} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Choose a testimonial">
          {items.map((x, i) => (
            <button
              key={x.name + i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${x.name}`}
              onClick={() => setIndex(i)}
              className="inline-flex h-11 items-center"
            >
              <span
                aria-hidden="true"
                className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-brick' : `w-3 ${tone === 'ink' ? 'bg-on-ink/25' : 'bg-line-strong'}`}`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={btn}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={btn}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
