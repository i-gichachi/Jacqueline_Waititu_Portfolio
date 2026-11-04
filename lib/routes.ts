/*
  Route availability: the ONE mechanism that decides whether a route is live.

  - ROUTES is the single map of every route on the site.
  - status 'live'  : approved for the live site; built, linked and sitemapped.
  - status 'draft' : not approved (Ian). Not generated in production, never linked, never sitemapped.
                     /privacy-policy and /terms are draft and block launch (scripts/check-launch.ts).
  - PREVIEW_DRAFT_ROUTES=1 (one env flag, read at build time) lets draft routes build for preview.
    Even then they stay out of the sitemap and are disallowed in robots.txt and marked noindex.

  Every internal link goes through components/SiteLink.tsx, which asks isLive() here, so no link
  can reach a route that is not live. next.config.ts inlines the flag for client components too.

  This file has no framework imports so the build checks (scripts/) and the unit tests can use it.
*/

export type Band = 'dark' | 'light' | 'paper' | 'cobalt';
export type RouteStatus = 'live' | 'draft';

export interface RouteDef {
  status: RouteStatus;
  /** Route copy file in site-inputs/content/ */
  file: string;
  /** Colour of the page's first band; the sticky header takes it (DESIGN-DIRECTION section 7). */
  band: Band;
}

export const ROUTES = {
  '/': { status: 'live', file: 'home.md', band: 'dark' },
  '/leadership': { status: 'live', file: 'leadership.md', band: 'light' },
  '/capabilities': { status: 'live', file: 'capabilities.md', band: 'paper' },
  '/track-record': { status: 'live', file: 'track-record.md', band: 'dark' },
  '/track-record/kenya-office-integration': { status: 'live', file: 'track-record-kenya-office-integration.md', band: 'light' },
  '/track-record/sale-due-diligence': { status: 'live', file: 'track-record-sale-due-diligence.md', band: 'light' },
  '/track-record/pandemic-remote-transition': { status: 'live', file: 'track-record-pandemic-remote-transition.md', band: 'light' },
  '/track-record/office-projects': { status: 'live', file: 'track-record-office-projects.md', band: 'light' },
  '/track-record/hr-function': { status: 'live', file: 'track-record-hr-function.md', band: 'light' },
  '/connect': { status: 'live', file: 'connect.md', band: 'light' },
  '/advisory': { status: 'live', file: 'advisory.md', band: 'cobalt' }, // approved by Ian, 4 November 2026
  '/privacy-policy': { status: 'draft', file: 'privacy-policy.md', band: 'light' },
  '/terms': { status: 'draft', file: 'terms.md', band: 'light' },
} as const satisfies Record<string, RouteDef>;

export type RoutePath = keyof typeof ROUTES;

/** The not-found page is not a link target; its band is Deep olive. */
export const NOT_FOUND_BAND: Band = 'dark';
export const NOT_FOUND_FILE = 'not-found.md';

/** The one preview flag. */
export function previewDrafts(): boolean {
  return process.env.PREVIEW_DRAFT_ROUTES === '1';
}

export function isRoutePath(path: string): path is RoutePath {
  return Object.prototype.hasOwnProperty.call(ROUTES, path);
}

/** True when the route may be rendered and linked in this build. */
export function isLive(path: string): boolean {
  const p = normalisePath(path);
  if (!isRoutePath(p)) return false;
  const def: RouteDef = ROUTES[p];
  return def.status === 'live' || (def.status === 'draft' && previewDrafts());
}

/** True only for draft routes (whether or not the preview flag builds them). */
export function isDraft(path: string): boolean {
  const p = normalisePath(path);
  return isRoutePath(p) && (ROUTES[p] as RouteDef).status === 'draft';
}

/** Routes that go into the sitemap: approved routes only, never drafts, even in preview. */
export function sitemapRoutes(): RoutePath[] {
  return (Object.keys(ROUTES) as RoutePath[]).filter((p) => (ROUTES[p] as RouteDef).status === 'live');
}

/** Draft routes that are built in this run (preview only); robots.txt disallows them. */
export function previewOnlyRoutes(): RoutePath[] {
  return previewDrafts() ? (Object.keys(ROUTES) as RoutePath[]).filter((p) => isDraft(p)) : [];
}

export function bandFor(path: string): Band {
  const p = normalisePath(path);
  return isRoutePath(p) ? ROUTES[p].band : NOT_FOUND_BAND;
}

export function normalisePath(path: string): string {
  let p = path.split('#')[0].split('?')[0];
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p === '' ? '/' : p;
}

export type HrefKind =
  | { kind: 'route'; path: string; hash: string; live: boolean; known: boolean }
  | { kind: 'hash'; hash: string }
  | { kind: 'asset'; path: string }
  | { kind: 'external'; href: string }
  | { kind: 'mailto'; href: string }
  | { kind: 'tel'; href: string };

/** Classifies an href so SiteLink and the build checks agree on what counts as a route. */
export function classifyHref(href: string): HrefKind {
  if (href.startsWith('#')) return { kind: 'hash', hash: href.slice(1) };
  if (href.startsWith('mailto:')) return { kind: 'mailto', href };
  if (href.startsWith('tel:')) return { kind: 'tel', href };
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return { kind: 'external', href };
  const path = normalisePath(href);
  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : '';
  if (path.startsWith('/_next/') || /\.[a-z0-9]{2,5}$/i.test(path)) return { kind: 'asset', path };
  return { kind: 'route', path, hash, live: isLive(path), known: isRoutePath(path) };
}
