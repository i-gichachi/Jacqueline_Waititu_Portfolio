import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { cta, legalNav, nav, site } from '../../content/site.ts';
import { LinkedInMark } from '../ui/LinkedInMark.tsx';
import { CookieSettingsLink } from './CookieBanner.tsx';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-ink relative overflow-hidden bg-ink text-on-ink">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-brick/70" />
      <div className="container-x grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-1 text-sm text-on-ink-muted">{site.role}</p>
          <p className="mt-5 max-w-sm text-sm text-on-ink-muted">
            Building, scaling and integrating operations that stay steady through growth, acquisition and change.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={cta.consult.href} className="inline-flex min-h-10 items-center rounded-full bg-olive px-5 text-sm font-semibold hover:bg-olive-600">
              {cta.consult.label}
            </Link>
            <a href={site.cv} download className="inline-flex min-h-10 items-center rounded-full border border-on-ink/30 px-5 text-sm font-semibold hover:border-on-ink">
              {cta.cv.label}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-on-ink-muted uppercase">Explore</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            <li><Link className="link-underline" href="/">Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}><Link className="link-underline" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-on-ink-muted uppercase">Contact</p>
          <ul className="mt-4 grid gap-3 text-sm">
            <li><a className="inline-flex items-center gap-2.5 break-all hover:text-brick-light" href={`mailto:${site.email}`}><Mail className="size-4 shrink-0" aria-hidden="true" />{site.email}</a></li>
            <li><a className="inline-flex items-center gap-2.5 hover:text-brick-light" href={site.phoneHref}><Phone className="size-4 shrink-0" aria-hidden="true" />{site.phone}</a></li>
            <li><a className="inline-flex items-center gap-2.5 hover:text-brick-light" href={site.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInMark className="size-4 shrink-0" />LinkedIn</a></li>
            <li className="inline-flex items-center gap-2.5 text-on-ink-muted"><MapPin className="size-4 shrink-0" aria-hidden="true" />{site.location}</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-on-ink-muted uppercase">Legal</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {legalNav.map((n) => (
              <li key={n.href}><Link className="link-underline" href={n.href}>{n.label}</Link></li>
            ))}
            <li><CookieSettingsLink /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-ink">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="flex gap-4">
            {legalNav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-on-ink">{n.label}</Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
