'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Item {
  id: string;
  title: string;
}

/**
 * Table of contents for a legal page: a sticky list with the current section marked on large screens,
 * a collapsible "On this page" panel on phones.
 */
export function LegalToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const list = (
    <ul className="grid gap-0.5 text-sm">
      {items.map((i) => {
        const on = i.id === active;
        return (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={on ? 'location' : undefined}
              className={`relative flex min-h-11 items-center border-l py-1.5 pl-4 transition-colors duration-300 ${on ? 'border-brick font-semibold text-text' : 'border-line text-muted hover:border-line-strong hover:text-text'}`}
            >
              {i.title}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <details className="group card px-4 lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="On this page" className="pb-4">
          {list}
        </nav>
      </details>
      <nav aria-label="Contents" className="sticky top-28 hidden lg:block">
        <p className="mb-4 text-xs font-semibold tracking-[0.16em] text-muted uppercase">On this page</p>
        {list}
      </nav>
    </>
  );
}
