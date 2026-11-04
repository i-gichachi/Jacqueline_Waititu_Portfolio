import type { MetadataRoute } from 'next';
import { previewOnlyRoutes } from '../lib/routes.ts';

/* Draft routes built for preview (PREVIEW_DRAFT_ROUTES=1) are disallowed; in production they are not built
   and not listed, so robots.txt does not name them. The sitemap line appears only once the domain is set (I6). */
export default function robots(): MetadataRoute.Robots {
  const disallow = previewOnlyRoutes();
  return {
    rules: { userAgent: '*', allow: '/', ...(disallow.length ? { disallow } : {}) },
    ...(process.env.SITE_URL ? { sitemap: `${process.env.SITE_URL.replace(/\/$/, '')}/sitemap.xml` } : {}),
  };
}
