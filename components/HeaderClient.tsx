'use client';

/*
  Header (client part): takes the colour of the page's first band (lib/routes.ts), turns solid (a
  hairline under it) after 24px of scroll, marks the active page (weight 600, 2px accent underline at
  8px offset) and opens the mobile menu: a full-height sheet with 48px rows, Escape closes, focus is
  trapped and returned (Radix Dialog), "Discuss a role" sits at the foot.
*/

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import * as Dialog from 'radix-ui/dialog';
import { m } from 'motion/react';
import { bandFor, normalisePath } from '../lib/routes.ts';
import { HEADER_SOLID_AFTER_PX } from '../lib/motion.ts';
import { SiteLink } from './SiteLink.tsx';
import { LinkedInMark } from './LinkedInMark.tsx';

export interface HeaderProps {
  brand: string;
  items: { href: string; label: string }[];
  button: { label: string; href: string };
  linkedIn: { href: string; label: string };
  menu: { label: string; open: string; close: string; compactBar: boolean };
}

const BAND_CLASS = { dark: 'band-dark', light: 'band-light', paper: 'band-paper', cobalt: 'band-cobalt' } as const;

export function HeaderClient({ brand, items, button, linkedIn, menu }: HeaderProps) {
  const pathname = normalisePath(usePathname() ?? '/');
  const band = BAND_CLASS[bandFor(pathname)];
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > HEADER_SOLID_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header ${band}`} data-solid={solid ? 'true' : 'false'}>
      <div className="wrap bar">
        <SiteLink href="/" className="brand">
          {brand}
        </SiteLink>
        <nav className="nav-desktop">
          {items.map((i) => (
            <SiteLink key={i.href} href={i.href} className="nav-link" aria-current={isCurrent(i.href) ? 'page' : undefined}>
              {i.label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-right">
          <a className={`icon-link${menu.compactBar ? ' icon-link-desktop' : ''}`} href={linkedIn.href} target="_blank" rel="noopener noreferrer" aria-label={linkedIn.label}>
            <LinkedInMark />
          </a>
          <SiteLink href={button.href} className="btn btn-primary btn-header header-cta">
            {button.label}
          </SiteLink>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="menu-button" aria-label={menu.open}>
              {menu.label}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content asChild aria-describedby={undefined}>
                <div className={`menu-sheet ${band}`}>
                  <div className="wrap bar">
                    <Dialog.Title asChild>
                      <SiteLink href="/" className="brand">
                        {brand}
                      </SiteLink>
                    </Dialog.Title>
                    <Dialog.Close className="menu-button">{menu.close}</Dialog.Close>
                  </div>
                  <nav className="wrap sheet-nav">
                    <ul className="list-none">
                      {items.map((i) => (
                        <li key={i.href}>
                          <SiteLink
                            href={i.href}
                            className="sheet-link"
                            aria-current={isCurrent(i.href) ? 'page' : undefined}
                            onClick={() => setOpen(false)}
                          >
                            {i.label}
                          </SiteLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="wrap sheet-foot">
                    {menu.compactBar ? (
                      <a className="icon-link mb-4" href={linkedIn.href} target="_blank" rel="noopener noreferrer" aria-label={linkedIn.label}>
                        <LinkedInMark />
                      </a>
                    ) : null}
                    <SiteLink href={button.href} className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                      {button.label}
                    </SiteLink>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
