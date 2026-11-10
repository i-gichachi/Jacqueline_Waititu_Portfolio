'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Back to top: always an icon, never words (the label is for screen readers only). */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      className={`fixed right-4 bottom-4 z-40 inline-flex size-11 items-center justify-center rounded-full bg-olive text-on-ink transition-all duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:bg-olive-600 sm:right-6 sm:bottom-6 ${
 show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
 }`}
    >
      <ArrowUp className="size-5" aria-hidden="true" strokeWidth={2} />
    </button>
  );
}
