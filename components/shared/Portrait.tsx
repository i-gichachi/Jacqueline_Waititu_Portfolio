import Image from 'next/image';
import { site } from '../../content/site.ts';

/**
 * Portrait frame. Always present in the home hero. Until Jacqueline sends her photograph
 * (set site.portrait), it shows a framed monogram placeholder in the same proportions.
 */
export function Portrait({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute -top-3 -right-3 bottom-10 left-10 rounded-[1.25rem] border border-brick/60" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ink-3 ring-1 ring-line-ink">
        {site.portrait ? (
          <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill priority={priority} sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
        ) : (
          <div role="img" aria-label={`Portrait of ${site.name} (photograph to follow)`} className="absolute inset-0 flex items-center justify-center">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_10%,rgb(85_107_47/0.6),transparent_60%)]" />
            <span className="relative font-display text-[clamp(4.5rem,12vw,8.5rem)] leading-none tracking-[-0.04em] text-on-ink/15">{site.initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}
