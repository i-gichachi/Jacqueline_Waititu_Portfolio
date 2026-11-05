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

/** Fades and lifts its children in once they enter the viewport. Reduced motion shows them at once (globals.css). */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
