/*
  Privacy Policy and Terms of Use, ported from site-inputs/content/privacy-policy.md and terms.md.
  Plain-English text for review by someone qualified in the Kenya Data Protection Act 2019 and the GDPR.
  Inline links use [label](href). UK English, no em dashes.
*/

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

const email = 'waititujacque@gmail.com';

export const privacy: LegalDoc = {
  eyebrow: 'Privacy and cookies',
  title: 'Privacy Policy',
  intro:
    'What this site collects, why, who else handles it and how to ask for your information. The short version: very little, and nothing optional without your say.',
  metaTitle: 'Privacy Policy',
  description:
    'How Jacqueline Waititu’s site handles personal information: cookie choices, the Calendly booking calendar, CV downloads and email, and how to make a privacy request.',
  updated: '5 November 2026',
  sections: [
    {
      id: 'who-is-responsible',
      title: 'Who is responsible',
      blocks: [
        'I am Jacqueline Waititu and this is my personal website. Under the Kenya Data Protection Act 2019 I am the data controller for the personal information it collects, which means I decide why it is collected and what happens to it.',
        `You can reach me about anything in this policy at [${email}](mailto:${email}).`,
        'The site has no contact form, no newsletter, no user accounts and no advertising.',
      ],
    },
    {
      id: 'what-is-collected',
      title: 'What the site collects',
      blocks: [
        'Depending on what you do on the site, the following may be collected:',
        {
          list: [
            'Your cookie choice, stored in your own browser so the banner does not ask on every page.',
            'Basic request logs kept by my hosting provider: your IP address, the page you asked for, the time and your browser type.',
            'Your name, email address and any notes you add, if you book a consultation through the Calendly calendar.',
            'Whatever you choose to include in an email you send me.',
          ],
        },
        'The site runs no analytics and no advertising trackers. Its fonts are served from the site itself, so no font provider sees your visit.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and your choices',
      blocks: [
        'On your first visit a banner offers two choices with equal weight. Nothing is preselected.',
        {
          list: [
            'Essential only: the site stores your choice in your browser and nothing else. Third-party content that sets its own cookies, such as the booking calendar, stays switched off.',
            'Accept all: as well as storing your choice, the site may load third-party content that sets its own cookies. At present that is only the Calendly booking calendar on the [Connect](/connect) page.',
          ],
        },
        'The site sets no tracking cookies of its own. Your choice is kept in your browser’s local storage until you change it or clear your browser data.',
        'You can change your mind at any time through Cookie Settings in the footer, which opens the banner again.',
      ],
    },
    {
      id: 'booking',
      title: 'Booking a consultation',
      blocks: [
        'Consultations are booked through Calendly, embedded on the [Connect](/connect) page. The calendar loads only if you have chosen Accept all, or when you ask the page to load it. Until then, nothing is sent to Calendly.',
        'Once the calendar loads, Calendly sets its own cookies and asks for your name, your email address and any notes you add about the call. Calendly handles that information under its own privacy policy and passes the booking details to me so that I can prepare for and hold the call.',
        'The lawful basis is your consent to load the calendar and, for the booking itself, the steps you ask me to take before any engagement.',
      ],
    },
    {
      id: 'cv-download',
      title: 'Downloading my CV',
      blocks: [
        'My CV is a PDF file you can download from several pages. You do not need to give any details to download it, and I am not told who downloaded it.',
        'The download is an ordinary request to the site, so it appears in the hosting provider’s request logs like any other page.',
      ],
    },
    {
      id: 'email',
      title: 'Contacting me by email',
      blocks: [
        `To get in touch, you write to me at [${email}](mailto:${email}) from your own email account. I receive what you send and use it to reply and to continue the conversation you started.`,
        'I do not add you to any mailing list and I do not share your email with anyone else, other than the email provider that holds my inbox.',
        'The lawful basis is my legitimate interest in replying to messages sent to me, and the steps you ask me to take before any engagement.',
      ],
    },
    {
      id: 'who-else',
      title: 'Who else handles it',
      blocks: [
        'A small number of service providers handle personal information on my behalf or as part of the service they offer:',
        {
          list: [
            'My hosting provider, which serves the site and keeps its request logs to keep it running and secure.',
            'Calendly, which runs the booking calendar once you load it.',
            'Google, which provides my email account and holds the emails you send.',
          ],
        },
        'Some of these providers store information outside Kenya. Where they do, they rely on safeguards recognised by the Kenya Data Protection Act 2019 and the GDPR.',
      ],
    },
    {
      id: 'retention',
      title: 'How long it is kept',
      blocks: [
        'I keep emails and booking details only for as long as the conversation, or any engagement that follows it, needs them. Hosting logs are kept by the provider for a limited period and then deleted. Your cookie choice stays in your browser until you change it or clear it.',
        'You can ask me to delete your information at any time.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      blocks: [
        'The Kenya Data Protection Act 2019 gives you rights over your information. So does the UK GDPR if you are in the United Kingdom, and the EU GDPR if you are in the European Union. You can ask me to:',
        {
          list: [
            'Tell you what I hold about you and send you a copy.',
            'Correct anything that is wrong or out of date.',
            'Delete it.',
            'Stop using it, or limit how I use it.',
            'Withdraw your consent to third-party cookies, which Cookie Settings also does.',
          ],
        },
        'Some rights have limits in law. If I cannot do all of what you ask, I will tell you why.',
      ],
    },
    {
      id: 'make-a-request',
      title: 'How to make a request',
      blocks: [
        `Email me at [${email}](mailto:${email}?subject=Privacy%20request) with “Privacy request” as the subject. Say what you would like done and give the name or email address you used, so that I can find your information. If I need to confirm it is you, I will ask for no more than that takes.`,
      ],
    },
    {
      id: 'complaints',
      title: 'If you are not satisfied',
      blocks: [
        'In Kenya you can complain to the Office of the Data Protection Commissioner ([odpc.go.ke](https://www.odpc.go.ke)). In the United Kingdom it is the Information Commissioner’s Office ([ico.org.uk](https://ico.org.uk)); in the European Union, the data protection authority in your country.',
        'Writing to me first gives me the chance to put things right.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      blocks: [
        'If the site starts collecting anything new, this page changes before that feature goes live, and the Last updated date at the top changes with it.',
      ],
    },
  ],
};

export const terms: LegalDoc = {
  eyebrow: 'Terms of use',
  title: 'Terms of Use',
  intro:
    'The terms for using this site: what its content is and is not, how you may reuse it and which law applies.',
  metaTitle: 'Terms of Use',
  description:
    'The terms for using Jacqueline Waititu’s site: what its content is and is not, how case studies and testimonials may be quoted, third-party services and how to get in touch.',
  updated: '5 November 2026',
  sections: [
    {
      id: 'about-this-site',
      title: 'About this site',
      blocks: [
        'I am Jacqueline Waititu, and this is my personal website. These terms cover your use of it. By using the site you accept them; if you do not, please do not use it.',
        'The site has no contact form, no user accounts and no payments.',
      ],
    },
    {
      id: 'not-advice',
      title: 'Nothing here is professional advice',
      blocks: [
        'The site sets out my career, my capabilities and the advisory services I offer. It is not professional advice for your organisation. Before you act on anything here, take advice that fits your circumstances.',
        'Reading the site, downloading my CV or booking a consultation does not by itself create an engagement between us. Any engagement is agreed separately, in writing.',
      ],
    },
    {
      id: 'case-studies-and-testimonials',
      title: 'Case studies and testimonials',
      blocks: [
        'The case studies describe my own work and the results of the operations I led. If you would like a reference for any of them, email me.',
        'Testimonials are shown in their authors’ own words and credited to them. The views in them are theirs.',
        'Naming an organisation I have worked for does not mean that it endorses this site.',
      ],
    },
    {
      id: 'using-the-content',
      title: 'Using the content',
      blocks: [
        'The words on this site are mine unless they are credited to someone else. You may quote a short passage with credit and a link to the page it came from. For anything longer, ask me first.',
        'Quote a testimonial word for word with its author’s credit, or not at all.',
        'You may download my CV for your own reference. Please do not republish it or pass it on outside your organisation without asking me.',
      ],
    },
    {
      id: 'third-parties',
      title: 'Third-party services and links',
      blocks: [
        'Consultations are booked through Calendly on the [Connect](/connect) page. Calendly runs on its own terms and privacy policy, and its calendar loads only with your agreement, as the [Privacy Policy](/privacy-policy) explains.',
        'The site links to my LinkedIn profile and to a few other sites I do not run. Each runs on its own terms, and I am not responsible for their content.',
        'The [Privacy Policy](/privacy-policy) covers what the site collects, your cookie choices and what happens to what you send me.',
      ],
    },
    {
      id: 'availability-and-liability',
      title: 'Availability and liability',
      blocks: [
        'The site is offered as it is, with no promise that every page is complete and current or that the site is always available.',
        'As far as the law allows, I am not liable for any loss that comes from relying on the site or from it being unavailable. Nothing in these terms limits any liability that the law does not allow to be limited.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      blocks: [
        'These terms are governed by the law of Kenya, and the courts of Kenya decide any dispute about them. If you visit from another country, you may keep rights under the law where you live.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      blocks: [
        'If I change these terms, this page shows the new version with a new Last updated date. The version on this page when you use the site is the one that applies.',
      ],
    },
    {
      id: 'contact',
      title: 'Questions about these terms',
      blocks: [
        `Email [${email}](mailto:${email}?subject=Question%20about%20the%20terms) with “Question about the terms” as the subject, or call [+254 723 934 829](tel:+254723934829).`,
      ],
    },
  ],
};
