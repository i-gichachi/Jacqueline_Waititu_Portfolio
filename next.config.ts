import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { isLive } from './lib/routes.ts';

/*
  - pageExtensions: files named page.dev.tsx (the component kit) exist only on the dev server, so the
    kit is never part of a production build.
  - env: inlines the one route flag (PREVIEW_DRAFT_ROUTES) for client components, so SiteLink decides
    the same way on the server and in the browser.
  - /privacy redirects to /privacy-policy only while /privacy-policy is live.
*/
export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    pageExtensions: dev ? ['dev.tsx', 'tsx', 'ts'] : ['tsx', 'ts'],
    env: { PREVIEW_DRAFT_ROUTES: process.env.PREVIEW_DRAFT_ROUTES === '1' ? '1' : '0' },
    // NEXT_DIST_DIR lets parallel route builders each build into their own folder (Stage 7 batches).
    distDir: process.env.NEXT_DIST_DIR || '.next',
    poweredByHeader: false,
    devIndicators: false,
    reactStrictMode: true,
    images: { formats: ['image/avif', 'image/webp'] },
    async redirects() {
      return isLive('/privacy-policy') ? [{ source: '/privacy', destination: '/privacy-policy', permanent: true }] : [];
    },
  };
}
