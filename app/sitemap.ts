import type { MetadataRoute } from 'next';
import { sitemapRoutes } from '../lib/routes.ts';

/* Approved routes only, never drafts (not even in preview). Absolute URLs need the domain (I6): until
   SITE_URL is set the sitemap is empty rather than carrying a placeholder. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL?.replace(/\/$/, '');
  if (!base) return [];
  return sitemapRoutes().map((p) => ({ url: `${base}${p === '/' ? '/' : p}` }));
}
