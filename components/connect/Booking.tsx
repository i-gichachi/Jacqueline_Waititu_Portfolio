import { CalendarDays, ChevronLeft, ChevronRight, Globe, Video } from 'lucide-react';
import { hasBookingLink, site } from '../../content/site.ts';
import Link from 'next/link';
import { CalendlyGate, LoadCalendarButton } from './CalendlyGate.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

/**
 * Booking grid. The only URL is site.calendly (content/site.ts): swap in her event link there.
 * Round 4 (B9, Ian's decision): while it is the bare https://calendly.com placeholder this section does not
 * render, and Connect is email-only (ConnectIntro shows email and phone as the booking route). Once the link
 * carries a booking path, the panel shows with a "Load the calendar" button, and the Calendly iframe replaces
 * it only after consent (Accept all) or that click (CalendlyGate). No other code change is needed.
 */
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
/* Decorative month: starts on a Wednesday, 30 days. Weekdays look bookable, one is selected. */
const lead = 2;
const days = Array.from({ length: 30 }, (_, i) => i + 1);
const selected = 17;
const slots = ['09:00', '10:30', '14:00', '15:30'];

function Placeholder({ gated = false }: { gated?: boolean }) {
  return (
    <div className="card grid overflow-hidden lg:grid-cols-12">
      {/* Host details */}
      <div className="flex flex-col gap-5 border-b border-line p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="font-semibold">{site.name}</p>
            <p className="text-small text-muted">{site.role}</p>
          </div>
        </div>
        <div className="border-t border-line pt-5">
          <h3 className="text-h3">Consultation</h3>
          <ul className="mt-4 grid gap-3 text-body-sm text-muted">
            <li className="flex items-center gap-3">
              <Video aria-hidden="true" className="size-4 shrink-0 text-olive" />
              Call details sent with your confirmation
            </li>
            <li className="flex items-center gap-3">
              <Globe aria-hidden="true" className="size-4 shrink-0 text-olive" />
              Times shown in your own time zone
            </li>
            <li className="flex items-center gap-3">
              <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-olive" />
              Scheduled through Calendly
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 lg:mt-auto">
          {gated && <LoadCalendarButton className="w-full" />}
          {gated && (
            <p className="text-small text-muted">
              Loading the calendar lets Calendly set its own cookies. See the{' '}
              <Link href="/privacy-policy" className="text-olive underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      {/* Decorative month grid */}
      <div aria-hidden="true" className="p-6 select-none sm:p-8 lg:col-span-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Select a date</p>
          <div className="flex gap-2 text-muted">
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-line">
              <ChevronLeft className="size-4" />
            </span>
            <span className="inline-flex size-8 items-center justify-center rounded-full border border-line">
              <ChevronRight className="size-4" />
            </span>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-center text-label font-semibold tracking-[0.14em] text-muted uppercase">
          {weekdays.map((w) => (
            <span key={w} className="py-1">
              {w}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center text-small">
          {Array.from({ length: lead }, (_, i) => (
            <span key={`x${i}`} />
          ))}
          {days.map((n) => {
            const dow = (lead + n - 1) % 7;
            const open = dow < 5 && n > 4;
            const cls =
              n === selected
                ? 'bg-olive font-semibold text-on-ink'
                : open
                  ? 'bg-olive-soft font-semibold text-olive'
                  : 'text-muted/60';
            return (
              <span key={n} className={`mx-auto inline-flex aspect-square w-full max-w-10 items-center justify-center rounded-full ${cls}`}>
                {n}
              </span>
            );
          })}
        </div>
      </div>

      {/* Decorative time slots */}
      <div className="flex flex-col border-t border-line bg-paper/60 p-6 sm:p-8 lg:col-span-3 lg:border-t-0 lg:border-l">
        <div aria-hidden="true" className="select-none">
          <p className="font-semibold">Choose a time</p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {slots.map((s, i) => (
              <span
                key={s}
                className={`inline-flex min-h-11 items-center justify-center rounded-lg border text-body-sm font-semibold tabular-nums ${
 i === 1 ? 'border-brick bg-olive-soft text-brick' : 'border-olive/30 text-olive'
 }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-5 text-small text-muted lg:mt-auto lg:pt-5">Pick a date and time on the booking page; a confirmation follows by email.</p>
      </div>
    </div>
  );
}

export function Booking() {
  if (!hasBookingLink) return null;
  return (
    <section id="booking" className="section bg-stone" aria-labelledby="booking-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Booking"
          title={<span id="booking-title">Choose a time that suits you</span>}
        />
        <Reveal delay={120} className="mt-10 lg:mt-12">
          <CalendlyGate src={`${site.calendly}?hide_gdpr_banner=1`} title={`Book a consultation with ${site.name}`}>
            <Placeholder gated />
          </CalendlyGate>
        </Reveal>
      </div>
    </section>
  );
}
