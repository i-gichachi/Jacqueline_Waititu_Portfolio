'use client';

import { useEffect, useRef, useState } from 'react';
import type { Metric } from '../../content/site.ts';

const fmt = (n: number, decimals = 0) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Animated metric value. The final value is what the server renders and what first paint, no-JS readers,
 * crawlers, screen readers and captures see. The count from `from` (default 0) is an enhancement: it plays
 * only for a figure that was below the fold when the page loaded, as it scrolls in; a figure already on screen
 * never drops to zero.
 * Reduced motion: no count at all.
 */
export function CountUp({ metric, duration = 1600 }: { metric: Metric; duration?: number }) {
  const { value, from = 0, prefix = '', suffix = '', decimals = 0 } = metric;
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === from || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    /* On screen (or partly) when the page hydrates: keep the final value, no count. */
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(from);
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(from + (value - from) * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, from, duration]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${fmt(value, decimals)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {fmt(shown, decimals)}
        {suffix}
      </span>
    </span>
  );
}
