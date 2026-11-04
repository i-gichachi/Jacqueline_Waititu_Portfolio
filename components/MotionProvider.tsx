'use client';

/* Global motion settings: reduced motion follows the user's setting; Motion's features load lazily
   (LazyMotion with domAnimation), so pages pay for them only after first paint. */

import type { ReactNode } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';

const loadFeatures = () => import('./motion-features.ts').then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
