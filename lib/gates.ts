/*
  Gates: the central registry of every placeholder, ship gate and open question that changes what renders.

  Seeded from site-inputs/content/README.md ("Open placeholders" tables) with Ian's Stage 7 changes of
  4 November 2026 applied:
  - Q11 is not a gate any more: the testimonial ships on / and /leadership. No entry exists, so nothing
    can be wrapped in it.
  - Q10 no longer gates the five page names or the /capabilities H1 (both ship as written; still in Q10
    for her review). The /capabilities H2 falls back until Q10; other Q10 lines stay hidden.
  - Q23 answered: email and phone publish; no WhatsApp.
  - Q22 partly answered: reply time known; no Calendly link yet, so the booking gate is hidden and every
    Book a discovery call opens the advisory email.
  - Q24 partly answered: region answered; how an engagement starts, what the client receives and referral
    fees stay hidden.
  - Q1 answered ("Depends on scope of project", her explicit decision).
  - Q29 hides the phase subheadings on the integration and due diligence cases only.
  Ian's second rulings, 4 November 2026: I17 releases capability 9; /advisory approved (lib/routes.ts)
  with its H1 (R7-D6) and opening sentence (R7-D7); Q24 parts and Best for rows stay hidden;
  R7-T3 confirmed (no accounts, no payments); R7-T11 still open.

  Semantics, matching the README "meanwhile" column:
  - hidden     : not rendered (not greyed, not "coming soon")
  - fallback   : the named alternative renders (copy comes from site-inputs, never from code)
  - as written : the copy ships as it stands; the answer may change it later
  - nothing    : no interim; the element or route does not ship
  ships(id) is true when the gate is answered, or when its meanwhile is "as written".

  Route-level drafts (/privacy-policy, /terms) are NOT gates: lib/routes.ts decides those.
  Ids here are labels for the studio; they are never rendered (README build rule 2).
*/

import { hasRouteFile, loadRouteFile, optionalMicrocopy } from './content.ts';

export type GateState = 'open' | 'answered';
export type Meanwhile = 'hidden' | 'fallback' | 'as written' | 'nothing';

export interface FallbackSource {
  file: string;
  /** Preferred: a microcopy key in that file. */
  microcopyKey?: string;
  /** Interim: a quoted string inside a [note] line of that file, captured by group 1. */
  notePattern?: RegExp;
}

export interface GateDef {
  /** The README id this entry belongs to (Q10, Q29, I6 ...). */
  ref: string;
  state: GateState;
  meanwhile: Meanwhile;
  /** What the gate covers, in the studio's words, for the route builders. */
  covers: string;
  fallback?: FallbackSource;
}

export const GATES = {
  /* ---- launch gates for the whole site ---- */
  'I6.site-url': { ref: 'I6', state: 'open', meanwhile: 'nothing', covers: 'The domain: no JSON-LD, canonical or sitemap URL containing {{SITE_URL}} ships.' },
  'launch-date': { ref: 'Launch date (Ian)', state: 'open', meanwhile: 'nothing', covers: 'datePublished on the five case Articles; never a guessed date.' },
  'I6.analytics': { ref: 'I6', state: 'open', meanwhile: 'hidden', covers: 'GA4 script, consent banner and the Cookie settings link.' },
  'Q10.page-names': { ref: 'Q10', state: 'open', meanwhile: 'as written', covers: 'Leadership, Capabilities, Track Record, Advisory, Connect. Ship before she answers (Ian, 4 November 2026); stay in Q10 for her review.' },
  'Q23.contacts': { ref: 'Q23', state: 'answered', meanwhile: 'as written', covers: 'Email and phone publish; no WhatsApp (her answer, 4 November 2026).' },

  /* ---- client answers ---- */
  'Q26.portrait': { ref: 'Q26', state: 'open', meanwhile: 'fallback', covers: 'Hero portrait (home: vertical Lifecycle Rule in its column, bridge drops its horizontal rule); /leadership small crop (no image); Person image.' },
  'Q1.pricing': { ref: 'Q1', state: 'answered', meanwhile: 'as written', covers: 'All six services "Depends on scope of project" (her explicit decision).' },
  'Q22.calendly': { ref: 'Q22', state: 'open', meanwhile: 'fallback', covers: 'Calendly link and first-call length: /connect line 50 and the booking gate are hidden; Book a discovery call opens the advisory email (advisory-email-subject).' },
  'Q22.reply-time': { ref: 'Q22', state: 'answered', meanwhile: 'as written', covers: 'Replies within 24 to 48 hours, role and advisory enquiries (copy carries it once exported).' },
  'Q24.region': { ref: 'Q24', state: 'answered', meanwhile: 'as written', covers: 'Takes clients outside Kenya, mostly remote.' },
  'Q24.engagement': { ref: 'Q24', state: 'open', meanwhile: 'hidden', covers: 'How an engagement starts, what the client receives at the end, referral fees: the process block and FAQ items without a full answer; Service areaServed until copy confirms.' },
  'Q2.current-role': { ref: 'Q2', state: 'open', meanwhile: 'as written', covers: 'First career entry reads "from August 2021": no end date, no "Present".' },
  'Q2.works-for': { ref: 'Q2', state: 'open', meanwhile: 'hidden', covers: 'Person worksFor in the schema.' },
  'Q3.availability': { ref: 'Q3', state: 'open', meanwhile: 'hidden', covers: 'The /leadership availability line (there is no availability pill).' },
  'Q2-Q4.hiring-snapshot': { ref: 'Q2, Q3, Q4', state: 'open', meanwhile: 'hidden', covers: 'The whole /connect hiring snapshot; empty fields are removed, never filled.' },
  'Q10.capabilities-h1': { ref: 'Q10', state: 'open', meanwhile: 'as written', covers: '/capabilities H1 "What it takes to run a country operation": ships before she answers (Ian, 4 November 2026).' },
  'Q10.capabilities-h2': {
    ref: 'Q10',
    state: 'open',
    meanwhile: 'fallback',
    covers: '/capabilities first H2 (SP-3 heading). Fallback until Q10; no count of capabilities anywhere on the route.',
    fallback: { file: 'capabilities.md', microcopyKey: 'capabilities-h2-fallback', notePattern: /fallback heading "([^"]+)"/ },
  },
  'Q10.philosophy-line': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: 'Home bridge pull quote (philosophy line).' },
  'Q10.one-operation-sentence': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: 'Home competencies: "I have run one operation, not several."' },
  'Q10.mission-line': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: '/leadership mission line.' },
  'Q10.automation-sentence': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: '/leadership "Automation starts with the workflow."; the paragraph opens "I separate automation-ready tasks".' },
  'Q10.tools-sentence': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: '/capabilities "I name a tool only when I can point to the work it did."' },
  'Q10.pillar-labels': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: 'Build and Scale, Transform and Integrate, Govern and Protect labels (home and /capabilities); the groups render without them.' },
  'Q10.capability-9': { ref: 'Q10, I17', state: 'answered', meanwhile: 'as written', covers: 'Released by Ian (I17, 4 November 2026): "Workplace Infrastructure and Vendor Governance" card 9 and the home list item ship, no employer name, in Govern and Protect. Stays in Q10 for her review only.' },
  'Q10.case-takeaways': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: 'The whole takeaway section on each of the five case pages.' },
  'Q10.resume-openers': { ref: 'Q10', state: 'open', meanwhile: 'as written', covers: '"Demonstrated ability to", "Track record of", "Proven expertise in" stay until she answers.' },
  'Q10.advisory-best-for': { ref: 'Q10', state: 'open', meanwhile: 'hidden', covers: '/advisory Best for rows stay hidden (Ian, 4 November 2026).' },
  'Q10.tagline': { ref: 'I8, Q10', state: 'open', meanwhile: 'nothing', covers: 'No tagline anywhere (footer or hero).' },
  'Q29.phase-headings': { ref: 'Q29', state: 'open', meanwhile: 'hidden', covers: 'The three "Phase ..." subheadings on the integration and due diligence cases only; the content under them stays. Office ships as written (R2-12).' },
  'Q39.advisory-clients': { ref: 'Q39', state: 'open', meanwhile: 'hidden', covers: 'Home bridge line "I also advise founder-led organisations ...".' },
  'Q8.closure': { ref: 'Q8', state: 'open', meanwhile: 'nothing', covers: 'The office closure is out everywhere; the Lifecycle Rule ends at integration.' },
  'Q14.cv': { ref: 'Q14', state: 'open', meanwhile: 'hidden', covers: 'Every Download the CV link; no PDF is published.' },
  'Q7.lifecycle-dates': { ref: 'Q7', state: 'open', meanwhile: 'hidden', covers: 'The Start-up and Scale segment years: those two segments ship with no date line.' },
  'Q31.24-hour-clause': { ref: 'Q31', state: 'open', meanwhile: 'hidden', covers: 'HR case: the clause ", including the move to 24-hour coverage"; the sentence ends at "shift patterns."' },
  'Q9.tools': { ref: 'Q9, I10', state: 'open', meanwhile: 'nothing', covers: 'No tools beyond Akira HRMS and Slack; no tool chips.' },
  'Q25.evidence': { ref: 'Q25', state: 'open', meanwhile: 'fallback', covers: 'Evidence documents: the proof line renders instead (case-proof-line microcopy).' },
  'Q12.fifteen-years': { ref: 'Q12', state: 'open', meanwhile: 'as written', covers: 'The testimonial\'s "15 years" stays as he wrote it; never restated in her voice. Does not block the testimonial.' },
  'Q15.employer-2023': { ref: 'Q15', state: 'open', meanwhile: 'as written', covers: 'No employer named for the 2023 wing.' },
  'Q16.rooms': { ref: 'Q16', state: 'open', meanwhile: 'as written', covers: 'No soundproof room count.' },
  'Q17.rent': { ref: 'Q17, I13', state: 'open', meanwhile: 'as written', covers: 'Rent figures exactly as sourced, with "$".' },
  'Q18.throughput': { ref: 'Q18', state: 'open', meanwhile: 'as written', covers: 'No year and no tool on the throughput figure.' },
  'Q19.fraud-card': { ref: 'Q19', state: 'open', meanwhile: 'as written', covers: 'Fraud card ships without a problem sentence unless Ian holds it.' },
  'Q20.clients': { ref: 'Q20', state: 'open', meanwhile: 'as written', covers: '"No client is named".' },
  'Q21.hr-dates': { ref: 'Q21', state: 'open', meanwhile: 'as written', covers: 'No HR dates, PMP not expanded, no temporalCoverage on the HR Article.' },
  'Q41.hr-employer': { ref: 'Q41', state: 'open', meanwhile: 'as written', covers: 'HR case employer Ecom Services Ltd, as the CV places it.' },
  'Q6.peak-headcount': { ref: 'Q6', state: 'open', meanwhile: 'as written', covers: '/capabilities 37 as written.' },
  'Q13.linkedin-headline': { ref: 'Q13', state: 'open', meanwhile: 'as written', covers: 'Role title as written; the profile URL is settled.' },

  /* ---- inside /advisory (live from 4 November 2026) and the draft legal routes ---- */
  'Q10.advisory-h1': { ref: 'Q10, R7-D6', state: 'answered', meanwhile: 'as written', covers: '/advisory H1 "Structure, before growth outruns it" ships (Ian, R7-D6, 4 November 2026); stays in Q10 for her review.' },
  'Q39.advisory-first-sentence': { ref: 'Q39, R7-D7', state: 'answered', meanwhile: 'as written', covers: '/advisory opening sentence ships in the R7-D7 form ("I take on advisory work for founder-led and fast-growing organisations...", from the copy). Q39 itself stays open.' },
  'I15.last-updated': { ref: 'I15', state: 'open', meanwhile: 'nothing', covers: '"Last updated" on /privacy-policy and /terms; WebPage dateModified. Never a guessed date.' },
  'R7-T3.build-fact': { ref: 'R7-T3', state: 'answered', meanwhile: 'as written', covers: 'Confirmed (Ian): no accounts and no payments, on the site or through Calendly. Calendly payment collection stays off when her link arrives.' },
  'R7-T11.copy-ownership': { ref: 'R7-T11', state: 'open', meanwhile: 'nothing', covers: '/terms line 53 (copy ownership) stays gated for the reviewer until Ian confirms.' },
  // Appended by batch B (Stage 7): README "Copy ownership" row, the /terms section heading at 51.
  'R7-T11.terms-heading': {
    ref: 'R7-T11',
    state: 'open',
    meanwhile: 'fallback',
    covers: '/terms section heading at 51 (copy ownership): hidden until Ian confirms and the reviewer clears it; the fallback heading renders meanwhile (editor round 7b). Line 55 is R7-T11.copy-ownership.',
    fallback: { file: 'terms.md', notePattern: /fallback heading "([^"]+)"/ },
  },

  /* ---- design and plan decisions ---- */
  'D14-1.organisation-strip': { ref: 'Design direction 14.1', state: 'open', meanwhile: 'nothing', covers: 'No organisation strip on home.' },
} as const satisfies Record<string, GateDef>;

export type GateId = keyof typeof GATES;

export function gate(id: GateId): GateDef {
  return GATES[id];
}

/** True when the gated element renders now (answered, or shipping as written). */
export function ships(id: GateId): boolean {
  const g: GateDef = GATES[id];
  return g.state === 'answered' || g.meanwhile === 'as written';
}

/**
 * The fallback text for a fallback gate, read from the route copy (never typed into code).
 * Order: the microcopy key, then a quoted string inside a [note] of that file.
 * Throws when the copy supplies neither, so the build fails instead of inventing a heading.
 */
export function gateFallbackText(id: GateId): string {
  const g: GateDef = GATES[id];
  const src = g.fallback;
  if (!src) throw new Error(`Gate ${id} has no copy fallback`);
  if (!hasRouteFile(src.file)) throw new Error(`Gate ${id}: ${src.file} is not in site-inputs/content`);
  if (src.microcopyKey) {
    const v = optionalMicrocopy(src.microcopyKey, src.file);
    if (v) return v;
  }
  if (src.notePattern) {
    const rf = loadRouteFile(src.file);
    const notes = [...rf.microcopyNotes, ...rf.sections.flatMap((s) => [...s.notes, ...s.blocks.flatMap((b) => b.notes)])];
    for (const n of notes) {
      const m = n.match(src.notePattern);
      if (m) return m[1];
    }
  }
  throw new Error(
    `Gate ${id}: the copy does not supply the fallback yet (expected microcopy "${src.microcopyKey}" in ${src.file}). Do not type it into code; ask the content stage.`,
  );
}

export function hasGateFallback(id: GateId): boolean {
  try {
    gateFallbackText(id);
    return true;
  } catch {
    return false;
  }
}
