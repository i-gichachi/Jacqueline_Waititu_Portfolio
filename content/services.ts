/* Six advisory services, from her service form (descriptions and outcomes in her words, UK spelling). */

export interface Service {
  slug: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  bestFor: string;
  investment: string;
  duration: string;
  /** Case study slugs that show this service in practice. */
  cases: string[];
}

export const services: Service[] = [
  {
    slug: 'operating-model',
    icon: 'network',
    title: 'Operating Model Design & Scaling Advisory',
    description:
      'Moves a founder-led or fast-growing organisation to a structured operation, with clear leadership layers, reporting lines, departmental ownership and accountability routines.',
    benefits: [
      'Grow headcount and volume without chaos',
      'Less dependence on the founder',
      'Clearer ownership of results',
      'A structure that stands up to investors or acquirers',
    ],
    bestFor: 'Founder-led and fast-growing organisations preparing for growth, investment or sale.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['hr-function', 'office-projects'],
  },
  {
    slug: 'ai-workflow-automation',
    icon: 'bot',
    title: 'AI & Workflow Automation Strategy',
    description:
      'Maps manual workflows, separates automation-ready tasks from judgement-led work, and coordinates delivery with technical teams.',
    benefits: [
      'Faster processing and fewer manual errors',
      'Lower handling cost per task',
      'Staff time redirected to work that needs judgement',
      'A clear priority list so automation spend pays off',
    ],
    bestFor: 'High-volume operations with manual processing, approvals or moderation queues.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['hr-function', 'kenya-office-integration'],
  },
  {
    slug: 'due-diligence-integration',
    icon: 'merge',
    title: 'M&A Due Diligence & Integration Support',
    description:
      'Prepares records for due diligence and leads post-acquisition integration across HR, finance, procurement, technology and reporting.',
    benefits: [
      'A smoother diligence process with credible records',
      'Faster, less disruptive integration',
      'Key clients protected through the transition',
      'Staff kept stable and informed',
    ],
    bestFor: 'Owners preparing for a sale, and acquirers integrating a newly bought operation.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['sale-due-diligence', 'kenya-office-integration'],
  },
  {
    slug: 'service-delivery-sla',
    icon: 'gauge',
    title: 'Service Delivery & SLA Governance',
    description: 'Designs the KPIs, SLAs, escalation paths and quality routines, including 24-hour and multi-shift coverage.',
    benefits: [
      'More reliable service and shorter turnaround',
      'Smaller backlogs',
      'Round-the-clock coverage without a drop in quality',
      'Performance reporting you can show your own customers',
    ],
    bestFor: 'BPO, support and trust and safety teams serving international clients across shifts.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['pandemic-remote-transition', 'kenya-office-integration'],
  },
  {
    slug: 'hr-infrastructure',
    icon: 'users',
    title: 'HR Infrastructure & Performance Systems',
    description:
      'Builds job architecture, handbooks, recruitment frameworks, assessment, performance processes and HR digitisation.',
    benefits: [
      'Better hiring decisions',
      'Fair and consistent performance management',
      'Lower legal and employee-relations risk',
      'Far less HR admin through automation',
    ],
    bestFor: 'Growing organisations whose people processes have not kept pace with headcount.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['hr-function'],
  },
  {
    slug: 'cost-governance-review',
    icon: 'landmark',
    title: 'Cost, Budget & Governance Review',
    description: 'Reviews budget, payroll, procurement, vendor and statutory compliance practices, and tightens controls.',
    benefits: [
      'Visibility into where money goes',
      'Lower avoidable cost',
      'Accurate and timely payroll',
      'Cleaner audits with fewer compliance surprises',
    ],
    bestFor: 'Leadership teams and boards that want tighter control of spend, payroll and statutory compliance.',
    investment: 'Scoped to your project',
    duration: 'Set by scope',
    cases: ['office-projects', 'pandemic-remote-transition'],
  },
];

export const process = [
  { icon: 'calendar', title: 'Consultation', body: 'A first call to understand the organisation, the pressure on it and what a good result looks like.' },
  { icon: 'search', title: 'Diagnostic', body: 'A close look at structure, workflows, records and controls to find where the gaps really are.' },
  { icon: 'map', title: 'Roadmap', body: 'A prioritised plan with owners, timelines and the measures that will show progress.' },
  { icon: 'hammer', title: 'Delivery', body: 'Hands-on implementation alongside your leaders, with regular reporting against the plan.' },
  { icon: 'key', title: 'Handover', body: 'Documented processes and trained owners, so the improvement lasts after the engagement ends.' },
] as const;

export const engagementNotes = [
  { icon: 'globe', title: 'Kenya and beyond', body: 'Engagements with organisations in Kenya and abroad, delivered mostly remotely.' },
  { icon: 'clock', title: 'Quick response', body: 'Every enquiry receives a reply within 24 to 48 hours.' },
  { icon: 'handshake', title: 'Scoped together', body: 'Investment and duration are agreed after the first consultation, to fit the work.' },
] as const;

export const faqs = [
  {
    q: 'How is an engagement priced?',
    a: 'Each engagement is scoped to the project. After the first consultation you receive a proposal with the scope, timeline and investment.',
  },
  {
    q: 'Do you work with organisations outside Kenya?',
    a: 'Yes. Engagements are delivered mostly remotely, for organisations in Kenya and abroad.',
  },
  {
    q: 'Can an engagement combine more than one service?',
    a: 'Yes. Many operational problems cross functions, so a single engagement can draw on several of these services.',
  },
  {
    q: 'What happens after I book a consultation?',
    a: 'You receive a calendar confirmation. The call is used to understand your situation and agree whether, and how, to work together.',
  },
] as const;
