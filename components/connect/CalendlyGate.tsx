'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';

const CONSENT_KEY = 'jw-cookie-consent';
const CONSENT_EVENT = 'jw-cookie-change';
const LOAD_EVENT = 'jw-calendly-load';

/**
 * Privacy gate for the Calendly embed (content/legal.ts, sections 'booking' and 'cookies').
 * Nothing is requested from Calendly until the visitor has chosen "Accept all" in the cookie banner
 * or pressed "Load the calendar". Until then the scheduler-shaped panel (children) shows instead.
 */
export function CalendlyGate({ src, title, children }: { src: string; title: string; children: ReactNode }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CONSENT_KEY) === 'accepted') setLoad(true);
    } catch {
      /* storage blocked: stay gated */
    }
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<string>).detail === 'accepted') setLoad(true);
    };
    const onLoad = () => setLoad(true);
    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(LOAD_EVENT, onLoad);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(LOAD_EVENT, onLoad);
    };
  }, []);

  if (!load) return <>{children}</>;
  return (
    <div className="card overflow-hidden">
      <iframe src={src} title={title} loading="lazy" className="block h-176 w-full border-0 bg-surface lg:h-168" />
    </div>
  );
}

/** Button inside the panel that loads the calendar on request. */
export function LoadCalendarButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(LOAD_EVENT))}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-btn) bg-olive px-5 py-2.5 text-small font-semibold tracking-[0.01em] whitespace-nowrap text-on-ink transition-all duration-300 ease-(--ease-out-expo) hover:-translate-y-0.5 hover:bg-olive-600 active:scale-[0.98] sm:px-6 ${className}`}
    >
      <CalendarDays aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
      Load the calendar
    </button>
  );
}
