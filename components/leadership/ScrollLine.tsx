'use client';

import { useEffect, useRef } from 'react';

/**
 * A brick line that draws down its parent as the parent scrolls through the viewport.
 * Sits over a hairline track. Reduced motion shows it fully drawn.
 */
export function ScrollLine({ className = '' }: { className?: string }) {
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = fill.current;
    const parent = el?.parentElement?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = 'scaleY(1)';
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = parent.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      el.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span aria-hidden="true" className={`absolute top-0 bottom-0 w-px bg-line-strong ${className}`}>
      <span ref={fill} className="absolute inset-0 origin-top bg-brick" style={{ transform: 'scaleY(0)' }} />
    </span>
  );
}
