/*
  Prebuild check (runs before `next build`; a failure stops the build).

  FAIL (a): sha256 of the testimonial text with trailing whitespace trimmed
            (readFileSync(p, 'utf8').replace(/\s+$/, '')) must equal
            site-inputs/content/data/testimonial-andrew-bolton.sha256.
  FAIL    : tokens.css copy differs from site-inputs/tokens.css (run sync-inputs).
  FAIL    : a font file named in tokens.css is missing from app/fonts/.
  FAIL    : the site-wide microcopy the shell needs is missing.
  FAIL    : a "> ..." testimonial line in any route file is not an exact substring of the testimonial.
  WARN    : content-layer warnings (ids or citations stripped from visible copy), and copy-level
            hits for an em dash, "{{" or the word "letter" outside a testimonial line. The output check
            (scripts/check-output.ts, postbuild) is authoritative on rendered pages.
*/

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { inputsDir, listRouteFiles, loadRouteFile, microcopy, SITE_WIDE_FILE } from '../lib/content.ts';
import { expectedTestimonialHash, testimonialHash, testimonialText } from '../lib/testimonial.ts';

const fails: string[] = [];
const warns: string[] = [];

// (a) testimonial hash
const got = testimonialHash();
const want = expectedTestimonialHash();
if (got !== want) fails.push(`(a) testimonial sha256 ${got} != expected ${want}`);
else console.log(`ok   (a) testimonial sha256 ${got} (${testimonialText().length} characters, trailing whitespace trimmed)`);

// tokens in sync
const tokensSrc = readFileSync(path.join(inputsDir(), 'tokens.css'), 'utf8');
const tokensCopy = existsSync('app/tokens.css') ? readFileSync('app/tokens.css', 'utf8') : '';
if (tokensSrc !== tokensCopy) fails.push('app/tokens.css differs from site-inputs/tokens.css (run: node scripts/sync-inputs.ts)');
else console.log('ok   tokens.css matches site-inputs/tokens.css');

// fonts
for (const f of ['Zodiak-Regular.woff2', 'Zodiak-Italic.woff2', 'Switzer-Regular.woff2', 'Switzer-Semibold.woff2']) {
  if (!existsSync(path.join('app', 'fonts', f))) fails.push(`font missing: app/fonts/${f}`);
}

// shell microcopy
const SHELL_KEYS = [
  'skip-link', 'nav-brand', 'nav-leadership', 'nav-capabilities', 'nav-track-record', 'nav-advisory', 'nav-connect',
  'nav-button', 'nav-linkedin-label', 'nav-menu-open', 'nav-menu-close', 'back-to-top', 'footer-name', 'footer-role',
  'footer-heading-pages', 'footer-heading-contact', 'footer-heading-next', 'footer-heading-legal', 'footer-email',
  'footer-email-subject', 'footer-linkedin', 'footer-location', 'footer-time-zone', 'footer-booking', 'footer-privacy',
  'copyright', 'advisory-email-subject', 'role-email-subject',
];
for (const k of SHELL_KEYS) {
  try {
    microcopy(k);
  } catch {
    fails.push(`site-wide microcopy "${k}" missing from ${SITE_WIDE_FILE}`);
  }
}

// copy-level scan
const full = testimonialText();
for (const f of listRouteFiles()) {
  const rf = loadRouteFile(f);
  for (const w of rf.warnings) warns.push(`${f}: ${w}`);
  const visible: { where: string; text: string; quote?: boolean }[] = [];
  for (const s of rf.sections) {
    visible.push({ where: `${f}:${s.line}`, text: s.heading });
    for (const b of s.blocks) {
      const where = `${f}:${b.line}`;
      if (b.type === 'quote') {
        visible.push({ where, text: b.text, quote: true });
        if (!full.includes(b.text)) fails.push(`(b) ${where} testimonial quote is not an exact substring of the testimonial file`);
      } else if (b.type === 'paragraph') visible.push({ where, text: b.text });
      else if (b.type === 'list') b.items.forEach((it) => visible.push({ where: `${f}:${it.line}`, text: it.text }));
      else if (b.type === 'link') visible.push({ where, text: `${b.label} ${b.href}` });
      else if (b.type === 'cta') visible.push({ where, text: `${b.label} ${b.target}` });
      else visible.push({ where, text: b.text });
    }
  }
  for (const [k, v] of Object.entries(rf.microcopy)) visible.push({ where: `${f} microcopy ${k}`, text: `${k} ${v}` });
  for (const v of visible) {
    if (v.text.includes('\u2014')) warns.push(`(d) em dash in copy at ${v.where}`);
    if (v.text.includes('{{')) warns.push(`(c) "{{" in copy at ${v.where}`);
    if (!v.quote && /\bletters?\b/i.test(v.text)) warns.push(`(f) "letter" in copy at ${v.where} (fails the build only if rendered)`);
  }
}

for (const w of warns) console.log(`warn ${w}`);
if (fails.length) {
  for (const f of fails) console.error(`FAIL ${f}`);
  console.error(`check-source: ${fails.length} failure(s)`);
  process.exit(1);
}
console.log(`check-source: passed (${warns.length} warning(s))`);
