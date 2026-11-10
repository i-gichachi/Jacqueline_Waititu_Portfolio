'use client';

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  id?: string;
}

/**
 * Lifts a block in as it is scrolled to. The server renders it fully visible, so first paint, no-JS
 * readers, crawlers and screenshots always see the content. After hydration, only a block that is still
 * below the fold is held back (.reveal-wait) until it comes into view. Reduced motion: never held back.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add('reveal-wait');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.remove('reveal-wait');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove('reveal-wait');
    };
  }, []);
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
