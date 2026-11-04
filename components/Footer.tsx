/*
  Footer (Olive 2). Every string comes from the site-wide microcopy (not-found.md).
  - Pages: the nav set through SiteLink (Advisory disappears while /advisory is not live).
  - Contact: email (mailto with footer-email-subject), phone when the footer-phone key exists (Q23),
    LinkedIn, Nairobi, EAT. No WhatsApp.
  - Next step: Book a discovery call opens the advisory email until the Calendly link arrives (Q22).
    No CV link (Q14).
  - Legal: footer-privacy -> /privacy-policy and, right next to it, footer-terms -> /terms when that key
    exists; both through SiteLink, so each renders only while its route is live. The heading renders
    only when one of them does. No Cookie settings and no consent banner (I6).
  - Dynamic copyright year; Back to top (smooth scroll in CSS, instant under reduced motion).
  No tagline (I8).
*/

import { fillYear, microcopy, optionalMicrocopy } from '../lib/content.ts';
import { isLive } from '../lib/routes.ts';
import { ships } from '../lib/gates.ts';
import { bookingHref, email, linkedInUrl, mailto, navItems, phone } from '../lib/site.ts';
import { SiteLink } from './SiteLink.tsx';

export function Footer() {
  const pages = navItems().filter((i) => isLive(i.href));
  const tel = phone();
  const legal = [
    { href: '/privacy-policy', label: microcopy('footer-privacy') },
    ...(optionalMicrocopy('footer-terms') ? [{ href: '/terms', label: microcopy('footer-terms') }] : []),
  ].filter((l) => isLive(l.href));

  return (
    <footer className="band-footer site-footer">
      <div className="wrap">
        <div className="grid-12">
          <div className="lg:col-span-4">
            <p className="foot-brand">{microcopy('footer-name')}</p>
            <p className="t-muted mt-2">
              {microcopy('footer-role')}
            </p>
          </div>

          <nav className="col-span-2 lg:col-span-2" aria-labelledby="footer-pages">
            <h2 id="footer-pages">{microcopy('footer-heading-pages')}</h2>
            <ul>
              {pages.map((p) => (
                <li key={p.href}>
                  <SiteLink href={p.href}>{p.label}</SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="order-last lg:order-none lg:col-span-3 [overflow-wrap:anywhere]">
            <h2>{microcopy('footer-heading-contact')}</h2>
            <ul>
              <li>
                <a href={mailto('footer-email-subject')}>{email()}</a>
              </li>
              {tel ? (
                <li>
                  <a href={tel.href}>{tel.label}</a>
                </li>
              ) : null}
              <li>
                <a href={linkedInUrl()} target="_blank" rel="noopener noreferrer" aria-label={microcopy('nav-linkedin-label')}>
                  {microcopy('footer-linkedin')}
                </a>
              </li>
              <li>{microcopy('footer-location')}</li>
              <li>{microcopy('footer-time-zone')}</li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2>{microcopy('footer-heading-next')}</h2>
            <ul>
              <li>
                <a href={bookingHref()}>{microcopy('footer-booking')}</a>
              </li>
              {/* Download the CV (footer-cv) joins this list only when Q14 ships. */}
              {ships('Q14.cv') ? <li>{microcopy('footer-cv')}</li> : null}
            </ul>
            {legal.length > 0 ? (
              <>
                <h2 className="mt-6">{microcopy('footer-heading-legal')}</h2>
                <ul>
                  {legal.map((l) => (
                    <li key={l.href}>
                      <SiteLink href={l.href}>{l.label}</SiteLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="legal-row">
          <span>{fillYear(microcopy('copyright'))}</span>
          <a href="#top">{microcopy('back-to-top')}</a>
        </div>
      </div>
    </footer>
  );
}
