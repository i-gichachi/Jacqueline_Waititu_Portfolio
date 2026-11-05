'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';

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
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-[60] animate-[cookieIn_0.6s_var(--ease-out-expo)_both] sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md"
    >
      <div className="on-ink rounded-2xl border border-line-ink bg-ink-2 p-5 text-on-ink shadow-[0_24px_60px_-20px_rgb(21_24_15/0.7)]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brick/20 text-brick-light">
            <Cookie className="size-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-semibold">Cookies on this site</p>
            <p className="mt-1 text-sm text-on-ink-muted">
              Essential cookies keep the site working. The booking calendar from Calendly may set its own cookies. Read the{' '}
              <Link href="/privacy-policy" className="text-on-ink underline underline-offset-2">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="text-on-ink underline underline-offset-2">Terms of Use</Link>.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2.5">
          <button type="button" onClick={() => choose('accepted')} className="min-h-10 flex-1 rounded-full bg-olive px-4 text-sm font-semibold hover:bg-olive-600">
            Accept all
          </button>
          <button type="button" onClick={() => choose('essential')} className="min-h-10 flex-1 rounded-full border border-on-ink/30 px-4 text-sm font-semibold hover:border-on-ink">
            Essential only
          </button>
        </div>
      </div>
      <style>{`@keyframes cookieIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
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
