/* Career, education, certifications and testimonials, from the CV and the brief. */

export interface Role {
  title: string;
  organisation: string;
  location: string;
  start: string;
  end: string;
  /** Short label for the progression strip. */
  stage: string;
  responsibilities: string[];
}

export const career: Role[] = [
  {
    title: 'General Manager',
    organisation: 'Social Discovery Group',
    location: 'Nairobi, Kenya',
    start: 'Jul 2021',
    end: 'Present',
    stage: 'Integration and transformation',
    responsibilities: [
      'Lifted processing and approval throughput by 75% within 3 months by mapping manual workflows for automation with AI engineers, global technology teams and the Chief Technology Officer (CTO).',
      'Led integration of the Kenya operation into Social Discovery Group across HR, finance, procurement, technology and reporting, running 2 parallel audit cycles without disrupting compliance or service delivery.',
      'Retained 100% of key clients through the earn-out period while aligning policy, reporting and employee change to group governance standards.',
      'Improved fraud response by 30% to 40% by expanding platform-safety workflows into fraud detection, suspicious-activity monitoring and risk escalation under clearer controls and reporting rhythms.',
      'Held payroll, procurement, vendor and audit controls across a USD 1.1M annual budget, clearing National Social Security Fund (NSSF) and National Hospital Insurance Fund (NHIF) audits without compliance gaps.',
      'Directed workflow transitions, technology adoption, policy harmonisation and reporting realignment during the systems migration, with stakeholder communication keeping client continuity intact.',
    ],
  },
  {
    title: 'General Manager',
    organisation: 'Ecom Services Ltd.',
    location: 'Nairobi, Kenya',
    start: 'Jul 2012',
    end: 'Jul 2021',
    stage: 'Built and scaled the operation',
    responsibilities: [
      'Expanded the workforce from 5 to 103 staff, creating organisational structures and reporting frameworks while overseeing HR, finance, payroll, banking, risk, tax, procurement, governance and regulatory compliance.',
      'Raised efficiency by 30% to 40% by creating 4 departments: Moderation, Trust & Safety, Customer Support and Compliance, with strategic planning, Key Performance Indicators (KPIs) and escalation paths.',
      'Established the HR function, introducing the inaugural handbook, job descriptions, competency frameworks, performance reviews, psychometrics, 1:1s and structured hiring.',
      'Cut HR administration and paper-based record handling by more than 75% by co-building the Akira Human Resource Management System (HRMS) with IT to automate leave, wellness-day and sick-leave processes.',
      'Delivered a KES 10M dedicated office for 80 employees in 3 months and a KES 15M expansion in 2.5 months, both within budget and adding 25 seats.',
      'Moved all 80+ employees to remote work by 23 March 2020, keeping service uninterrupted through laptop and software access, asset-tracking controls and policy compliance.',
      'Compiled 5 years of financial, HR, legal, supplier, asset, lease and statutory records that were positively recognised during the 2021 acquisition due diligence by Social Discovery Group.',
    ],
  },
  {
    title: 'Customer Service Manager',
    organisation: 'Ecom Services Ltd.',
    location: 'Nairobi, Kenya',
    start: 'Apr 2011',
    end: 'Jun 2012',
    stage: 'Took service to 24 hours',
    responsibilities: [
      'Increased capacity by 50% and improved turnaround time by 40% by moving a single-shift operation to a 24-hour service model for international clients.',
      'Reduced backlogs by more than 35% by recruiting, inducting and coaching the night and graveyard shift teams that carried the 24-hour model.',
      'Brought payroll in-house from an external recruitment agency, covering salaries and statutory deductions, cutting costs by 20% to 30% and reaching 100% accuracy and timeliness.',
      'Improved service delivery efficiency by 20% by redesigning workflows and introducing Standard Operating Procedures (SOPs), KPIs, Service Level Agreement monitoring, escalation paths and quality-assurance routines.',
      'Onboarded a second client without disrupting the primary engagement, building workflow readiness and capacity for work that generated USD 48,000 over 2 years.',
    ],
  },
  {
    title: 'Customer Service Team Leader',
    organisation: 'Ecom Services Ltd.',
    location: 'Nairobi, Kenya',
    start: 'Dec 2010',
    end: 'Mar 2011',
    stage: 'First team leadership',
    responsibilities: [
      'Coached the team to consistently surpass client SLAs through recognition programmes and targeted performance coaching, building a performance-led service culture.',
      'Aligned agents around client deadlines and quality standards through daily team coordination, keeping service consistent as workload grew.',
      'Mentored team members through structured feedback and practical guidance, strengthening individual performance and readiness for added responsibility.',
    ],
  },
  {
    title: 'Customer Advisor',
    organisation: 'Barclays Bank of Kenya',
    location: 'Nairobi, Kenya',
    start: 'May 2010',
    end: 'Dec 2010',
    stage: 'Banking',
    responsibilities: [
      'Advised branch customers on asset and liability products over eight months, matching individual financial needs to suitable lending, account and deposit options.',
      'Cross-sold related banking products during routine service interactions, identifying opportunities to deepen customer relationships and contribute to branch revenue growth.',
      'Explained product features, interest rates, fees, eligibility criteria and application requirements, helping customers make informed financial decisions.',
      'Maintained accurate customer relationship records and follow-up notes, supporting service continuity and consistent account management.',
      'Referred complex enquiries and requests outside the advisor’s authority to the appropriate branch departments, ensuring customers received the necessary specialist support.',
    ],
  },
  {
    title: 'Back-Office Quality Analyst',
    organisation: 'Telkom Kenya (Orange Kenya)',
    location: 'Nairobi, Kenya',
    start: 'Jul 2009',
    end: 'Jan 2010',
    stage: 'Quality assurance',
    responsibilities: [
      'Reviewed back-office transactions and service processes against established quality standards, assessing accuracy, completeness and compliance with documented procedures.',
      'Identified processing errors, service inconsistencies and recurring operational gaps, escalating findings to team leaders for corrective action.',
      'Applied standardised quality assessment criteria across reviews, promoting consistency and reliability in performance evaluations.',
      'Maintained quality assurance records and documented review findings, providing supervisors with visibility into performance trends and areas requiring improvement.',
      'Provided feedback on procedural gaps and recurring errors, reinforcing process adherence and supporting continuous service quality improvement.',
    ],
  },
  {
    title: 'Customer Care Agent, Dealers and Distributors',
    organisation: 'Telkom Kenya (Orange Kenya)',
    location: 'Nairobi, Kenya',
    start: 'Nov 2008',
    end: 'Jun 2009',
    stage: 'Channel support',
    responsibilities: [
      'Managed service enquiries and operational issues raised by dealers and distributors following Orange’s mobile launch in Kenya, supporting channel service delivery.',
      'Coordinated issue resolution across relevant internal departments, ensuring dealer and distributor concerns were investigated and addressed.',
      'Recorded customer queries, assigned follow-up actions and monitored outstanding cases, maintaining visibility of issues through to closure.',
      'Escalated complex service and operational problems to the responsible teams, providing relevant case details to support timely resolution.',
      'Communicated progress and resolution updates to dealers and distributors, maintaining effective working relationships and confidence in service support.',
    ],
  },
  {
    title: 'Customer Service Representative',
    organisation: 'Ken-Tech Data Ltd.',
    location: 'Kenya',
    start: 'Jul 2008',
    end: 'Oct 2008',
    stage: 'Where it started',
    responsibilities: [
      'Handled customer enquiries for multiple client accounts within a business process outsourcing (BPO) environment, following account-specific service standards and operating procedures.',
      'Documented customer interactions, enquiries and resolutions in case records, maintaining accurate information for tracking and subsequent follow-up.',
      'Escalated complex enquiries and unresolved cases to supervisors, providing relevant details to support effective handling.',
      'Maintained shift schedules and service delivery targets, developing operational discipline and customer service experience.',
      'Applied consistent communication and service procedures across customer interactions, supporting reliable service delivery and customer satisfaction.',
    ],
  },
];

/** Opening of /leadership: the career arc in five steps (no hero). */
export const careerArc = [
  { year: '2008', title: 'Service Representative', org: 'Ken-Tech Data' },
  { year: '2010', title: 'Team Leader', org: 'Ecom Services' },
  { year: '2011', title: 'Customer Service Manager', org: 'Ecom Services' },
  { year: '2012', title: 'General Manager', org: 'Ecom Services' },
  { year: '2021', title: 'General Manager', org: 'Social Discovery Group' },
] as const;

export const leadershipPrinciples = [
  {
    icon: 'layers',
    title: 'Structure before scale',
    body: 'Roles, reporting lines and controls go in before headcount does, so growth adds capacity rather than confusion.',
  },
  {
    icon: 'users',
    title: 'People through change',
    body: 'Every sale, migration and integration I have led was run with the team informed and the service intact.',
  },
  {
    icon: 'file-check',
    title: 'Records that stand up',
    body: 'Clean financial, HR and statutory records turned a buyer’s due diligence into a commendation.',
  },
] as const;

export const education = [
  {
    award: 'MBA in Global Business',
    institution: 'Monarch Business School',
    location: 'Switzerland',
    level: 'Postgraduate',
  },
  {
    award: 'Bachelor of Science',
    institution: 'Egerton University',
    location: 'Nakuru, Kenya',
    level: 'Undergraduate',
  },
] as const;

export const certifications = [
  { title: 'Corporate Governance', issuer: 'The Women on Boards Network Kenya', date: 'Feb 2020', area: 'Governance' },
  { title: 'People Management Skills', issuer: 'Flexi Personnel Ltd.', area: 'People' },
  { title: 'Developing Great Team Leaders', issuer: 'Flexi Personnel Ltd.', area: 'Leadership' },
  { title: 'Trainers of Trainers', issuer: 'Flexi Personnel Ltd.', area: 'Training' },
  { title: 'Training in Customer Service', issuer: 'Leaders in Action Group', area: 'Service' },
  { title: 'Business Process Re-design and Re-engineering', issuer: '', area: 'Process' },
  { title: 'Leadership Development Training', issuer: '', area: 'Leadership' },
] as const;

export interface Testimonial {
  quote: string;
  /** Optional longer text, shown on demand. */
  full?: string[];
  name: string;
  role: string;
  organisation: string;
  relationship?: string;
}

/** More are coming: the components render any number (slider from two upwards). */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Jacqueline Waititu is an outstanding leader whose contributions have left a lasting positive impact on our organisation. She would be a tremendous asset to any company seeking a strategic, principled, and results-driven executive. I recommend her without reservation.',
    full: [
      'Throughout her leadership, Jacqueline consistently delivered year-on-year growth in profitability, steering the country office with vision and discipline. She designed and executed strategic plans that were fully aligned with the company’s long-term goals, driving sustainable business expansion and positioning our organisation for continued success.',
      'Jacqueline’s command of operational excellence was evident in her oversight of all operational functions, including customer service, finance, human resources, trust & safety and compliance. She implemented robust systems, policies, and KPIs that streamlined processes, enhanced productivity, and strengthened internal controls.',
      'Jacqueline also proved highly effective in navigating crisis and periods of change, including economic downturns, regulatory shifts, and competitive pressures. Her ability to adapt strategies swiftly and effectively ensured the continuity and resilience of our operations.',
    ],
    name: 'Andrew Bolton',
    role: 'Former Director',
    organisation: 'Ecom Services Ltd',
    relationship: 'Worked with Jacqueline across her tenure as General Manager',
  },
];
