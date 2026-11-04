/* Unit tests for the content layer, routes, gates and the HTML scanner. Run: npm test (node --test). */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRouteFile, stripMarkers, parseInline, inlineText, splitTarget, fillYear, splitFigure, groupByHeading, loadRouteFile, microcopy, optionalMicrocopy } from '../lib/content.ts';
import { classifyHref, isLive, sitemapRoutes } from '../lib/routes.ts';
import { ships, GATES } from '../lib/gates.ts';
import { scanHtml } from '../lib/html-scan.ts';
import { testimonialHash, expectedTestimonialHash, testimonialParagraphs, testimonialText } from '../lib/testimonial.ts';

const SAMPLE = `---
route: /sample
title: Sample | Jacqueline Waititu
status: approved
---
[note] File-level instruction.

## [hero] One heading [source:brief]

[hint:eyebrow] 01 / Sample

[note] awaiting client: Q10 (heading, phase1 96).

[cta:primary] Discuss a role -> /connect#role

## [contact] Role enquiries

[note] anchor: role

I have **18+ years** in operations [source:brief], see [the case](/track-record/hr-function).
English: fluent
Swahili: native

[verbatim:client] Maps manual workflows, separates automation-ready tasks from judgment-led work, and coordinates delivery. [source:brief]

> "I recommend her without reservation." [source:brief]

### Card title -> /track-record/sale-due-diligence

[note] Anchor: /advisory#integration

- First item [source:brief]
- Second item, intake 162

[Read the full profile](/leadership)

[dateline] Ecom Services Ltd, 2021 [source:brief]

## [microcopy]
[note] keys only
primary-button: Discuss a role
pager-next: Next case -> /track-record/sale-due-diligence
`;

test('frontmatter and sections', () => {
  const rf = parseRouteFile(SAMPLE, 'sample.md');
  assert.equal(rf.route, '/sample');
  assert.equal(rf.status, 'approved');
  assert.equal(rf.sections.length, 2);
  assert.equal(rf.sections[0].tag, 'hero');
  assert.equal(rf.sections[0].heading, 'One heading');
  assert.equal(rf.sections[0].hints.eyebrow, '01 / Sample');
  assert.equal(rf.sections[1].anchor, 'role');
});

test('markers never reach visible text', () => {
  const rf = parseRouteFile(SAMPLE, 'sample.md');
  const all = JSON.stringify(rf.sections.map((s) => ({ h: s.heading, b: s.blocks.map(({ notes, hint, ...rest }) => rest) })));
  for (const m of ['[note]', '[source:', '[hint:', '[verbatim:', '[cta:', '[dateline]', 'Q10', 'phase1', 'intake 162']) {
    assert.ok(!all.includes(m), `leaked ${m}`);
  }
});

test('cta, verbatim, quote, heading target, list, link, dateline', () => {
  const rf = parseRouteFile(SAMPLE, 'sample.md');
  const [hero, contact] = rf.sections;
  const cta = hero.blocks.find((b) => b.type === 'cta');
  assert.deepEqual(cta && { label: cta.label, target: cta.target, variant: cta.variant }, { label: 'Discuss a role', target: '/connect#role', variant: 'primary' });
  const types = contact.blocks.map((b) => b.type);
  assert.deepEqual(types, ['paragraph', 'verbatim', 'quote', 'heading', 'list', 'link', 'dateline']);
  const verbatim = contact.blocks[1];
  assert.equal(verbatim.type === 'verbatim' && verbatim.text, 'Maps manual workflows, separates automation-ready tasks from judgment-led work, and coordinates delivery.');
  const quote = contact.blocks[2];
  assert.equal(quote.type === 'quote' && quote.text, 'I recommend her without reservation.');
  const h = contact.blocks[3];
  assert.equal(h.type === 'heading' && h.target, '/track-record/sale-due-diligence');
  assert.equal(h.anchor, 'integration');
  const list = contact.blocks[4];
  assert.deepEqual(list.type === 'list' && list.items.map((i) => i.text), ['First item', 'Second item']);
  assert.ok(rf.warnings.some((w) => w.includes('intake 162')));
  const para = contact.blocks[0];
  assert.equal(para.type === 'paragraph' && para.text, 'I have 18+ years in operations, see the case.\nEnglish: fluent\nSwahili: native');
});

test('microcopy and targets', () => {
  const rf = parseRouteFile(SAMPLE, 'sample.md');
  assert.equal(rf.microcopy['primary-button'], 'Discuss a role');
  assert.deepEqual(splitTarget(rf.microcopy['pager-next']), { label: 'Next case', target: '/track-record/sale-due-diligence' });
  assert.equal(fillYear('© {current year} Jacqueline Waititu.', 2026), '© 2026 Jacqueline Waititu.');
});

test('inline parsing and figure split', () => {
  const nodes = parseInline('**75%** lift within **3 months**, at [SDG](/capabilities)');
  assert.equal(inlineText(nodes), '75% lift within 3 months, at SDG');
  const f = splitFigure(nodes);
  assert.equal(f?.figure, '75%');
  assert.equal(inlineText(f!.rest), 'lift within 3 months, at SDG');
  assert.equal(stripMarkers('Nairobi, Kenya, EAT (UTC+3) [source:brief].'), 'Nairobi, Kenya, EAT (UTC+3).');
});

test('groupByHeading', () => {
  const rf = parseRouteFile(SAMPLE, 'sample.md');
  const g = groupByHeading(rf.sections[1]);
  assert.equal(g.length, 1);
  assert.equal(g[0].blocks.length, 3);
});

test('real inputs: site-wide microcopy and testimonial hash', () => {
  assert.equal(microcopy('nav-brand'), 'Jacqueline Waititu');
  assert.equal(optionalMicrocopy('does-not-exist'), undefined);
  assert.equal(testimonialHash(), expectedTestimonialHash());
  assert.equal(testimonialParagraphs().join('\n\n'), testimonialText());
  for (const f of ['home.md', 'leadership.md', 'not-found.md']) {
    const rf = loadRouteFile(f);
    for (const s of rf.sections) {
      assert.ok(!/\[(note|source|hint|cta|dateline|verbatim)/.test(s.heading));
    }
  }
});

test('routes: drafts are not live, never in the sitemap', () => {
  delete process.env.PREVIEW_DRAFT_ROUTES;
  assert.equal(isLive('/advisory'), true);
  assert.equal(isLive('/privacy-policy'), false);
  assert.equal(isLive('/terms'), false);
  assert.equal(isLive('/connect'), true);
  assert.equal(isLive('/connect/'), true);
  const k = classifyHref('/terms#top');
  assert.ok(k.kind === 'route' && !k.live && k.known);
  assert.equal(classifyHref('mailto:x@y.z').kind, 'mailto');
  assert.equal(classifyHref('/jacqueline-waititu-cv.pdf').kind, 'asset');
  process.env.PREVIEW_DRAFT_ROUTES = '1';
  assert.equal(isLive('/terms'), true);
  assert.ok(!sitemapRoutes().includes('/terms'));
  assert.ok(!sitemapRoutes().includes('/privacy-policy'));
  assert.ok(sitemapRoutes().includes('/advisory'));
  delete process.env.PREVIEW_DRAFT_ROUTES;
});

test('gates: Stage 7 changes', () => {
  assert.ok(!Object.keys(GATES).some((k) => k.startsWith('Q11')), 'Q11 is not a gate');
  assert.equal(ships('Q10.page-names'), true);
  assert.equal(ships('Q10.capabilities-h1'), true);
  assert.equal(ships('Q10.capabilities-h2'), false);
  assert.equal(ships('Q23.contacts'), true);
  assert.equal(ships('Q22.calendly'), false);
  assert.equal(ships('Q29.phase-headings'), false);
  assert.equal(ships('Q10.capability-9'), true);
  assert.equal(ships('Q24.engagement'), false);
  assert.equal(ships('Q10.advisory-best-for'), false);
});

test('html scan: testimonial exemption, quotes, anchors', () => {
  const full = testimonialText();
  const html = `<html><head><title>T</title><script>self.__next_f.push("letter")</script></head><body>
  <h2>A heading</h2><p>Words <a href="/connect#role" aria-label="Discuss">here</a></p>
  <blockquote data-testimonial-text=""><p><span data-testimonial-quote="">I recommend her without reservation.</span></p></blockquote>
  <div data-testimonial-text="" data-testimonial-full="">${testimonialParagraphs().map((p) => `<p data-testimonial-quote="">${p.replace(/&/g, '&amp;')}</p>`).join('')}</div>
  </body></html>`;
  const s = scanHtml(html);
  assert.ok(!/\bletters?\b/i.test(s.textOutsideTestimonial));
  assert.ok(/\bletter\b/.test(s.text));
  assert.ok(s.quotes.every((q) => full.includes(q)));
  assert.equal(s.fullTexts[0].join('\n\n'), full);
  assert.deepEqual(s.anchors, ['/connect#role']);
  assert.ok(!s.htmlWithoutScripts.includes('__next_f'));
});
