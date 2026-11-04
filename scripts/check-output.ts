/*
  Postbuild check (npm runs it straight after `next build`; a failure makes `npm run build` fail).
  Scans every prerendered page in .next/server/app (*.html, and *.body for route handlers such as
  robots.txt and sitemap.xml) and fails on:

  (a) the testimonial hash (repeated here so a build that skipped prebuild still fails)
  (b) any element marked data-testimonial-quote whose text is not an exact substring of the testimonial,
      and any data-testimonial-full block whose paragraphs, joined, do not equal the testimonial
  (c) "{{" in emitted HTML (framework scripts excluded) or JSON-LD
  (d) an em dash in rendered text, attributes or JSON-LD
  (e) a leaked marker or id ([note], [source:, [hint:, Q12, C91, I5, R5-7, SP-3, citations)
  (f) /\bletters?\b/i in rendered text or attributes outside the element holding the testimonial text
  (g) an <a href> to an internal route that is not live (or not a route at all); a non-live route
      that was generated with its own content; the dev-only kit page in a production build
  plus Review / AggregateRating / Quotation markup anywhere.

  Warns (does not fail) on links to live routes whose pages are not built yet (foundation wave).
*/

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { LEAK_PATTERNS, hasRouteFile, loadRouteFile } from '../lib/content.ts';
import { classifyHref, isLive, isRoutePath, previewDrafts, ROUTES, type RouteDef } from '../lib/routes.ts';
import { scanHtml } from '../lib/html-scan.ts';
import { expectedTestimonialHash, testimonialHash, testimonialText } from '../lib/testimonial.ts';

const APP_DIR = path.join(process.env.NEXT_DIST_DIR || '.next', 'server', 'app');
const READ_ATTRS = new Set(['aria-label', 'aria-description', 'aria-valuetext', 'alt', 'title', 'content', 'placeholder', 'value', 'label']);
const fails: string[] = [];
const warns: string[] = [];

if (!existsSync(APP_DIR)) {
  console.error(`check-output: ${APP_DIR} not found; run next build first`);
  process.exit(1);
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = path.join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

function routeOf(file: string): string {
  const rel = path.relative(APP_DIR, file).replace(/\\/g, '/').replace(/\.(html|body)$/, '');
  if (rel === 'index') return '/';
  return `/${rel}`;
}

// (a)
if (testimonialHash() !== expectedTestimonialHash()) fails.push('(a) testimonial sha256 does not match the recorded hash');

const full = testimonialText();
const files = walk(APP_DIR).filter((f) => /\.(html|body)$/.test(f));
const built = new Set(files.filter((f) => f.endsWith('.html')).map(routeOf));
const linkedNotBuilt = new Map<string, Set<string>>();

for (const file of files) {
  const route = routeOf(file);
  const raw = readFileSync(file, 'utf8');
  const where = `${route} (${path.relative('.', file)})`;

  if (file.endsWith('.body')) {
    if (raw.includes('{{')) fails.push(`(c) "{{" in ${where}`);
    if (raw.includes('\u2014')) fails.push(`(d) em dash in ${where}`);
    continue;
  }

  if (route === '/kit' || route.startsWith('/kit/')) fails.push(`(g) the dev-only kit page was built into production: ${where}`);

  const s = scanHtml(raw);
  // Attributes a person reads or hears; URLs of framework chunks are left out (their hashes look like ids).
  const attrText = s.attrs.filter((a) => READ_ATTRS.has(a.name)).map((a) => a.value).join(' \n ');
  // For the "letter" rule ids and link targets count too (no "#letter" anchors, no such ids).
  const attrOutside = s.attrs
    .filter((a) => !a.inTestimonial && (READ_ATTRS.has(a.name) || a.name === 'id' || (a.name === 'href' && !a.value.startsWith('/_next/'))))
    .map((a) => `${a.name}=${a.value}`)
    .join(' \n ');
  const visible = `${s.title}\n${s.text}\n${attrText}`;

  // (b)
  for (const q of s.quotes) {
    const t = q.trim();
    if (t && !full.includes(t)) fails.push(`(b) ${where}: testimonial quote is not an exact substring: "${t.slice(0, 70)}..."`);
  }
  for (const paras of s.fullTexts) {
    if (paras.join('\n\n') !== full) fails.push(`(b) ${where}: the full testimonial does not equal the file, character for character`);
  }

  // (c)
  if (s.htmlWithoutScripts.includes('{{')) fails.push(`(c) "{{" in emitted HTML: ${where}`);
  for (const j of s.jsonLd) if (j.includes('{{')) fails.push(`(c) "{{" in JSON-LD: ${where}`);

  // (d)
  if (visible.includes('\u2014') || s.jsonLd.some((j) => j.includes('\u2014') || j.includes('\\u2014'))) fails.push(`(d) em dash in rendered output: ${where}`);

  // (e)
  for (const p of LEAK_PATTERNS) {
    const hit = visible.match(p.re) ?? s.jsonLd.join('\n').match(p.re);
    if (hit) fails.push(`(e) leaked ${p.id} "${hit[0]}": ${where}`);
  }

  // (f)
  const letterOutside = `${s.title}\n${s.textOutsideTestimonial}\n${attrOutside}\n${s.jsonLd.join('\n')}`;
  const lh = letterOutside.match(/.{0,40}\bletters?\b.{0,40}/i);
  if (lh) fails.push(`(f) "letter" outside the testimonial text: ${where}: "${lh[0].replace(/\s+/g, ' ').trim()}"`);

  // schema
  if (/"@type"\s*:\s*"(Review|AggregateRating|Rating|Quotation)"/.test(s.jsonLd.join('\n')) || /itemtype="[^"]*(Review|Rating|Quotation)/i.test(raw)) {
    fails.push(`Review or Quotation markup: ${where}`);
  }

  // (g)
  for (const href of s.anchors) {
    const k = classifyHref(href);
    if (k.kind !== 'route') continue;
    if (!k.known) fails.push(`(g) link to "${href}", which is not a route in lib/routes.ts: ${where}`);
    else if (!k.live) fails.push(`(g) link to "${href}", which is not live: ${where}`);
    else if (!built.has(k.path)) {
      if (!linkedNotBuilt.has(k.path)) linkedNotBuilt.set(k.path, new Set());
      linkedNotBuilt.get(k.path)!.add(route);
    }
  }
}

// (g) a non-live route must not be generated with its own content
for (const [p, def] of Object.entries(ROUTES) as [string, RouteDef][]) {
  if (isLive(p) || !built.has(p)) continue;
  const html = readFileSync(path.join(APP_DIR, `${p.slice(1)}.html`), 'utf8');
  if (!hasRouteFile(def.file)) continue;
  const hero = loadRouteFile(def.file).sections[0]?.heading;
  if (hero && scanHtml(html).text.includes(hero)) fails.push(`(g) ${p} is not live but was generated with its own content`);
}

for (const [p, from] of linkedNotBuilt) warns.push(`linked from ${[...from].join(', ')} but not built yet: ${p}${isRoutePath(p) ? '' : ' (unknown)'}`);

console.log(`check-output: scanned ${files.length} file(s): ${[...built].sort().join(', ')}${previewDrafts() ? ' [PREVIEW_DRAFT_ROUTES=1]' : ''}`);
for (const w of warns) console.log(`warn ${w}`);
if (fails.length) {
  for (const f of fails) console.error(`FAIL ${f}`);
  console.error(`check-output: ${fails.length} failure(s)`);
  process.exit(1);
}
console.log('check-output: passed (a) to (g)');
