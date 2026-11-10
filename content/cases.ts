/* Five case studies, from the client intake (Case Studies 1 to 5) and CV. Figures are the client's own. */

import type { Metric } from './site.ts';

export interface CaseStudy {
  slug: string;
  title: string;
  organisation: string;
  role: string;
  period: string;
  location: string;
  /** Added value on cards: the functions the work touched. */
  scope: string[];
  summary: string;
  metrics: Metric[];
  context: string;
  challenge: string;
  approach: { title: string; body: string }[];
  quantitative: string[];
  qualitative: string[];
  takeaway: string;
  conclusion: string;
  tools: string[];
  competencies: string[];
}

export const cases: CaseStudy[] = [
  {
    slug: 'kenya-office-integration',
    title: 'Integrating the Kenya Office After Acquisition',
    organisation: 'Social Discovery Group',
    role: 'General Manager',
    period: 'Sep 2021 – Aug 2022',
    location: 'Nairobi, Kenya',
    scope: ['HR', 'Finance & Audit', 'Procurement', 'Technology'],
    summary:
      'After Social Discovery Group acquired Ecom Services Ltd in August 2021, the Kenya office had one year to meet the group’s global standards without losing clients, people or compliance. Working directly with the acquirer’s leadership, I ran the integration as six workstreams: HR, finance and audit, procurement, operations, technology and stakeholders. Two audit cycles, July to June and January to December, ran in parallel. By the end of the earn-out, the office was fully integrated, with 100% of key clients retained and the team stable throughout.',
    metrics: [
      { value: 100, suffix: '%', label: 'Key clients retained through the earn-out' },
      { value: 2, label: 'Audit cycles run in parallel' },
      { value: 12, label: 'Months to full integration', suffix: '' },
    ],
    context:
      'Social Discovery Group acquired Ecom Services Ltd in August 2021, after a four-month due diligence I had supported as General Manager. The Kenya office then entered a one-year earn-out and integration period, from September 2021 to August 2022. The operation served international clients, and it had to keep running at full service while its owners, systems and standards changed around it. My role was to lead the integration directly with the acquiring company’s leadership, so the Kenya side of every decision ran through one accountable point. The earn-out set the clock: every workstream had to land inside those twelve months, and the clients and the team had to come through it intact.',
    challenge:
      'The task was to align the operation with the acquirer’s global standards across HR, finance, procurement, compliance and reporting, while keeping the business running and employees stable. Every change also had to remain compliant with Kenyan requirements, so group policy could not simply be copied across: contracts and benefits had to satisfy Kenyan labour law and the group’s standards at the same time. The hardest constraint was the calendar. The office ran a July to June audit cycle and the acquirer a January to December one, and both had to be met at once, with full documentation and compliance for each. Underneath all of it sat a team that needed to understand what was changing, and why.',
    approach: [
      {
        title: 'Integration as workstreams',
        body: 'The integration was organised as workstreams, each aligned to the global standard, checked against Kenyan requirements and agreed directly with the acquiring company’s leadership. In operations, I reviewed workflows, reporting lines and documentation standards so the Kenya office fitted the global operating structure. Procurement followed the same pattern, with vendor management and approval structures aligned to the group’s procurement policies.',
      },
      {
        title: 'People and finance first',
        body: 'HR policies, employee records, reporting structures and performance management moved onto the global HR framework, with contracts and benefits meeting both Kenyan labour law and group standards. Finance moved onto the acquirer’s reporting and audit framework while I maintained the legacy cycle, overseeing the documentation and compliance requirements for both audits in parallel.',
      },
      {
        title: 'Systems and stakeholders',
        body: 'Internal systems, communication tools and reporting platforms had to move as well, including Google Chat to Slack. I coordinated that move and directed the workflow transitions, technology adoption, policy harmonisation and reporting realignment that came with it. Employee communication and change management stayed with me throughout, and I represented the Kenya office at global management summits and leadership sessions to support knowledge transfer.',
      },
    ],
    quantitative: [
      '100% key-client retention through the earn-out period',
      'Two parallel audit cycles managed with smooth financial reporting and compliance',
      'Full integration delivered within the one-year earn-out',
      'Six workstreams aligned to group standards and Kenyan requirements',
    ],
    qualitative: [
      'Kenya established as a fully integrated operational hub within the group',
      'Operational continuity and employee stability maintained throughout the change',
      'Stronger governance, reporting and alignment with group standards',
      'Systems, communication tools and reporting platforms migrated with client continuity intact',
    ],
    takeaway:
      'Integration succeeds when global standards and local law are treated as one design problem rather than two competing rulebooks, and every workstream has to satisfy both at once. People stay steady when they understand what is changing and why, and they need to hear it before the change reaches their desk.',
    conclusion:
      'The Kenya office entered the group as a newly acquired business and left the earn-out as a fully integrated operational hub. Its HR, finance, procurement and reporting ran on group standards while remaining compliant with Kenyan law, both audit cycles were met, and every key client stayed. That is the real test of an integration: the standards change around the operation, and the service its clients rely on does not.',
    tools: ['Slack', 'Google Workspace', 'Microsoft Office', 'Zoom'],
    competencies: ['Acquisition Due Diligence & Post-Merger Integration', 'Budget, Payroll & Compliance Governance', 'HR Infrastructure & Performance Systems'],
  },
  {
    slug: 'sale-due-diligence',
    title: 'Preparing the Company for Sale During the Pandemic',
    organisation: 'Ecom Services Ltd',
    role: 'General Manager',
    period: '2021',
    location: 'Nairobi, Kenya',
    scope: ['Due Diligence', 'Finance', 'Legal & Statutory', 'Change Communication'],
    summary:
      'In 2021 the original owners of Ecom Services Ltd negotiated the sale of the business to Social Discovery Group during the COVID-19 pandemic. My job as General Manager was to compile and submit the records the buyer required, including five years of audited accounts, employee records since inception and statutory compliance documentation, and to keep the team informed about job security, benefits and change. Four months of due diligence ended with the sale signed in August 2021, the records commended by stakeholders and zero employee attrition.',
    metrics: [
      { value: 5, label: 'Years of audited accounts prepared' },
      { value: 4, label: 'Months of due diligence' },
      { value: 0, label: 'Employee attrition during the sale' },
    ],
    context:
      'In 2021 the original owners of Ecom Services Ltd began negotiations to sell the business to a prospective buyer, Social Discovery Group. By then I had been General Manager since July 2012, and much of what the buyer was now assessing, from the HR function to the company’s first dedicated office, was work I had built. The sale required extensive due diligence across several years of financial, operational and employee records. It took place during the COVID-19 pandemic, after the March 2020 move to remote work, so the business was being examined in detail while it was still operating in a very different way from the one its records described.',
    challenge:
      'The buyer asked for documentation across the whole company, from shareholder and registration records to supplier contracts, asset schedules, leases and remuneration history. Every document had to be complete, consistent and ready when requested, while the business kept operating as normal. The people side was just as demanding. A sale creates uncertainty, and the pandemic had already supplied plenty of it. Employees had reasonable questions about job security, benefits and organisational change, and a team that loses confidence during due diligence can start to lose people, which weakens the very business being sold. The organisation had to stay stable and reassured until the agreement was signed.',
    approach: [
      {
        title: 'Compile the record',
        body: 'The financial and corporate record came first: five years of audited financial accounts, shareholder records and registration documentation, supplier contracts and asset schedules. I compiled and organised each set and submitted it as requested, so the buyer’s review could move at its own pace rather than wait on ours.',
      },
      {
        title: 'Open the people file',
        body: 'The people and legal record followed: employee records since the company’s inception, company structure and role definitions, remuneration history and bonus payment schedules, lease agreements and statutory compliance documentation. Because these records had been kept in order over the years, they could be prepared and submitted as requested rather than reconstructed under deadline.',
      },
      {
        title: 'Keep the team informed',
        body: 'Alongside the paperwork ran the conversation with employees. I managed internal communication on the acquisition process and addressed concerns about job security, benefits and organisational change. Transparency across teams and operational continuity were mine to maintain throughout the transaction period, and the operation kept serving its clients normally while the sale progressed.',
      },
    ],
    quantitative: [
      'Acquisition completed after a four-month due diligence, signed in August 2021',
      'Zero employee attrition during the process',
      'Five years of audited financial accounts prepared and submitted',
      '100% key-client retention through the earn-out period that followed',
    ],
    qualitative: [
      'Financial and employee records commended by stakeholders during due diligence',
      'Stable operations and employee morale through a period of uncertainty',
      'A smooth handover into post-acquisition integration and the one-year earn-out',
    ],
    takeaway:
      'Acquisition readiness is built in the years before a buyer arrives. Records kept accurately every month are what make due diligence fast and credible, and clear, honest communication with the team protects what those records prove: a business that is stable, compliant and worth buying.',
    conclusion:
      'The buyer received a complete, well-organised record across finance, legal, people and statutory compliance, and stakeholders commended its quality. The sale agreement was signed in August 2021 after four months of due diligence, no employee left during the process, and the business moved straight into a one-year earn-out with its key clients and its team in place. That stability became the starting point for the integration that followed.',
    tools: ['Microsoft Office', 'Google Workspace', 'Akira HRMS'],
    competencies: ['Acquisition Due Diligence & Post-Merger Integration', 'Budget, Payroll & Compliance Governance', 'Crisis Management & Business Continuity'],
  },
  {
    slug: 'pandemic-remote-transition',
    title: 'Taking a Round-the-Clock Operation Remote',
    organisation: 'Ecom Services Ltd',
    role: 'General Manager',
    period: 'From January 2020',
    location: 'Nairobi, Kenya',
    scope: ['Business Continuity', 'IT & Assets', 'Health & Safety', 'Facilities'],
    summary:
      'When COVID-19 reached Kenya in early 2020, 80 employees at Ecom Services Ltd were supporting international clients around the clock. My response started before the national lockdowns: health measures first, then equipment, training and asset controls for the whole company. Within three weeks every employee was working remotely, effective 23 March 2020. Service ran uninterrupted across two years of remote operations and no employee infections were recorded. With the office standing empty, I negotiated a 33.33% rent reduction.',
    metrics: [
      { value: 80, label: 'Employees remote within three weeks' },
      { value: 33.33, decimals: 2, suffix: '%', label: 'Rent reduction negotiated' },
      { value: 0, label: 'Employee infections recorded' },
    ],
    context:
      'In early 2020 the global COVID-19 pandemic reached an operation that never closed. Eighty employees at Ecom Services Ltd supported international clients around the clock, on a 24-hour service model built on shift teams working from the office. Restrictions were changing week by week, national lockdowns were approaching and limits on the workplace were tightening. The clients still needed the same service, whatever was happening in Kenya, and the team needed to know they would be safe. As General Manager, the decisions about how to protect both, and how quickly to act, were mine to make and to deliver.',
    challenge:
      'Three demands arrived at once. People had to be protected, the company had to comply with fast-changing restrictions, and a 24-hour service had to keep running without a break. Remote work could answer the first two only if the third survived the move. That meant every employee needed equipment, software, system access and training before the office closed, along with a way to account for every asset leaving the building. Once the team was remote, the empty office still carried its full rent. And the eventual return had to be planned as carefully as the departure, in line with government guidelines.',
    approach: [
      {
        title: 'Protect people early',
        body: 'Between January and March 2020, before the national lockdowns, I put sanitisation protocols and mandatory masking in place. Acting early gave the company time to protect people while it prepared properly for remote work, rather than reacting once restrictions arrived. No employee infections were recorded.',
      },
      {
        title: 'Equip the whole company',
        body: 'Preparation for remote work ran in parallel and covered the whole company. I ran the employee training and procured the laptops, then set up 85 laptops, 100 additional screens and 85 UPS units and configured all software and system access. Once the team was working remotely, power interruptions caused no service downtime, and the international clients kept their round-the-clock cover.',
      },
      {
        title: 'Control assets, cost and the return',
        body: 'Every item issued was tracked through an asset management process I built, with documentation, so accountability existed from the first day of remote work. While the office stood empty, I negotiated a 33.33% rent waiver. The return was planned with the same care, through compliance assessments and protocols aligned with government guidelines, including social distancing, sanitation and workspace adjustments.',
      },
    ],
    quantitative: [
      '100% of 80 employees transitioned to remote work, effective 23 March 2020',
      'Rent cut by 33.33%, from USD 12,546.94 to USD 8,364.63',
      'Uninterrupted service delivery across two years of remote operations',
      '85 laptops, 100 additional screens and 85 UPS units set up, with all system access configured',
    ],
    qualitative: [
      'Zero employee infections recorded',
      'Stronger asset management and IT readiness for remote work',
      'No service downtime from power interruptions as the team worked remotely',
      'A safe, compliant return to office aligned with government guidelines',
    ],
    takeaway:
      'Continuity is decided before the crisis arrives. Acting ahead of the lockdown gave us time to protect people, equip them properly and put controls around every asset, so the move to remote work ran as a planned operation rather than an emergency, and clients saw an uninterrupted service.',
    conclusion:
      'A round-the-clock international operation went remote in three weeks without a break in service, and stayed that way for two years. No employee infections were recorded, every asset issued was tracked, and the rent fell from USD 12,546.94 to USD 8,364.63 while the office was empty. The return to office was then handled with the same care as the departure, through compliance assessments and protocols aligned with government guidelines.',
    tools: ['Microsoft Teams', 'Zoom', 'Google Workspace', 'Microsoft Office'],
    competencies: ['Crisis Management & Business Continuity', 'Service Delivery & SLA Governance', 'Workplace Infrastructure & Vendor Governance'],
  },
  {
    slug: 'office-projects',
    title: 'Building the First Dedicated Office, Then Expanding It',
    organisation: 'Ecom Services Ltd',
    role: 'General Manager',
    period: '2016 and 2023',
    location: 'Nairobi, Kenya',
    scope: ['Vendor Governance', 'Facilities', 'ICT Infrastructure', 'Budget Control'],
    summary:
      'The operation outgrew its serviced office in 2016, then its own office again by 2023. Both projects were mine to lead: the company’s first dedicated office for 80 employees, delivered in three months for KES 10 million, and a KES 15 million expansion into the opposite wing that added 25 seats in two and a half months. No contract was awarded without comparing at least three quotations. Together the projects delivered KES 25 million of infrastructure, the first under budget and the second within it.',
    metrics: [
      { value: 25, prefix: 'KES ', suffix: 'M', label: 'Infrastructure delivered within budget' },
      { value: 3, label: 'Months to the first dedicated office' },
      { value: 25, label: 'Seats added in the expansion' },
    ],
    context:
      'By 2016 the serviced office model could no longer support the company’s expanding workforce and operational needs. The organisation needed its own dedicated office, with customised infrastructure, systems and workstations, and it needed the move to happen without disrupting a live operation. Seven years later the team had grown again. The existing office lacked enough workspace and meeting rooms for collaboration, operational teams and client-facing work. In both cases the workspace was reaching its limits, and as General Manager it was my responsibility to add capacity before space began to limit the business.',
    challenge:
      'Both projects ran to tight timeframes and set budgets, and both had to be delivered around an operation that could not stop. The 2016 project meant establishing a fully customised office end to end, including electrical installations and complete ICT infrastructure, then moving the whole team out of the serviced office without interruption. The 2023 project meant acquiring and renovating a second wing and integrating its networking with the existing server room. Every contract had to be competitive on price and accountable on quality, and no vendor could be appointed on familiarity alone, without being tested against the market.',
    approach: [
      {
        title: 'Govern the vendors',
        body: 'Vendor governance was the foundation of both projects. No contract was awarded until I had screened proposals and compared quotations from at least three vendors for that scope of work, which kept pricing competitive and quality accountable. Once contracts were signed, my role shifted to coordinating all stakeholders and personally supervising delivery against timeline, quality and budget, rather than leaving the build to the contractors.',
      },
      {
        title: 'Build the first office',
        body: 'The 2016 project was the organisation’s first fully customised office, and I led it end to end: interior works, furniture, electrical installations and complete ICT infrastructure. Delivered in three months and under budget, the KES 10 million project put workstations and operational systems in place for 80 employees, with an uninterrupted move from the serviced office.',
      },
      {
        title: 'Expand into the opposite wing',
        body: 'In 2023 the company took the wing opposite the existing office, and I led its acquisition and renovation. The KES 15 million project covered interior design, custom desk fabrication, a boardroom, soundproof meeting rooms, electrical installations, air conditioning and networking integrated with the existing server room. Completed in two and a half months and within budget, it added 25 seats.',
      },
    ],
    quantitative: [
      'KES 10M first office for 80 employees, delivered in three months',
      'KES 15M expansion completed in two and a half months',
      'KES 25M of infrastructure in total: the 2016 office under budget, the 2023 wing within budget',
      'Three vendors compared for every scope of work',
    ],
    qualitative: [
      'Workspace delivered ahead of headcount needs',
      'No disruption to the move from the serviced office',
      'Workstations and operational systems in place for the 2016 move',
      'Three soundproof board rooms that strengthened collaboration and client-facing work',
    ],
    takeaway:
      'Infrastructure projects stay on budget when vendor discipline starts before the contract is awarded. Three competing quotations for every scope of work set the price, and close supervision against timeline, quality and budget held it. The same discipline applies to any significant spend, whether it is an office build or an outsourced service.',
    conclusion:
      'Two builds, seven years apart, gave a growing operation the space it needed before headcount outran it. The first moved 80 employees out of a serviced office and into their own customised workspace in three months. The second added 25 seats, a boardroom and soundproof meeting rooms in two and a half. Across KES 25 million of spend, neither project overran its budget or disrupted the operation it was built to serve.',
    tools: ['Microsoft Office', 'Asana', 'Google Workspace'],
    competencies: ['Workplace Infrastructure & Vendor Governance', 'Budget, Payroll & Compliance Governance', 'Operating Model Design & Organisational Scaling'],
  },
  {
    slug: 'hr-function',
    title: 'Building the HR Function as the Operation Grew',
    organisation: 'Ecom Services Ltd',
    role: 'General Manager',
    period: '2012 – 2021',
    location: 'Nairobi, Kenya',
    scope: ['Policy', 'Performance', 'Talent', 'Digital HR'],
    summary:
      'As Ecom Services Ltd grew from 5 to more than 100 people, its people processes fell behind: undefined roles, no formal HR policies, annual reviews and mostly paper records. My answer was to build the HR function as one connected system, from job descriptions and the first Employee Handbook to quarterly appraisals, competency-based hiring, wellness benefits and the Akira HRMS, co-built with ICT. Akira cut HR administration and manual record-keeping by more than 75%, and the structure carried the operation through its growth.',
    metrics: [
      { value: 75, suffix: '%+', label: 'Less HR administration through Akira HRMS' },
      { value: 103, from: 5, label: 'People supported by the structure' },
      { value: 7, label: 'Wellness days a year introduced' },
    ],
    context:
      'Ecom Services Ltd grew from 5 to 103 people during my time as General Manager, and its people processes did not keep pace with the operation. Roles lacked defined responsibilities. There were no formal HR policies. Performance was reviewed only once a year, recruitment relied on basic screening and most records were kept on paper. With a handful of employees, those gaps were manageable. With a growing team working shifts for international clients, they began to affect accountability, compliance and the quality of every hiring decision, and the business needed a people function that could grow with it.',
    challenge:
      'Without structure, accountability, compliance and scaling all became difficult. Managers had little view of performance between annual reviews, hiring rested on inconsistent screening, and paper records made leave, sick days and reporting slow to administer. Whatever replaced the old processes had to pass two tests at once: the operation’s needs and Kenyan labour law. It also had to be built while the company kept hiring. My approach was to work with department leads, the ICT team and an external HR consultant, and to design the function as one system, with each part feeding the next, rather than a set of separate fixes.',
    approach: [
      {
        title: 'Role and policy foundations',
        body: 'The starting point was a job description for every role, which I wrote before creating the company’s first HR policy framework and Employee Handbook. To keep them current with Kenyan labour law, I set a biennial policy review with an external HR consultant. Grievance, disciplinary and conflict-management processes ran under my oversight with accurate records, so employee-relations issues were handled consistently and could stand up to scrutiny.',
      },
      {
        title: 'Performance and talent',
        body: 'Performance needed its own home, so I created a Quality & Performance Management function with PIP and PMP processes and standardised evaluation criteria. Annual reviews became quarterly appraisals, supported by monthly one-to-ones between managers and their teams that include development conversations. Hiring changed too: basic screening gave way to competency-based interviews and psychometric assessments, with consistent evaluation criteria agreed with hiring managers.',
      },
      {
        title: 'Workforce, experience and digital HR',
        body: 'On the workforce side, I designed team structures, reporting lines, departments and shift patterns, including the move to 24-hour coverage. The employee experience gained engagement programmes, training, coaching, seven wellness and mental health days a year and a mother’s room. With the ICT team, I co-built the Akira HRMS to automate leave, wellness-day and sick-leave administration and give managers one view of team records.',
      },
    ],
    quantitative: [
      'Administrative workload and manual record-keeping cut by more than 75%',
      'Reviews moved from annual to quarterly, with monthly one-to-ones',
      'Workforce planning that supported growth from 5 to over 100 employees',
      'Seven wellness and mental health days a year introduced',
    ],
    qualitative: [
      'The company’s first structured performance framework, HR policy and Employee Handbook',
      'Compliance with Kenyan labour law and structured employee-relations processes',
      'Managers with clearer visibility of performance and staffing',
      'Competency-based interviews and psychometric assessments in place of basic screening',
      'HR reporting on performance and staffing trends through Akira HRMS',
    ],
    takeaway:
      'HR scales when roles, performance, experience and data are designed together as one system, with each layer feeding the next. Clear roles make performance measurable, measurable performance makes hiring sharper, and good data makes the whole function lighter to run as headcount climbs.',
    conclusion:
      'A paper-based workplace with annual reviews and no formal policies became a structured, digital people function able to carry an operation of more than 100 people. Managers gained a clearer view of performance and staffing, the company met Kenyan labour regulations with structured employee-relations processes, and its employee records were later commended by stakeholders during the buyer’s due diligence in 2021.',
    tools: ['Akira HRMS', 'Microsoft Office', 'Power BI', 'Google Workspace'],
    competencies: ['HR Infrastructure & Performance Systems', 'Operating Model Design & Organisational Scaling', 'Budget, Payroll & Compliance Governance'],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}
