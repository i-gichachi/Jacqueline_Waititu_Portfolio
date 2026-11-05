import type { ReactNode } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { cta, site } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { LinkedInMark } from '../ui/LinkedInMark.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

const topics = [
  'General Manager and Head of Operations roles',
  'Leading an operation through growth or change',
  'Operating model design and scaling',
  'Due diligence and post-acquisition integration',
  'Service delivery, SLAs and trust and safety',
  'HR, budget and governance reviews',
] as const;

interface Row {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

const ico = 'size-[1.1rem]';
const rows: Row[] = [
  { icon: <Mail className={ico} aria-hidden="true" />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { icon: <Phone className={ico} aria-hidden="true" />, label: 'Phone', value: site.phone, href: site.phoneHref },
  { icon: <LinkedInMark className="size-4" />, label: 'LinkedIn', value: site.linkedinLabel, href: site.linkedin, external: true },
  { icon: <MapPin className={ico} aria-hidden="true" />, label: 'Location', value: site.location },
  { icon: <Clock className={ico} aria-hidden="true" />, label: 'Response time', value: site.responseTime },
];

/** First section of /connect: H1, inclusive intro, what a conversation can cover, contact details and the CV. */
export function ConnectIntro() {
  return (
    <section className="bg-paper pt-24 pb-14 sm:pb-16 lg:pt-28 lg:pb-20" aria-labelledby="connect-title">
      <div className="container-x">
        <SectionHeading
          as="h1"
          eyebrow="Connect"
          title={<span id="connect-title">Book a consultation</span>}
        />

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={80} className="flex flex-col lg:col-span-7">
            <h2 className="font-sans text-[0.95rem] font-semibold">What a conversation can cover</h2>
            <ul className="mt-4 grid gap-x-8 border-t border-line sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-line py-3.5 text-[0.95rem]">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-[1.1rem] shrink-0 text-olive" strokeWidth={1.75} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-auto lg:pt-8">
              <Button href="#booking">{cta.consult.label}</Button>
              <Button href={site.cv} variant="secondary" icon="download" download>
                {cta.cv.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={180} className="lg:col-span-5">
            <ul className="card divide-y divide-line overflow-hidden" aria-label="Contact details">
              {rows.map((r) => {
                const inner = (
                  <>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive transition-colors duration-300 group-hover:bg-brick group-hover:text-on-ink">
                      {r.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.7rem] font-semibold tracking-[0.14em] text-muted uppercase">{r.label}</span>
                      <span className="block font-semibold [overflow-wrap:anywhere] text-text">{r.value}</span>
                    </span>
                  </>
                );
                const cls = 'flex min-h-[4.5rem] items-center gap-4 px-5 py-3.5 sm:px-6';
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a
                        href={r.href}
                        className={`group ${cls} transition-colors duration-300 hover:bg-paper`}
                        {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
