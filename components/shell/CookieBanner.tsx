'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { hasBookingLink } from '../../content/site.ts';

const KEY = 'jw-cookie-consent';
const EVENT = 'jw-cookie-open';

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/**
 * Cookie notice. The site sets no tracking cookies itself; the choice covers third-party embeds
 * (the Calendly scheduler on /connect). Links to both legal pages, always.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!read()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(EVENT, reopen);
    return () => window.removeEventListener(EVENT, reopen);
  }, []);

  const choose = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    window.dispatchEvent(new CustomEvent('jw-cookie-change', { detail: value }));
    setOpen(false);
  };

  if (!open) return null;
  /* A slim bar on the bottom edge: at 390 it sits below the hero actions instead of over them. */
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="on-ink fixed inset-x-0 bottom-0 z-[60] animate-[cookieIn_0.5s_var(--ease-out-expo)_both] border-t border-line-ink bg-ink text-on-ink pb-[env(safe-area-inset-bottom)]"
    >
      <div className="container-x flex flex-col gap-2.5 py-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-small text-on-ink-muted md:max-w-none">
          <span className="sr-only">Cookies on this site. </span>
          Essential cookies keep the site working.{hasBookingLink && ' The booking calendar from Calendly may set its own cookies.'} Read the{' '}
          <Link href="/privacy-policy" className="text-on-ink underline underline-offset-2">Privacy Policy</Link> and{' '}
          <Link href="/terms" className="text-on-ink underline underline-offset-2">Terms of Use</Link>.
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button type="button" onClick={() => choose('accepted')} className="min-h-11 flex-1 rounded-full bg-olive px-5 text-small font-semibold hover:bg-olive-600 md:flex-none">
            Accept all
          </button>
          <button type="button" onClick={() => choose('essential')} className="min-h-11 flex-1 rounded-full border border-on-ink/30 px-5 text-small font-semibold hover:border-on-ink md:flex-none">
            Essential only
          </button>
        </div>
      </div>
      <style>{`@keyframes cookieIn{from{transform:translateY(100%)}to{transform:none}}`}</style>
    </div>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" className="link-underline text-left" onClick={() => window.dispatchEvent(new Event(EVENT))}>
      Cookie Settings
    </button>
  );
}

/** Read the visitor's choice (client only). */
export function cookieChoice(): string | null {
  return read();
}
