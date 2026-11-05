/* Nine competencies in three pillars (intake competencies 1 to 3 plus six from the CV). */

export interface Competency {
  title: string;
  icon: string;
  /** One line for cards on the home page. */
  short: string;
  /** Fuller description for /capabilities. */
  body: string;
  /** Three short items naming what the competency covers in practice. */
  scope: string[];
  /** One piece of evidence from her record. */
  evidence: string;
}

export interface Pillar {
  id: string;
  title: string;
  summary: string;
  competencies: Competency[];
}

export const pillars: Pillar[] = [
  {
    id: 'build-and-scale',
    title: 'Build and Scale',
    summary: 'Structures that let an operation grow in headcount and volume without losing control.',
    competencies: [
      {
        title: 'Operating Model Design & Organisational Scaling',
        icon: 'network',
        short: 'Leadership layers, reporting lines and accountability routines for a growing business.',
        body: 'I design the structure a growing business runs on: leadership layers, reporting lines, departments and the accountability routines that hold them together. At Ecom Services Ltd I created four departments (Moderation, Trust & Safety, Customer Support and Compliance), each with KPIs and escalation paths, raising efficiency by 30% to 40% while overseeing HR, finance, payroll, procurement, risk and governance.',
        scope: ['Leadership layers and reporting lines', 'Department design and KPIs', 'Accountability and escalation routines'],
        evidence: 'Grew a Kenya hub from 5 to 103 people across Moderation, Trust & Safety, Customer Support, ICT, HR and Compliance.',
      },
      {
        title: 'Service Delivery & SLA Governance',
        icon: 'gauge',
        short: 'KPIs, SLAs, escalation paths and quality routines for international clients.',
        body: 'I set the standard a client can hold the operation to: KPIs, SLA monitoring, escalation paths and quality-assurance routines, written into SOPs the team works from. As Customer Service Manager I redesigned workflows on that model, lifting service delivery efficiency by 20%, and onboarded a second client without disrupting the first. I also recruited and coached the night and graveyard shifts behind the 24-hour model.',
        scope: ['SLA monitoring and escalation', 'SOPs and quality assurance', '24-hour shift coverage'],
        evidence: 'Moved to a 24-hour model that raised capacity by 50%, improved turnaround by 40% and cut backlogs by more than 35%.',
      },
      {
        title: 'HR Infrastructure & Performance Systems',
        icon: 'users',
        short: 'Job architecture, handbooks, hiring frameworks and performance cycles.',
        body: "I build the people function as one system rather than a set of forms. At Ecom Services Ltd I established HR from the ground up: the company's first HR policy framework and Employee Handbook, job descriptions, competency-based hiring with psychometric assessments, and a Quality & Performance Management function that replaced annual reviews with quarterly appraisals and monthly one-on-ones.",
        scope: ['Policy framework and handbook', 'Competency-based hiring', 'Quarterly performance cycles'],
        evidence: 'Co-built the Akira HRMS, cutting HR administration and paper records by more than 75%.',
      },
    ],
  },
  {
    id: 'transform-and-integrate',
    title: 'Transform and Integrate',
    summary: 'Change led without breaking service, from automation to acquisition.',
    competencies: [
      {
        title: 'AI-Enabled Operations Transformation',
        icon: 'bot',
        short: 'Mapping manual workflows and separating automation-ready work from judgement-led work.',
        body: 'I map how the work moves before deciding what to automate. As General Manager at Social Discovery Group I traced manual processing and approval workflows, separated automation-ready tasks from judgement-led work, and coordinated delivery with AI engineers, global technology teams and the Chief Technology Officer. My method rests on formal training in business process redesign and re-engineering.',
        scope: ['Manual workflow mapping', 'Automation-ready task selection', 'Delivery with technology teams'],
        evidence: 'Lifted processing and approval throughput by 75% within three months at Social Discovery Group.',
      },
      {
        title: 'Acquisition Due Diligence & Post-Merger Integration',
        icon: 'merge',
        short: 'Diligence-ready records and integration across HR, finance, procurement and technology.',
        body: 'I run both halves of an acquisition: the scrutiny before and the integration after. For the 2021 sale I compiled five years of financial, HR, legal, supplier, asset, lease and statutory records, which were positively recognised during due diligence. I then led integration into Social Discovery Group across HR, finance, procurement, technology and reporting, running two parallel audit cycles with compliance and service delivery intact.',
        scope: ['Diligence-ready record keeping', 'Audit and compliance alignment', 'Post-acquisition systems migration'],
        evidence: 'Integrated the Kenya office into Social Discovery Group within the one-year earn-out, retaining 100% of key clients.',
      },
      {
        title: 'Crisis Management & Business Continuity',
        icon: 'life-buoy',
        short: 'Protecting people and service through disruption, closure and change.',
        body: 'I plan for disruption before it arrives and keep service running through it. In early 2020 I introduced sanitisation protocols and mandatory masking before the national lockdowns, then moved the whole company to remote operations within three weeks, backed by laptops, screens, UPSs, asset-tracking controls and employee training. Service continued without interruption across two years of remote work, with no employee infections.',
        scope: ['Business continuity planning', 'Remote operations at scale', 'Health and safety protocols'],
        evidence: 'Moved all 80 employees to remote work by 23 March 2020 with service uninterrupted.',
      },
    ],
  },
  {
    id: 'govern-and-protect',
    title: 'Govern and Protect',
    summary: 'Controls that protect people, money and platforms, and stand up to audit.',
    competencies: [
      {
        title: 'Trust & Safety and Fraud Risk Management',
        icon: 'shield-check',
        short: 'Platform safety, fraud detection and risk escalation under clear controls.',
        body: 'I protect a platform and its users with workflows that catch risk early and route it to the right people. At Ecom Services Ltd I created the Trust & Safety department; at Social Discovery Group I expanded platform-safety work into fraud detection, suspicious-activity monitoring and risk escalation, under clearer controls and a regular reporting rhythm.',
        scope: ['Fraud detection and monitoring', 'Risk escalation paths', 'Content moderation oversight'],
        evidence: 'Improved fraud response by 30% to 40% at Social Discovery Group.',
      },
      {
        title: 'Budget, Payroll & Compliance Governance',
        icon: 'landmark',
        short: 'Payroll, procurement, vendor and audit controls that pass statutory review.',
        body: 'I keep money, payroll and statutory obligations under controls that stand up to audit. At Social Discovery Group I held payroll, procurement, vendor and audit controls across the annual budget. Earlier, as Customer Service Manager, I brought payroll in-house from an external recruitment agency, covering salaries and statutory deductions, cutting costs by 20% to 30% and reaching 100% accuracy and timeliness.',
        scope: ['Budget and cost control', 'In-house payroll operations', 'Statutory audit readiness'],
        evidence: 'Controlled a USD 1.1M annual budget and cleared NSSF and NHIF audits without compliance gaps.',
      },
      {
        title: 'Workplace Infrastructure & Vendor Governance',
        icon: 'building',
        short: 'Competitive vendor selection and fit-outs delivered on time and on budget.',
        body: 'I keep the workplace in step with headcount growth. I delivered a first dedicated office in 2016 and an expansion and modernisation in 2023, each run on competitive vendor governance: quotations from at least three vendors for every scope of work, then close supervision of timeline, quality and budget. The 2016 office came in under budget and the 2023 wing within it.',
        scope: ['Office build and expansion projects', 'Competitive vendor selection', 'Timeline and budget supervision'],
        evidence: 'Delivered KES 25 million of office infrastructure across two projects, both within budget.',
      },
    ],
  },
];

/** Tools, all ten from the CV, grouped. */
export const toolGroups = [
  {
    title: 'Productivity Suites',
    icon: 'layout-grid',
    tools: [
      { name: 'Microsoft Office', note: 'Reporting, budgets, policy documents and board packs' },
      { name: 'Google Workspace', note: 'Shared records, documentation and team operations' },
    ],
  },
  {
    title: 'Collaboration',
    icon: 'messages-square',
    tools: [
      { name: 'Microsoft Teams', note: 'Cross-functional and remote team coordination' },
      { name: 'Zoom', note: 'Remote leadership, client and global management sessions' },
      { name: 'Slack', note: 'Adopted group-wide during the post-acquisition migration' },
    ],
  },
  {
    title: 'Workflow & Automation',
    icon: 'workflow',
    tools: [
      { name: 'Asana', note: 'Project and workstream tracking' },
      { name: 'Power Automate', note: 'Automating manual, repeatable processes' },
      { name: 'Generative AI (GenAI)', note: 'AI workflow automation that lifted throughput 75%' },
    ],
  },
  {
    title: 'Data & People Systems',
    icon: 'bar-chart-3',
    tools: [
      { name: 'Power BI', note: 'Performance, staffing and operational reporting' },
      { name: 'Akira HRMS', note: 'Co-built with IT to automate leave and HR records' },
    ],
  },
] as const;

export const languages = [
  { name: 'English', level: 'Fluent', score: 90 },
  { name: 'Swahili', level: 'Native', score: 100 },
] as const;
