'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cta, nav, site } from '../../content/site.ts';

/**
 * Sticky header. Over the home hero it starts transparent on ink; once scrolled (or on any other page)
 * it becomes a porcelain bar with a hairline. Mobile: full-height sheet menu, rendered as a sibling of the
 * header (not inside it): the header's backdrop blur would otherwise trap the fixed sheet inside the 64px bar.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overInk = pathname === '/' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
 overInk
 ? 'on-ink border-b border-transparent bg-transparent text-on-ink'
 : 'border-b border-line bg-paper/90 text-text backdrop-blur-md'
 }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="group flex items-center" aria-label={`${site.name}, home`}>
          <span className="font-display text-h4 leading-none tracking-[-0.01em] transition-colors group-hover:text-brick ">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`relative rounded-full px-3.5 py-2 text-small font-semibold transition-colors ${
 overInk ? 'text-on-ink/80 hover:text-on-ink' : 'text-muted hover:text-text'
 } after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brick after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${
 isActive(item.href) ? (overInk ? 'text-on-ink' : 'text-text') : ''
 }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.consult.href}
            className="ml-3 inline-flex min-h-11 items-center rounded-full bg-olive px-5 text-small font-semibold text-on-ink transition-colors hover:bg-olive-600"
          >
            {cta.consult.label}
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>
    </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-ink fixed inset-x-0 top-16 bottom-0 z-[45] overflow-y-auto overscroll-contain bg-ink text-on-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-6">
          <ul className="divide-y divide-line-ink border-y border-line-ink">
            {[{ href: '/', label: 'Home' }, ...nav].map((item, i) => (
              <li key={item.href} style={{ animationDelay: `${i * 40}ms` }} className="animate-[menuIn_0.5s_var(--ease-out-expo)_both]">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="flex items-center justify-between py-4 font-display text-h3 aria-[current=page]:text-brick-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href={cta.consult.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-olive px-6 font-semibold">
              {cta.consult.label}
            </Link>
            <a href={site.cv} download className="inline-flex min-h-12 items-center justify-center rounded-full border border-on-ink/30 px-6 font-semibold">
              {cta.cv.label}
            </a>
          </div>
          <p className="mt-auto pt-10 text-small text-on-ink-muted">{site.email}</p>
        </nav>
      </div>
      <style>{`@keyframes menuIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </>
  );
}
