import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  /** Use h1 for the first section on pages without a hero. */
  as?: 'h1' | 'h2';
  /** Right-hand slot on desktop (a link or button). */
  action?: ReactNode;
  tone?: 'light' | 'ink';
  className?: string;
}

/**
 * Section heading: eyebrow and serif title, with an optional action aligned to the right on desktop.
 * No intro or sub-paragraph under section titles, by design. Never wrapped in a reveal: headings are
 * critical copy and show on first paint.
 */
export function SectionHeading({ eyebrow, title, as = 'h2', action, className = '' }: Props) {
  const H = as;
  return (
    <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}>
      <div className="max-w-4xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <H className={as === 'h1' ? 'text-h1' : 'text-h2'}>{title}</H>
      </div>
      {action && <div className="shrink-0 md:pb-1">{action}</div>}
    </div>
  );
}
