import type { NextConfig } from 'next';

const config: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  devIndicators: false,
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [{ source: '/privacy', destination: '/privacy-policy', permanent: true }];
  },
};

export default config;
