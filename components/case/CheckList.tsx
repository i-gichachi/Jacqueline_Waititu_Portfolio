import { CheckCircle2 } from 'lucide-react';

export function CheckList({ items, className = '' }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`grid gap-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-[0.2em] size-[1.1rem] shrink-0 text-olive" strokeWidth={1.75} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
