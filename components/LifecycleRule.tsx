/*
  The Lifecycle Rule (signature, DESIGN-DIRECTION section 9): the one operation as a ruled line in five
  segments, Stage 1 to Stage 5 deepening in blue, ending at integration (Ian, C2; the closure never appears).

  <ol aria-label> with aria-current="step" on the current stage (weight 600 plus a small square marker).
  orientation "h": horizontal from 1024px, stacked with 4px left rules below (draw runs top to bottom).
  orientation "v": always stacked (the home hero column when the portrait is late).
  Draw: CSS clip-path plus the shared IntersectionObserver (DrawObserver); visible without JavaScript.
  Stage labels and details come from the copy (lib/lifecycle.ts); Q7 dates never render as placeholders.
*/

import type { LifecycleData, StageNumber } from '../lib/lifecycle.ts';

export function LifecycleRule({
  data,
  current,
  orientation = 'h',
  className,
}: {
  data: LifecycleData | null;
  current?: StageNumber;
  orientation?: 'h' | 'v';
  className?: string;
}) {
  if (!data) return null;
  return (
    <ol
      className={['lifecycle', orientation === 'h' ? 'lifecycle-h' : 'lifecycle-v', className ?? ''].filter(Boolean).join(' ')}
      aria-label={data.label}
      data-draw=""
    >
      {data.stages.map((s, i) => (
        <li key={s.n} aria-current={current === s.n ? 'step' : undefined} style={{ ['--i' as string]: i }}>
          <span className="lc-bar" aria-hidden="true" />
          <span className="lc-stage">{s.label}</span>
          {s.detail ? <span className="lc-detail">{s.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}
