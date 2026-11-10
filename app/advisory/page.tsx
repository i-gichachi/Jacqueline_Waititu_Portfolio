import type { Metadata } from 'next';
import { engagementNotes, faqs, process, services } from '../../content/services.ts';
import { SectionHeading } from '../../components/ui/SectionHeading.tsx';
import { Icon, IconTile } from '../../components/ui/Icon.tsx';
import { Reveal } from '../../components/motion/Reveal.tsx';
import { ConnectedSteps } from '../../components/case/ConnectedSteps.tsx';
import { ServiceCard } from '../../components/advisory/ServiceCard.tsx';
import { FaqAccordion } from '../../components/advisory/FaqAccordion.tsx';

const description =
  'Operations advisory for founder-led and fast-growing organisations: operating model design, AI and workflow automation, M&A due diligence and integration, SLA governance, HR systems and cost review.';

export const metadata: Metadata = {
  title: 'Operations Advisory Services',
  description,
  alternates: { canonical: '/advisory' },
  openGraph: { title: 'Operations Advisory Services', description, url: '/advisory' },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function AdvisoryPage() {
  return (
    <>
      {/* Opening section: who the advisory work is for, and how engagements are set up. */}
      <section className="pt-24 pb-14 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Advisory"
            title="Operational structure for organisations that are growing or changing"
          />
          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {engagementNotes.map((n, i) => (
              <Reveal as="li" key={n.title} delay={i * 100} className="h-full">
                <div className="card flex h-full gap-4 p-5 sm:p-6">
                  <IconTile name={n.icon} tone={i === 1 ? 'brick' : 'olive'} />
                  <div className="min-w-0">
                    <h2 className="font-sans text-body-sm font-semibold">{n.title}</h2>
                    <p className="mt-1 text-body-sm text-muted">{n.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services. */}
      <section className="section bg-stone" aria-label="Services">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title="Six services, each grounded in delivered work"
          />
          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} s={s} delay={(i % 2) * 110} />
            ))}
          </div>
        </div>
      </section>

      {/* How an engagement runs. */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Process"
            title="How an engagement runs"
          />
          <div className="mt-10 lg:mt-14">
            <ConnectedSteps steps={process.map((p) => ({ icon: <Icon name={p.icon} className="size-5" />, title: p.title, body: p.body }))} />
          </div>
        </div>
      </section>

      {/* FAQs. */}
      <section className="section border-t border-line bg-stone">
        <div className="container-x">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions before we begin"
          />
          <div className="mt-10 lg:mt-14">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
