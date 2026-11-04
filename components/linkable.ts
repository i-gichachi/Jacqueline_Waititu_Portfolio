import { classifyHref } from '../lib/routes.ts';

/** True when SiteLink renders a real link for this href (use it to drop a wrapping <li> or label). */
export function isLinkable(href: string): boolean {
  const k = classifyHref(href);
  return k.kind !== 'route' || (k.known && k.live);
}
