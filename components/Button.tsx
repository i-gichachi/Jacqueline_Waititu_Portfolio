/*
  Buttons (DESIGN-DIRECTION section 7). Radius 2px; 48px tall (header 40px with a 44px hit area on mobile).
  Primary: solid in the band's button colour. Secondary: transparent, 1px border in the band's text colour.
  Tertiary: underlined text link with a trailing arrow glyph (TextLink).
  States: hover darkens (pointer only), focus-visible ring, active scale 0.97, disabled 55%, loading keeps width.
  Colours come from the band (globals.css), so the same component is right on Chalk, Deep olive and Cobalt.
*/

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { SiteLink } from './SiteLink.tsx';

type Variant = 'primary' | 'secondary';
type Size = 'default' | 'header';

function cls(variant: Variant, size: Size, block: boolean, extra?: string) {
  return ['btn', `btn-${variant}`, size === 'header' ? 'btn-header' : '', block ? 'btn-block' : '', extra ?? '']
    .filter(Boolean)
    .join(' ');
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'default',
  block = false,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  'aria-label'?: string;
}) {
  return (
    <SiteLink href={href} className={cls(variant, size, block, className)} {...rest}>
      {children}
    </SiteLink>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  block = false,
  loading = false,
  loadingLabel,
  className,
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  /** Visible while loading; pass the loading microcopy (e.g. loading-generic). */
  loadingLabel?: string;
}) {
  return (
    <button
      type={type}
      className={cls(variant, size, block, className)}
      data-loading={loading ? 'true' : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className="btn-label">{children}</span>
      {loading && loadingLabel ? <span className="btn-loading">{loadingLabel}</span> : null}
    </button>
  );
}

export function TextLink({ href, children, arrow = true, className }: { href: string; children: ReactNode; arrow?: boolean; className?: string }) {
  return (
    <SiteLink href={href} className={['tlink', arrow ? 'tlink-arrow' : '', className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </SiteLink>
  );
}
