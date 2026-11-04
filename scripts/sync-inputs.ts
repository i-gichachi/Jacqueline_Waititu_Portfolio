/*
  Copies the build inputs that the bundler must see inside site/ (it does not import from outside the
  project root). Runs before dev and before build. Never edit the copies; edit site-inputs/ upstream.
  - site-inputs/tokens.css            -> app/tokens.css
  - site-wide microcopy for the client error boundary -> app/generated/client-copy.json
*/

import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { inputsDir, loadRouteFile, SITE_WIDE_FILE } from '../lib/content.ts';

const root = process.cwd();
copyFileSync(path.join(inputsDir(), 'tokens.css'), path.join(root, 'app', 'tokens.css'));

const site = loadRouteFile(SITE_WIDE_FILE).microcopy;
const keys = ['error-generic', 'error-offline', 'loading-generic'];
const out: Record<string, string> = {};
for (const k of keys) {
  if (site[k] === undefined) throw new Error(`sync-inputs: microcopy "${k}" missing from ${SITE_WIDE_FILE}`);
  out[k] = site[k];
}
mkdirSync(path.join(root, 'app', 'generated'), { recursive: true });
writeFileSync(path.join(root, 'app', 'generated', 'client-copy.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log('sync-inputs: tokens.css and client-copy.json written from site-inputs/');
