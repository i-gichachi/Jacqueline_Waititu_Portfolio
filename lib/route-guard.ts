/*
  Route helpers for page files (server only). Every page.tsx starts with:

    export const metadata = routeMetadata('/leadership');
    export default function Page() { guardRoute('/leadership'); ... }

  guardRoute() calls notFound() when the route is not live (drafts without PREVIEW_DRAFT_ROUTES=1),
  so a draft route is never generated as a page in production. routeMetadata() takes the title and
  description from the route file's frontmatter and marks preview-built drafts noindex, nofollow.
*/

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasRouteFile, loadRouteFile, type RouteFile } from './content.ts';
import { isDraft, isLive, ROUTES, type RoutePath } from './routes.ts';

export function guardRoute(path: RoutePath): RouteFile {
  if (!isLive(path)) notFound();
  const file = ROUTES[path].file;
  if (!hasRouteFile(file)) throw new Error(`${path}: ${file} is not in site-inputs/content yet`);
  return loadRouteFile(file);
}

export function routeMetadata(path: RoutePath): Metadata {
  if (!isLive(path)) return { robots: { index: false, follow: false } };
  const file = ROUTES[path].file;
  if (!hasRouteFile(file)) return {};
  const rf = loadRouteFile(file);
  const meta: Metadata = { title: { absolute: rf.title }, description: rf.description };
  if (isDraft(path)) meta.robots = { index: false, follow: false };
  if (process.env.SITE_URL) meta.alternates = { canonical: path };
  return meta;
}
