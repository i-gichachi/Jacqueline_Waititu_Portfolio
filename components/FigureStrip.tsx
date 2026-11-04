/*
  Ruled figure strip (home hero, "Four numbers, all from my CV"): 2 by 2 on a phone, four columns from 1024px.
  Each figure carries one boxed note number; the note states its scope in the copy's own words.
  Figures are static: no count-up. Rules draw; notes fade after them.
*/

import type { InlineNode } from '../lib/content.ts';
import { Inline } from './Inline.tsx';
import { Note, NoteRef } from './ui.tsx';

export interface StripFigure {
  figure: string;
  note: InlineNode[];
}

export function FigureStrip({ items, labelledBy }: { items: StripFigure[]; labelledBy?: string }) {
  return (
    <ol className="fig-strip" data-draw="" aria-labelledby={labelledBy}>
      {items.map((f, i) => (
        <li key={i} style={{ ['--i' as string]: i }}>
          <span className="draw-rule" aria-hidden="true" />
          <p className="fig fig-hero">
            {f.figure}
            <NoteRef n={i + 1} />
          </p>
          <Note n={i + 1} fade>
            <Inline nodes={f.note} />
          </Note>
        </li>
      ))}
    </ol>
  );
}
