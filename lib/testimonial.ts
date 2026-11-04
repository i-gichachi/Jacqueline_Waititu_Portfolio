/*
  Andrew Bolton's testimonial: rendered from site-inputs/content/data/testimonial-andrew-bolton.txt,
  never retyped (README build rule 4; Ian, 4 November 2026).

  Hash method (documented as Ian asked; do not change it):
    text = readFileSync(path, 'utf8').replace(/\s+$/, '')   // UTF-8, trailing whitespace trimmed
    sha256(text) must equal the value in testimonial-andrew-bolton.sha256
    (6f507abb6bb49d51f587d3ef9e212849733234b663ab5d2f3d8020e624b47729, 3,411 characters).
  The raw file has one trailing newline, so a raw-byte sha256sum will not match; hash the trimmed text.

  Presentation rules: a testimonial, never labelled as anything else; no date, greeting, sign-off,
  signature, email, letterhead or PDF; never Review or Quotation markup. His own words inside the text
  stay exactly as written.
*/

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { contentDir } from './content.ts';

export const TESTIMONIAL_FILE = 'testimonial-andrew-bolton.txt';
export const TESTIMONIAL_HASH_FILE = 'testimonial-andrew-bolton.sha256';

export function testimonialPath(): string {
  return path.join(contentDir(), 'data', TESTIMONIAL_FILE);
}

/** The full testimonial text, UTF-8, trailing whitespace trimmed (the hashed form). */
export function testimonialText(): string {
  return readFileSync(testimonialPath(), 'utf8').replace(/\s+$/, '');
}

export function testimonialHash(): string {
  return createHash('sha256').update(testimonialText(), 'utf8').digest('hex');
}

export function expectedTestimonialHash(): string {
  return readFileSync(path.join(contentDir(), 'data', TESTIMONIAL_HASH_FILE), 'utf8').trim().split(/\s+/)[0];
}

/** Paragraphs exactly as in the file (split on blank lines; no character inside a paragraph changes). */
export function testimonialParagraphs(): string[] {
  return testimonialText().split(/\n[ \t]*\n/);
}

/** True when the quote is an exact substring of the testimonial text. */
export function isTestimonialExcerpt(quote: string): boolean {
  return quote.length > 0 && testimonialText().includes(quote);
}
