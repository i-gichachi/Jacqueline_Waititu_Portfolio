/*
  Site-wide facts. Every value comes from Jacqueline's CV or intake (kinari/00-brief/input/).
  Change a contact here and it changes everywhere.
*/

export const site = {
  name: 'Jacqueline Waititu',
  firstName: 'Jacqueline',
  initials: 'JW',
  role: 'General Manager & Operations Leader',
  location: 'Nairobi, Kenya',
  email: 'waititujacque@gmail.com',
  phone: '+254 723 934 829',
  phoneHref: 'tel:+254723934829',
  linkedin: 'https://www.linkedin.com/in/jacquelinewaititu',
  linkedinLabel: 'linkedin.com/in/jacquelinewaititu',
  /** Placeholder until Jacqueline sends her booking link. Swap for her Calendly event URL. */
  calendly: 'https://calendly.com',
  cv: '/jacqueline-waititu-cv.pdf',
  /** Path to her portrait in /public once supplied, e.g. '/jacqueline-waititu.jpg'. Null shows the framed placeholder. */
  portrait: null as string | null,
  responseTime: 'Replies within 24 to 48 hours',
  url: (process.env.SITE_URL ?? 'https://jacqueline-waititu.vercel.app').replace(/\/$/, ''),
  description:
    'I am Jacqueline Waititu, a General Manager and Operations Leader with 18+ years building, scaling and integrating operations, from a five-person start-up to a 103-person business acquired by Social Discovery Group.',
} as const;

export const nav = [
  { href: '/leadership', label: 'Leadership' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/track-record', label: 'Track Record' },
  { href: '/advisory', label: 'Advisory' },
  { href: '/connect', label: 'Connect' },
] as const;

export const legalNav = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
] as const;

/** General, inclusive calls to action. One wording everywhere. */
export const cta = {
  consult: { label: 'Book a Consultation', href: '/connect' },
  cases: { label: 'View Track Record', href: '/track-record' },
  services: { label: 'Explore Services', href: '/advisory' },
  cv: { label: 'Download CV', href: '/jacqueline-waititu-cv.pdf' },
  leadership: { label: 'Read My Story', href: '/leadership' },
  capabilities: { label: 'Explore Capabilities', href: '/capabilities' },
} as const;

/** Animated headline metrics (home). Labels carry the meaning; no index numbers anywhere. */
export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Count from this value (defaults to 0). */
  from?: number;
  decimals?: number;
  label: string;
  detail?: string;
}

export const headlineMetrics: Metric[] = [
  { value: 18, suffix: '+', label: 'Years in operations leadership', detail: 'From the service floor to General Manager' },
  { value: 103, from: 5, label: 'People in the operation I built', detail: 'Grown from a five-person start-up' },
  { value: 75, suffix: '%', label: 'Lift in processing throughput', detail: 'Within three months, through AI workflow automation' },
  { value: 100, suffix: '%', label: 'Key clients retained', detail: 'Through the acquisition earn-out period' },
];

/** Trust section: sectors served and the organisations behind them. */
export const sectors = [
  {
    icon: 'headset',
    title: 'Business Process Outsourcing',
    body: 'Multi-client and international service delivery, run around the clock.',
    orgs: ['Ecom Services Ltd', 'Ken-Tech Data Ltd'],
  },
  {
    icon: 'globe',
    title: 'Online Platforms',
    body: 'Operations for a global social discovery group after its acquisition of the Kenya office.',
    orgs: ['Social Discovery Group'],
  },
  {
    icon: 'shield',
    title: 'Trust & Safety',
    body: 'Moderation, platform safety, fraud detection and risk escalation at scale.',
    orgs: ['Ecom Services Ltd', 'Social Discovery Group'],
  },
  {
    icon: 'landmark',
    title: 'Banking & Financial Services',
    body: 'Branch advisory on asset and liability products and customer relationships.',
    orgs: ['Barclays Bank of Kenya'],
  },
  {
    icon: 'radio',
    title: 'Telecommunications',
    body: 'Channel support and back-office quality through a national mobile launch.',
    orgs: ['Telkom Kenya (Orange Kenya)'],
  },
] as const;

export const organisations = [
  'Social Discovery Group',
  'Ecom Services Ltd',
  'Barclays Bank of Kenya',
  'Telkom Kenya (Orange Kenya)',
  'Ken-Tech Data Ltd',
  'Monarch Business School, Switzerland',
  'Egerton University',
  'The Women on Boards Network Kenya',
] as const;

/** Home about bridge. */
export const aboutBridge = {
  eyebrow: 'About Me',
  heading: 'From the service floor to the General Manager’s office, inside one growing operation.',
  paragraphs: [
    'I began in 2008 on the front line: a BPO service desk, a telecoms dealer line and a bank branch. In 2010 I joined Ecom Services Ltd as a team leader, and by 2012 I was its General Manager.',
    'Over the next nine years I grew a five-person start-up into a 103-person operation and built its HR, finance, compliance and trust and safety functions. When Social Discovery Group acquired the company in 2021, I led the due diligence, the integration and, later, the closure. I bring that full lifecycle to General Manager and Head of Operations roles, and to organisations that need the same structure built for them.',
  ],
  facts: [
    { label: 'Based in', value: 'Nairobi, Kenya' },
    { label: 'Education', value: 'MBA in Global Business' },
    { label: 'Sectors', value: 'Private and development' },
    { label: 'Languages', value: 'English and Swahili' },
  ],
} as const;
