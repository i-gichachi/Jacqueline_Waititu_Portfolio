import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';

type Variant = 'primary' | 'olive' | 'secondary' | 'ghost' | 'light' | 'outline-light';

const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-btn) py-2.5 text-sm font-semibold tracking-[0.01em] whitespace-nowrap transition-all duration-300 ease-(--ease-out-expo) active:scale-[0.98]';

const variants: Record<Variant, string> = {
  /** Garnet: the main action. */
  primary: 'px-5 sm:px-6 bg-olive text-on-ink shadow-[0_8px_20px_-10px_rgb(85_107_47/0.6)] hover:bg-olive-600 hover:-translate-y-0.5',
  /** Olive fill: strong section-level actions on light backgrounds. */
  olive: 'px-5 sm:px-6 bg-olive text-on-ink shadow-[0_8px_20px_-10px_rgb(85_107_47/0.7)] hover:bg-olive-600 hover:-translate-y-0.5',
  /** Outlined on light backgrounds. */
  secondary: 'px-5 sm:px-6 border border-line-strong bg-transparent text-text hover:border-text hover:bg-text hover:text-paper',
  /** Text with arrow. */
  ghost: 'px-0 text-olive hover:text-brick',
  /** Light fill on dark backgrounds. */
  light: 'px-5 sm:px-6 bg-on-ink text-ink hover:bg-surface hover:-translate-y-0.5',
  /** Outlined on dark backgrounds. */
  'outline-light': 'px-5 sm:px-6 border border-on-ink/35 text-on-ink hover:border-on-ink hover:bg-on-ink hover:text-ink',
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: 'arrow' | 'external' | 'download' | 'none';
  className?: string;
  external?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

export function Button({ href, children, variant = 'primary', icon = 'arrow', className = '', external, download, ariaLabel }: Props) {
  const Ico = icon === 'external' ? ArrowUpRight : icon === 'download' ? Download : icon === 'arrow' ? ArrowRight : null;
  const content = (
    <>
      <span>{children}</span>
      {Ico && (
        <Ico
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform duration-300 ${icon === 'arrow' ? 'group-hover:translate-x-1' : icon === 'download' ? 'group-hover:translate-y-0.5' : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`}
          strokeWidth={2}
        />
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external || download || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.pdf')) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(download ? { download: '' } : {})}
        {...(external || href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
