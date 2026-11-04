/*
  Launch check (Ian, 4 November 2026). Separate from the build checks: `npm run check:launch` must pass
  before the site goes live. It reads lib/routes.ts statuses (the preview flag does NOT count) and the
  site-wide launch gates in lib/gates.ts, and fails while any blocker is open:
  - /privacy-policy and /terms must be status 'live' (approved by Ian after the qualified reviewer)
  - the domain (I6, SITE_URL) and the launch date (LAUNCH_DATE) must be set
  - every item in launch/open-items.json must be closed (Q35, Q36, Q37, I14, a:P10)
  - the conversion gate in launch/dual-goal.json: score >= 22 of 24, score equals the count of mechanics
    with status "met", and mobileAboveFold390 and twoClickContact both pass. design-qa writes the real values
    into dual-goal.json; the committed file is a placeholder that FAILS (score 0) on purpose.
*/

import { readFileSync } from 'node:fs';

import { ROUTES, type RouteDef } from '../lib/routes.ts';

const fails: string[] = [];
for (const p of ['/privacy-policy', '/terms'] as const) {
  if ((ROUTES[p] as RouteDef).status !== 'live') fails.push(`${p} is ${ROUTES[p].status}: it must be approved and live before launch`);
}
if (!process.env.SITE_URL) fails.push('SITE_URL is not set (I6, the domain): JSON-LD, canonical URLs and the sitemap need it');
if (!process.env.LAUNCH_DATE) fails.push('LAUNCH_DATE is not set: datePublished on the five case Articles needs the real date');

const readJson = (rel: string): any => {
  try {
    return JSON.parse(readFileSync(new URL(rel, import.meta.url), 'utf8'));
  } catch {
    fails.push(`${rel.replace('../', '')} is missing or unreadable`);
    return null;
  }
};

const open = readJson('../launch/open-items.json');
if (open) {
  for (const it of open.items ?? []) {
    if (!it.closed) fails.push(`open item ${it.id} (owner: ${it.owner}): ${it.what}`);
  }
}

const dg = readJson('../launch/dual-goal.json');
if (dg) {
  const met = (dg.mechanics ?? []).filter((m: any) => m.status === 'met').length;
  if (typeof dg.score !== 'number' || dg.score < 22) fails.push(`conversion gate: score ${dg.score} of ${dg.max}; 22 needed`);
  if (dg.score !== met) fails.push(`conversion gate: score ${dg.score} does not equal the ${met} mechanics with status "met"`);
  if (!dg.mobileAboveFold390?.pass) fails.push(`conversion gate: mobile above the fold at 390 fails (${dg.mobileAboveFold390?.note ?? 'no note'})`);
  if (!dg.twoClickContact?.pass) fails.push(`conversion gate: two-click contact fails (${dg.twoClickContact?.note ?? 'no note'})`);
}

if (fails.length) {
  for (const f of fails) console.error(`LAUNCH BLOCKED ${f}`);
  console.error(`check-launch: ${fails.length} blocker(s); do not launch`);
  process.exit(1);
}
console.log('check-launch: no launch blockers');
