/*
  Inner-route opener (batch B): the route's eyebrow (from [hint:eyebrow]) above the inner H1, on the
  route's first band. DESIGN-DIRECTION section 3 (inner H1) and section 14 (opener per route).
*/

import type { ReactNode } from 'react';
import { Band, Eyebrow, type Tone } from '../ui.tsx';

export function RouteOpener({
  tone,
  eyebrow,
  heading,
  children,
  tight = false,
}: {
  tone: Tone;
  eyebrow?: string;
  heading: string;
  children?: ReactNode;
  tight?: boolean;
}) {
  return (
    <Band tone={tone} tight={tight}>
      <div className="grid-12">
        <div className="lg:col-span-9">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className={`t-h1${eyebrow ? ' mt-4' : ''}`}>{heading}</h1>
        </div>
      </div>
      {children}
    </Band>
  );
}
