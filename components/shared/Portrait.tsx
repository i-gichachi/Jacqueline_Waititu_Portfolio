import Image from 'next/image';
import { site } from '../../content/site.ts';

/**
 * Portrait frame, 4:5. Always present in the home hero. Until Jacqueline sends her photograph
 * (set site.portrait) it is a plain frame in the same proportions: no initials, no monogram, no pattern.
 */
export function Portrait({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute -top-3 -right-3 bottom-10 left-10 hidden rounded-(--radius-card) border border-brick/60 lg:block" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-card) bg-olive-deep">
        {site.portrait ? (
          <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill preload={priority} sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
        ) : (
          <div role="img" aria-label={`Portrait of ${site.name} (photograph to follow)`} className="absolute inset-0" />
        )}
      </div>
    </div>
  );
}
