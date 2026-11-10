import { CheckCircle2 } from 'lucide-react';
import { cta, hasBookingLink, site } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';

const topics = [
  'General Manager and Head of Operations roles',
  'Leading an operation through growth or change',
  'Operating model design and scaling',
  'Due diligence and post-acquisition integration',
  'Service delivery, SLAs and trust and safety',
  'HR, budget and governance reviews',
] as const;

const label = 'text-label font-semibold tracking-[0.14em] text-muted uppercase';
const value = 'font-semibold text-h4 text-text [overflow-wrap:anywhere] link-underline hover:text-olive';

/**
 * First section of /connect: one statement H1, then the contact routes as three plain text columns
 * (email and phone, LinkedIn, CV), then what a conversation can cover. While the Calendly link is the
 * placeholder, email and phone are the booking route and there is no booking button.
 */
export function ConnectIntro() {
  return (
    <section className="bg-paper pt-24 pb-14 sm:pb-16 lg:pt-28 lg:pb-20" aria-labelledby="connect-title">
      <div className="container-x">
        <p className="eyebrow mb-4">Connect</p>
        <h1 id="connect-title" className="max-w-5xl text-h1">
          Book a consultation with me about a General Manager or Head of Operations role, or about the structure your organisation needs.
        </h1>

        <ul className="mt-10 grid gap-8 border-t border-line-strong pt-8 md:grid-cols-3 md:gap-10 lg:mt-14" aria-label="Contact details">
          <li className="flex flex-col gap-2">
            <p className={label}>{hasBookingLink ? 'Email and phone' : 'Book by email or phone'}</p>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent('Consultation request')}`} className={`${value} inline-flex min-h-11 items-center self-start`}>
              {site.email}
            </a>
            <a href={site.phoneHref} className={`${value} inline-flex min-h-11 items-center self-start`}>
              {site.phone}
            </a>
            <p className="mt-1 text-small text-muted">{site.responseTime}</p>
          </li>
          <li className="flex flex-col gap-2">
            <p className={label}>LinkedIn</p>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`${value} inline-flex min-h-11 items-center self-start`}>
              {site.linkedinLabel}
            </a>
            <p className="mt-1 text-small text-muted">{site.location}</p>
          </li>
          <li className="flex flex-col gap-2">
            <p className={label}>CV</p>
            <a href={site.cv} download className={`${value} inline-flex min-h-11 items-center self-start`}>
              {cta.cv.label}
            </a>
          </li>
        </ul>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-h3 lg:col-span-4">What a conversation can cover</h2>
          <div className="lg:col-span-8">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t} className="flex items-start gap-3 py-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-[1.1rem] shrink-0 text-olive" strokeWidth={1.75} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            {hasBookingLink && (
              <div className="mt-8">
                <Button href="#booking">{cta.consult.label}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
