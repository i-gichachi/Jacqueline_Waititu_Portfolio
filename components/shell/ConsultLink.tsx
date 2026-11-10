'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cta } from '../../content/site.ts';

/** "Book a Consultation" link that hides itself on /connect, where the booking grid already is. */
export function ConsultLink({ className }: { className: string }) {
  if (usePathname() === '/connect') return null;
  return (
    <Link href={cta.consult.href} className={className}>
      {cta.consult.label}
    </Link>
  );
}
