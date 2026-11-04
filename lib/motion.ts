/*
  Motion language "draw" (DESIGN-DIRECTION section 6), defined once. Values mirror the tokens in
  site-inputs/tokens.css; CSS uses the tokens, Motion components use these constants.

  rule-draw   clip-path inset(0 100% 0 0) to inset(0), 500ms, ease-out, once, at 20% visibility,
              80ms stagger across the five segments (CSS + one IntersectionObserver: components/DrawObserver.tsx)
  note-fade   opacity 0 to 1, 200ms, ease-out, after its rule (CSS)
  fade-in     opacity 0 to 1, 250ms, ease-out (Menu sheet: CSS keyframes in globals.css; fadeIn below for Motion users)
  rise        not used: text and figures never move
  press       scale 0.97 on active, 120ms (CSS)
  hover       colour and underline only, 150ms, pointer devices only (CSS)
  header      solid after 24px of scroll, 150ms, no blur (components/HeaderClient.tsx)
  page        none
*/

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

export const DUR = { fast: 0.15, base: 0.25, slow: 0.5, note: 0.2, press: 0.12 } as const;

export const DRAW = { threshold: 0.2, staggerMs: 80 } as const;

export const HEADER_SOLID_AFTER_PX = 24;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DUR.base, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE_OUT } },
} as const;
