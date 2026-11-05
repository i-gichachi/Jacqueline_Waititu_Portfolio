'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Every new page opens at the top, never mid-page. Links to an anchor (#id) keep their target. */
export function ScrollReset() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }, [pathname]);
  return null;
}
