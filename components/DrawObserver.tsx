'use client';

/*
  The one shared IntersectionObserver for the "draw" motion (DESIGN-DIRECTION sections 6 and 9).
  Content is visible without JavaScript: rules render drawn. On the client, elements marked data-draw
  that are below the fold are armed (rule clipped, notes transparent) and drawn once at 20% visibility.
  Elements already on screen are left drawn, so nothing flickers. Under reduced motion nothing is armed.
*/

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DRAW } from '../lib/motion.ts';

export function DrawObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-draw');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-drawn');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: DRAW.threshold },
    );
    // Observe every rule not yet drawn. Arm only the ones below the fold on first sight; an element armed
    // by an earlier run (effects can run twice) is still observed, so it always gets drawn.
    document.querySelectorAll<HTMLElement>('[data-draw]:not(.is-drawn)').forEach((el) => {
      if (!el.classList.contains('draw-armed')) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) return;
        el.classList.add('draw-armed');
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
