/*
  Site-wide values derived from the copy (never typed here): contacts, mailto links, nav items.
  Server-only (reads site-inputs at build time).
*/

import { allLinks, hasRouteFile, loadRouteFile, microcopy, optionalMicrocopy, SITE_WIDE_FILE } from './content.ts';
import { ships } from './gates.ts';

export function email(): string {
  return microcopy('footer-email');
}

export function mailto(subjectKey: string, file?: string, bodyKey?: string): string {
  const params = new URLSearchParams();
  params.set('subject', microcopy(subjectKey, file));
  if (bodyKey) {
    const body = optionalMicrocopy(bodyKey, file);
    if (body) params.set('body', body);
  }
  // URLSearchParams encodes spaces as "+", which some mail clients show literally; use %20.
  return `mailto:${email()}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Book a discovery call: the advisory email until the Calendly link arrives (Q22); subject site-wide,
    body from the /connect microcopy (README Q22 row). */
export function bookingHref(): string {
  return mailto('advisory-email-subject', 'connect.md', 'advisory-email-body');
}

export function roleMailto(): string {
  return mailto('role-email-subject', 'connect.md', 'role-email-body');
}

/** The published phone (Q23 answered). Undefined until the footer-phone microcopy key exists. */
export function phone(): { label: string; href: string } | undefined {
  if (!ships('Q23.contacts')) return undefined;
  const label = optionalMicrocopy('footer-phone');
  if (!label) return undefined;
  return { label, href: `tel:${label.replace(/[^\d+]/g, '')}` };
}

/** LinkedIn profile URL, read from the copy (connect.md links it). */
export function linkedInUrl(): string {
  for (const f of ['connect.md', SITE_WIDE_FILE, 'leadership.md']) {
    if (!hasRouteFile(f)) continue;
    const hit = allLinks(loadRouteFile(f)).find((l) => /linkedin\.com\/in\//i.test(l.href));
    if (hit) return hit.href;
  }
  throw new Error('No LinkedIn profile link found in the route copy');
}

/**
 * The target the copy gives a CTA label, e.g. "Discuss a role" -> "/connect#role" (home.md hero).
 * Searches the given files' [cta:...] lines; throws when the copy never pairs the label with a target.
 */
export function ctaTarget(label: string, files: string[] = ['home.md', 'leadership.md', 'track-record.md']): string {
  for (const f of files) {
    if (!hasRouteFile(f)) continue;
    for (const s of loadRouteFile(f).sections) {
      for (const b of s.blocks) if (b.type === 'cta' && b.label === label && b.target.startsWith('/')) return b.target;
    }
  }
  throw new Error(`No [cta:...] in ${files.join(', ')} gives "${label}" a target`);
}

export interface NavItem {
  href: string;
  label: string;
}

/** The five nav items in order (labels from the site-wide microcopy; Q10 page names ship as written). */
export function navItems(): NavItem[] {
  return [
    { href: '/leadership', label: microcopy('nav-leadership') },
    { href: '/capabilities', label: microcopy('nav-capabilities') },
    { href: '/track-record', label: microcopy('nav-track-record') },
    { href: '/advisory', label: microcopy('nav-advisory') },
    { href: '/connect', label: microcopy('nav-connect') },
  ];
}
