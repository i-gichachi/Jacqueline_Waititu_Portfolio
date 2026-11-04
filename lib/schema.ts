/*
  JSON-LD for every route, read from site-inputs/seo/SCHEMA-PLAN.md (server only; never typed here).

  - Blocks are found by "<!-- block:<name> -->" and the first ```json fence after it.
  - Blocks whose intro says "plus Person" get the shared Person node (block:person) prepended, as the same
    parsed object on every route, so its bytes are identical everywhere (plan, rule 1).
  - Nothing is returned without SITE_URL (I6); <JsonLd> also refuses to emit then.
  - {{LAUNCH_DATE}} is filled only when LAUNCH_DATE is set; otherwise any property holding it (datePublished,
    dateModified) is left out, never guessed.
  - Rule 5 checks (assertCaseSchema, assertListSchema) read the raw plan and run whether or not SITE_URL is
    set, so drift fails every build.
*/

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { inputsDir } from './content.ts';

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Graph = { '@context': string; '@graph': { [k: string]: Json }[] };

let planCache: string | null = null;
function plan(): string {
  if (planCache === null) planCache = readFileSync(path.join(inputsDir(), 'seo', 'SCHEMA-PLAN.md'), 'utf8').replace(/\r\n?/g, '\n');
  return planCache;
}

function rawBlock(name: string): { data: Json; plusPerson: boolean } {
  const src = plan();
  const at = src.indexOf(`<!-- block:${name} -->`);
  if (at < 0) throw new Error(`SCHEMA-PLAN.md has no block:${name}`);
  const open = src.indexOf('```json', at);
  const close = open < 0 ? -1 : src.indexOf('```', open + 7);
  if (close < 0) throw new Error(`SCHEMA-PLAN.md block:${name} has no json fence`);
  return { data: JSON.parse(src.slice(open + 7, close)) as Json, plusPerson: /plus Person/i.test(src.slice(at, open)) };
}

function fill(node: Json, site: string, launch: string | undefined): Json | undefined {
  if (typeof node === 'string') {
    if (node.includes('{{LAUNCH_DATE}}')) return launch ? node.replace(/\{\{LAUNCH_DATE\}\}/g, launch) : undefined;
    return node.replace(/\{\{SITE_URL\}\}/g, site);
  }
  if (Array.isArray(node)) return node.map((n) => fill(n, site, launch)).filter((n): n is Json => n !== undefined);
  if (node && typeof node === 'object') {
    const out: { [k: string]: Json } = {};
    for (const [k, v] of Object.entries(node)) {
      const f = fill(v, site, launch);
      if (f !== undefined) out[k] = f;
    }
    return out;
  }
  return node;
}

/** The route's JSON-LD graph from the plan (Person prepended where the plan says so); null without SITE_URL. */
export function schemaFor(name: string): Graph | null {
  const site = process.env.SITE_URL?.replace(/\/+$/, '');
  if (!site) return null;
  const block = rawBlock(name);
  const g = block.data as Graph;
  const graph = block.plusPerson ? [rawBlock('person').data as { [k: string]: Json }, ...g['@graph']] : g['@graph'];
  return fill({ ...g, '@graph': graph } as unknown as Json, site, process.env.LAUNCH_DATE) as unknown as Graph;
}

/** Rule 5: the Article headline and last breadcrumb equal the page H1. */
export function assertCaseSchema(slug: string, h1: string): void {
  const block = rawBlock(`case-${slug}`).data as Graph;
  const article = block['@graph'].find((n) => n['@type'] === 'Article');
  if (!article || article.headline !== h1) throw new Error(`SCHEMA-PLAN case-${slug}: Article headline does not equal the H1`);
  const crumbs = block['@graph'].find((n) => n['@type'] === 'BreadcrumbList')?.itemListElement as { name: string }[] | undefined;
  if (!crumbs || crumbs[crumbs.length - 1].name !== h1) throw new Error(`SCHEMA-PLAN case-${slug}: last breadcrumb does not equal the H1`);
}

export function assertListSchema(titles: { href: string; title: string }[]): void {
  const block = rawBlock('track-record').data as Graph;
  const page = block['@graph'].find((n) => n['@type'] === 'CollectionPage') as { mainEntity: { itemListElement: { url: string; name: string }[] } };
  const items = page.mainEntity.itemListElement;
  titles.forEach((t, i) => {
    const it = items[i];
    if (!it || !it.url.endsWith(t.href) || it.name !== t.title) throw new Error(`SCHEMA-PLAN track-record: ItemList ${i + 1} does not match the card "${t.title}"`);
  });
}
