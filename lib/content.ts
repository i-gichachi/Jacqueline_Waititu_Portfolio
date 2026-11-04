/*
  Content layer: reads site-inputs/content/*.md at build time and returns render-ready structures.

  README "Build rules" are binding here:
  - Rule 2: markers are instructions, never copy. Stripped from everything this module returns as text:
    [note] lines, [hint:...] lines, [source:...] markers, the [verbatim:client] prefix, the [tag] of a
    "## [tag] Heading" line, [cta:...] prefixes, [dateline] prefixes, microcopy keys, CLAIMS ids
    (C.., K.., T..), question ids (Q..), decision ids (I.., R.., SP-.., a:.., b:.., c:.., d:..) and
    source citations ("intake 162", "CV 41", "phase1 96", "testimonial 23", "letter 23").
  - Rule 3: [verbatim:client] lines are returned exactly (only a trailing [source:...] marker is removed).
  - Rule 8: this module never edits copy. When it has to strip an id or citation from visible copy it
    records a warning so the build check can report it.

  Notes and hints are kept as metadata (section.notes, block.notes, section.hints, block.hint) so route
  builders can read build instructions; they are never rendered.

  No framework imports: the unit tests (tests/) and the build checks (scripts/) import this file directly.
*/

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

/* ---------- types ---------- */

export type InlineNode =
  | { type: 'text'; value: string }
  | { type: 'strong'; children: InlineNode[] }
  | { type: 'link'; href: string; children: InlineNode[] }
  | { type: 'br' };

interface BlockBase {
  /** 1-based line in the route file (frontmatter included), for tracing to README gate rows. */
  line: number;
  /** Hint kind that preceded this block, e.g. "pull-quote" (never rendered). */
  hint?: string;
  /** Anchor id given by a following "[note] anchor: x" line. */
  anchor?: string;
  /** Raw [note] lines that follow this block (build instructions, never rendered). */
  notes: string[];
}

export type Block =
  | (BlockBase & { type: 'paragraph'; inline: InlineNode[]; text: string })
  | (BlockBase & { type: 'link'; label: string; href: string })
  | (BlockBase & { type: 'list'; items: { inline: InlineNode[]; text: string; line: number }[] })
  | (BlockBase & { type: 'heading'; level: 3; text: string; target?: string })
  | (BlockBase & { type: 'cta'; variant: 'primary' | 'secondary'; label: string; target: string })
  | (BlockBase & { type: 'dateline'; text: string })
  | (BlockBase & { type: 'verbatim'; text: string })
  | (BlockBase & { type: 'quote'; text: string });

export interface Section {
  tag: string | null;
  /** The part after a colon in the tag, e.g. "2" in [case-studies:2]. */
  param: string | null;
  heading: string;
  line: number;
  anchor?: string;
  hints: Record<string, string>;
  notes: string[];
  blocks: Block[];
}

export interface RouteFile {
  file: string;
  frontmatter: Record<string, string>;
  route: string;
  status: string;
  title: string;
  description: string;
  sections: Section[];
  microcopy: Record<string, string>;
  /** Microcopy notes, in order, keyed by the key they follow (never rendered). */
  microcopyNotes: string[];
  warnings: string[];
}

/* ---------- location ---------- */

export function inputsDir(): string {
  if (process.env.SITE_INPUTS_DIR) return path.resolve(process.env.SITE_INPUTS_DIR);
  // site/ sits at the repo root next to site-inputs/; next build and the scripts run from site/.
  return path.resolve(process.cwd(), '..', 'site-inputs');
}

export function contentDir(): string {
  return path.join(inputsDir(), 'content');
}

/* ---------- stripping ---------- */

const SOURCE_MARKER = /\s*\[source:[^\]]*\]/g;
// Ids and citations that must never render (README build rule 2).
const ID_PATTERNS: RegExp[] = [
  /\(\s*(?:intake|CV|phase1|phase2-layout|letter|testimonial)\s+\d+(?:\s+(?:to|and)\s+\d+)?\s*\)/g,
  /\b(?:intake|phase1|phase2-layout)\s+\d+(?:\s+(?:to|and)\s+\d+)?\b/g,
  /\bCV\s+\d+(?:\s+(?:to|and)\s+\d+)?\b/g,
  /\b(?:letter|testimonial)\s+\d+\b/g,
  /\bR\d+-[A-Z]+\d+\b/g,
  /\b[abcd]:[A-Z]{1,3}-?\d+\b/g,
  /\bSP-\d+\b/g,
  /\b[QCKTIR]\d{1,3}(?:-\d+)?\b/g,
];

/** Patterns the build checks treat as a leaked marker or id. Shared with scripts/check-output.ts. */
export const LEAK_PATTERNS: { id: string; re: RegExp }[] = [
  { id: 'note marker', re: /\[note\]/i },
  { id: 'source marker', re: /\[source:/i },
  { id: 'hint marker', re: /\[hint:/i },
  { id: 'verbatim marker', re: /\[verbatim:/i },
  { id: 'cta marker', re: /\[cta:/i },
  { id: 'dateline marker', re: /\[dateline\]/i },
  { id: 'microcopy marker', re: /\[microcopy\]/i },
  { id: 'section tag', re: /##\s*\[/ },
  { id: 'question or claim id', re: /\b[QCKTIR]\d{1,3}(?:-\d+)?\b/ },
  { id: 'proposal id', re: /\bSP-\d+\b/ },
  { id: 'ruling id', re: /\b[abcd]:[A-Z]{1,3}-?\d+\b/ },
  { id: 'editor round id', re: /\bR\d+-[A-Z]+\d+\b/ },
  { id: 'citation', re: /\b(?:intake|phase1|phase2-layout)[^\S\n]+\d+|\bCV[^\S\n]+\d+|\b(?:letter|testimonial)[^\S\n]+\d+/ },
];

function tidy(s: string): string {
  return s
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim();
}

/** Removes [source:...] markers, then ids and citations (with a warning for each). */
export function stripMarkers(input: string, warnings?: string[], where?: string): string {
  let s = input.replace(SOURCE_MARKER, '');
  let strippedId = false;
  for (const re of ID_PATTERNS) {
    s = s.replace(re, (m) => {
      strippedId = true;
      warnings?.push(`stripped "${m}" from visible copy${where ? ` at ${where}` : ''}`);
      return '';
    });
  }
  s = tidy(s);
  // Only after an id was cut out: drop the comma or semicolon it leaves dangling.
  if (strippedId) s = s.replace(/[,;]\s*([.;:)]|$)/g, '$1').trim();
  return s;
}

/** For verbatim text: only a [source:...] marker is removed; nothing else changes. */
function stripSourceOnly(input: string): string {
  return input.replace(SOURCE_MARKER, '').replace(/\s+$/, '');
}

/* ---------- inline ---------- */

/** Parses **bold** and [text](href). Input must already be marker-free. */
export function parseInline(src: string): InlineNode[] {
  const out: InlineNode[] = [];
  let buf = '';
  let i = 0;
  const flush = () => {
    if (buf) out.push({ type: 'text', value: buf });
    buf = '';
  };
  while (i < src.length) {
    if (src.startsWith('**', i)) {
      const end = src.indexOf('**', i + 2);
      if (end > i + 2) {
        flush();
        out.push({ type: 'strong', children: parseInline(src.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }
    if (src[i] === '[') {
      const close = findClosingBracket(src, i);
      if (close > 0 && src[close + 1] === '(') {
        const paren = src.indexOf(')', close + 2);
        if (paren > 0) {
          flush();
          out.push({ type: 'link', href: src.slice(close + 2, paren).trim(), children: parseInline(src.slice(i + 1, close)) });
          i = paren + 1;
          continue;
        }
      }
    }
    buf += src[i];
    i += 1;
  }
  flush();
  return out;
}

function findClosingBracket(src: string, open: number): number {
  let depth = 0;
  for (let j = open; j < src.length; j += 1) {
    if (src[j] === '[') depth += 1;
    else if (src[j] === ']') {
      depth -= 1;
      if (depth === 0) return j;
    }
  }
  return -1;
}

export function inlineText(nodes: InlineNode[]): string {
  return nodes
    .map((n) => (n.type === 'text' ? n.value : n.type === 'br' ? '\n' : inlineText(n.children)))
    .join('');
}

/* ---------- parser ---------- */

const RE_SECTION = /^##\s+(?:\[([a-z0-9-]+)(?::([^\]]+))?\]\s*)?(.*)$/i;
const RE_HINT = /^\[hint:([a-z0-9-]+)(?:\s+([^\]]*))?\]\s*(.*)$/i;
const RE_CTA = /^\[cta:(primary|secondary)\]\s*(.+?)\s*->\s*(\S+)\s*$/i;
const RE_ANCHOR_NOTE = /^\[note\]\s*anchor:\s*`?([^`\s(]+)`?/i;
const RE_MICRO = /^([a-z0-9][a-z0-9-]*):\s?(.*)$/;

export function splitTarget(value: string): { label: string; target: string | null } {
  const idx = value.lastIndexOf(' -> ');
  if (idx < 0) return { label: value.trim(), target: null };
  return { label: value.slice(0, idx).trim(), target: value.slice(idx + 4).trim() };
}

function anchorFrom(value: string): string {
  const hash = value.indexOf('#');
  return hash >= 0 ? value.slice(hash + 1) : value;
}

export function parseRouteFile(source: string, file = 'inline.md'): RouteFile {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const warnings: string[] = [];
  const frontmatter: Record<string, string> = {};
  let i = 0;
  if (lines[0]?.trim() === '---') {
    i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const m = lines[i].match(/^([A-Za-z0-9_]+):\s?(.*)$/);
      if (m) frontmatter[m[1]] = m[2].trim();
      i += 1;
    }
    i += 1;
  }

  const sections: Section[] = [];
  const microcopy: Record<string, string> = {};
  const microcopyNotes: string[] = [];
  let current: Section | null = null;
  let inMicro = false;
  let para: { lines: string[]; line: number } | null = null;
  let list: { items: { inline: InlineNode[]; text: string; line: number }[]; line: number } | null = null;
  let pendingHint: string | undefined;
  // Notes before any section (file-level instructions) are kept on a synthetic holder.
  const preamble: Section = { tag: null, param: null, heading: '', line: 0, hints: {}, notes: [], blocks: [] };

  const where = (n: number) => `${file}:${n}`;
  const target = (): Section => current ?? preamble;
  const lastBlock = (): Block | undefined => target().blocks[target().blocks.length - 1];
  const push = (b: Block) => {
    if (pendingHint && !b.hint) b.hint = pendingHint;
    pendingHint = undefined;
    target().blocks.push(b);
  };
  const flushPara = () => {
    if (!para) return;
    const cleanedLines = para.lines.map((l, k) => stripMarkers(l, warnings, where(para!.line + k)));
    const joined = cleanedLines.join('\n');
    const single = joined.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (single) {
      push({ type: 'link', label: single[1], href: single[2].trim(), line: para.line, notes: [] });
    } else {
      const inline: InlineNode[] = [];
      cleanedLines.forEach((l, k) => {
        if (k > 0) inline.push({ type: 'br' });
        inline.push(...parseInline(l));
      });
      push({ type: 'paragraph', inline, text: inlineText(inline), line: para.line, notes: [] });
    }
    para = null;
  };
  const flushList = () => {
    if (!list) return;
    push({ type: 'list', items: list.items, line: list.line, notes: [] });
    list = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
  };

  for (; i < lines.length; i += 1) {
    const raw = lines[i];
    const n = i + 1;
    const line = raw.trimEnd();
    const trimmed = line.trim();

    const sec = trimmed.match(RE_SECTION);
    if (sec && trimmed.startsWith('## ')) {
      flushAll();
      pendingHint = undefined;
      const tag = sec[1] ? sec[1].toLowerCase() : null;
      if (tag === 'microcopy') {
        inMicro = true;
        current = null;
        continue;
      }
      inMicro = false;
      current = {
        tag,
        param: sec[2] ?? null,
        heading: stripMarkers(sec[3], warnings, where(n)),
        line: n,
        hints: {},
        notes: [],
        blocks: [],
      };
      sections.push(current);
      continue;
    }

    if (inMicro) {
      if (!trimmed) continue;
      if (trimmed.startsWith('[note]')) {
        microcopyNotes.push(trimmed.replace(/^\[note\]\s*/, ''));
        continue;
      }
      const m = trimmed.match(RE_MICRO);
      if (m) microcopy[m[1]] = stripMarkers(m[2], warnings, where(n));
      else warnings.push(`unparsed microcopy line at ${where(n)}`);
      continue;
    }

    if (!trimmed) {
      flushAll();
      continue;
    }

    if (trimmed.startsWith('[note]')) {
      flushAll();
      const note = trimmed.replace(/^\[note\]\s*/, '');
      const anchor = trimmed.match(RE_ANCHOR_NOTE);
      const last = lastBlock();
      if (anchor) {
        if (last) last.anchor = anchorFrom(anchor[1]);
        else target().anchor = anchorFrom(anchor[1]);
      }
      if (last) last.notes.push(note);
      else target().notes.push(note);
      continue;
    }

    const hint = trimmed.match(RE_HINT);
    if (hint) {
      flushAll();
      const kind = hint[1].toLowerCase();
      const value = (hint[3] || hint[2] || '').trim();
      target().hints[kind] = stripMarkers(value);
      pendingHint = kind;
      continue;
    }

    const cta = trimmed.match(RE_CTA);
    if (cta) {
      flushAll();
      push({
        type: 'cta',
        variant: cta[1].toLowerCase() as 'primary' | 'secondary',
        label: stripMarkers(cta[2], warnings, where(n)),
        target: cta[3],
        line: n,
        notes: [],
      });
      continue;
    }

    if (trimmed.startsWith('[dateline]')) {
      flushAll();
      push({ type: 'dateline', text: stripMarkers(trimmed.replace(/^\[dateline\]\s*/, ''), warnings, where(n)), line: n, notes: [] });
      continue;
    }

    if (trimmed.startsWith('[verbatim:client]')) {
      flushAll();
      const text = stripSourceOnly(trimmed.replace(/^\[verbatim:client\]\s?/, ''));
      for (const re of ID_PATTERNS) {
        if (new RegExp(re.source).test(text)) warnings.push(`verbatim line at ${where(n)} contains an id or citation; left exactly as written`);
      }
      push({ type: 'verbatim', text, line: n, notes: [] });
      continue;
    }

    if (trimmed.startsWith('> ')) {
      flushAll();
      let q = stripSourceOnly(trimmed.slice(2)).trim();
      // Remove the surrounding quotation marks only; the words inside stay exactly as written.
      const m = q.match(/^["“](.*)["”]$/s);
      if (m) q = m[1];
      push({ type: 'quote', text: q, line: n, notes: [] });
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushAll();
      const { label, target: t } = splitTarget(trimmed.slice(4));
      push({ type: 'heading', level: 3, text: stripMarkers(label, warnings, where(n)), target: t ?? undefined, line: n, notes: [] });
      continue;
    }

    if (/^- /.test(trimmed)) {
      flushPara();
      const text = stripMarkers(trimmed.slice(2), warnings, where(n));
      const inline = parseInline(text);
      if (!list) list = { items: [], line: n };
      list.items.push({ inline, text: inlineText(inline), line: n });
      continue;
    }

    flushList();
    if (!para) para = { lines: [], line: n };
    para.lines.push(trimmed);
  }
  flushAll();

  return {
    file,
    frontmatter,
    route: frontmatter.route ?? '',
    status: frontmatter.status ?? '',
    title: stripMarkers(frontmatter.title ?? ''),
    description: stripMarkers(frontmatter.description ?? ''),
    sections,
    microcopy,
    microcopyNotes: [...preamble.notes, ...microcopyNotes],
    warnings,
  };
}

/* ---------- loading (cached per process) ---------- */

const cache = new Map<string, RouteFile>();

export function hasRouteFile(file: string): boolean {
  return existsSync(path.join(contentDir(), file));
}

export function loadRouteFile(file: string): RouteFile {
  const hit = cache.get(file);
  if (hit) return hit;
  const parsed = parseRouteFile(readFileSync(path.join(contentDir(), file), 'utf8'), file);
  cache.set(file, parsed);
  return parsed;
}

export function listRouteFiles(): string[] {
  return readdirSync(contentDir()).filter((f) => f.endsWith('.md') && f !== 'README.md');
}

/** Site-wide microcopy lives in not-found.md (README: "its ## [microcopy] block is the site-wide set"). */
export const SITE_WIDE_FILE = 'not-found.md';

/**
 * Looks a microcopy key up in the route's own file first, then in the site-wide set.
 * Throws when the key does not exist, so missing copy fails the build instead of being invented.
 */
export function microcopy(key: string, file?: string): string {
  const v = optionalMicrocopy(key, file);
  if (v === undefined) throw new Error(`Missing microcopy "${key}"${file ? ` in ${file}` : ''} or ${SITE_WIDE_FILE}`);
  return v;
}

/** Same lookup; undefined when the key is absent (for slots that render only when the copy supplies them). */
export function optionalMicrocopy(key: string, file?: string): string | undefined {
  if (file && hasRouteFile(file)) {
    const own = loadRouteFile(file).microcopy[key];
    if (own !== undefined) return own;
  }
  return loadRouteFile(SITE_WIDE_FILE).microcopy[key];
}

/** Finds a microcopy key in any route file; used for credits defined once on another route. */
export function microcopyAnywhere(key: string, preferred: string[] = []): string | undefined {
  for (const f of [...preferred, ...listRouteFiles()]) {
    if (!hasRouteFile(f)) continue;
    const v = loadRouteFile(f).microcopy[key];
    if (v !== undefined) return v;
  }
  return undefined;
}

/** Replaces the dynamic year token in the copyright microcopy (README build rule 6). */
export function fillYear(value: string, year = new Date().getFullYear()): string {
  return value.replace(/\{current year\}/g, String(year));
}

/** First section with the tag; undefined when the copy has none. */
export function sectionByTag(rf: RouteFile, tag: string, nth = 0): Section | undefined {
  return rf.sections.filter((s) => s.tag === tag)[nth];
}

/** Every link href in a route file, from paragraphs, lists, link blocks, headings and CTAs. */
export function allLinks(rf: RouteFile): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = [];
  const walk = (nodes: InlineNode[]) =>
    nodes.forEach((n) => {
      if (n.type === 'link') out.push({ href: n.href, label: inlineText(n.children) });
      if (n.type === 'strong' || n.type === 'link') walk(n.children);
    });
  for (const s of rf.sections) {
    for (const b of s.blocks) {
      if (b.type === 'paragraph') walk(b.inline);
      if (b.type === 'list') b.items.forEach((it) => walk(it.inline));
      if (b.type === 'link') out.push({ href: b.href, label: b.label });
      if (b.type === 'cta') out.push({ href: b.target, label: b.label });
      if (b.type === 'heading' && b.target) out.push({ href: b.target, label: b.text });
    }
  }
  return out;
}

/** A figure paragraph ("**18+ years** building ...") split into the figure and its scope note. */
export function splitFigure(inline: InlineNode[]): { figure: string; rest: InlineNode[] } | null {
  const first = inline[0];
  if (!first || first.type !== 'strong') return null;
  const rest = inline.slice(1);
  if (rest[0]?.type === 'text') rest[0] = { type: 'text', value: rest[0].value.replace(/^\s+/, '') };
  return { figure: inlineText(first.children), rest };
}

/** Splits a section's blocks into groups, one per "### " heading (cards, services, phases). */
export function groupByHeading(section: Section): { heading: Extract<Block, { type: 'heading' }>; blocks: Block[] }[] {
  const out: { heading: Extract<Block, { type: 'heading' }>; blocks: Block[] }[] = [];
  for (const b of section.blocks) {
    if (b.type === 'heading') out.push({ heading: b, blocks: [] });
    else if (out.length) out[out.length - 1].blocks.push(b);
  }
  return out;
}
