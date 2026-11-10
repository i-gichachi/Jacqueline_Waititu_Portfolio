import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex min-w-0 items-center gap-1.5 text-small font-semibold text-muted">
        {items.map((c, i) => (
          <li key={c.label} className={`flex items-center gap-1.5 ${c.href ? 'shrink-0' : 'min-w-0'}`}>
            {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-line-strong" />}
            {c.href ? (
              <Link href={c.href} className="link-underline inline-flex min-h-11 items-center hover:text-olive">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate text-text">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
