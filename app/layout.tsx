import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';
import { site } from '../content/site.ts';
import { Header } from '../components/shell/Header.tsx';
import { Footer } from '../components/shell/Footer.tsx';
import { CookieBanner } from '../components/shell/CookieBanner.tsx';
import { BackToTop } from '../components/shell/BackToTop.tsx';
import { ScrollReset } from '../components/shell/ScrollReset.tsx';

/* Zodiak (display) and Switzer (text), self-hosted (Fontshare, ITF Free Font License). */
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_GB' },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#15180f',
  colorScheme: 'light',
};

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  sameAs: [site.linkedin],
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Monarch Business School' },
    { '@type': 'CollegeOrUniversity', name: 'Egerton University' },
  ],
  worksFor: { '@type': 'Organization', name: 'Social Discovery Group' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[70] rounded-full bg-olive px-4 py-2 font-semibold text-on-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReset />
        <BackToTop />
        <CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      </body>
    </html>
  );
}
