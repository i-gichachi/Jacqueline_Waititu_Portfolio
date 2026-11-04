import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';
import { loadRouteFile, microcopy } from '../lib/content.ts';
import { Header } from '../components/Header.tsx';
import { Footer } from '../components/Footer.tsx';
import { DrawObserver } from '../components/DrawObserver.tsx';

/* Zodiak (display) and Switzer (text), self-hosted (Fontshare, ITF Free Font License). No runtime font requests. */
const display = localFont({
  src: [
    { path: './fonts/Zodiak-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Zodiak-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display-next',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

const body = localFont({
  src: [
    { path: './fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body-next',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const home = loadRouteFile('home.md');

export const metadata: Metadata = {
  // Each route sets its own title and description from its frontmatter (lib/route-guard.ts).
  title: home.title,
  description: home.description,
  ...(process.env.SITE_URL ? { metadataBase: new URL(process.env.SITE_URL) } : {}),
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>
        <div id="top">
          <a className="skip-link" href="#main">
            {microcopy('skip-link')}
          </a>
        </div>
        {/* Motion is not loaded site-wide: the shell's motion is CSS plus one IntersectionObserver
            (DESIGN-DIRECTION section 6 allows it), keeping first-party JS small. A route that needs Motion
            wraps its own subtree in components/MotionProvider.tsx (MotionConfig reducedMotion="user" + LazyMotion). */}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <DrawObserver />
      </body>
    </html>
  );
}
