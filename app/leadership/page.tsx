import type { Metadata } from 'next';
import { leadershipPrinciples, testimonials } from '../../content/career.ts';
import { cta, site } from '../../content/site.ts';
import { CareerArc } from '../../components/leadership/CareerArc.tsx';
import { CareerTimeline } from '../../components/leadership/CareerTimeline.tsx';
import { Credentials } from '../../components/leadership/Credentials.tsx';
import { Reveal } from '../../components/motion/Reveal.tsx';
import { CtaBand } from '../../components/shared/CtaBand.tsx';
import { Testimonials } from '../../components/shared/Testimonials.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { IconTile } from '../../components/ui/Icon.tsx';
import { SectionHeading } from '../../components/ui/SectionHeading.tsx';

const description =
  'My career, from customer service in 2008 to General Manager of a Kenya operation I led from start-up through a sale and integration, with my education and certifications.';

export const metadata: Metadata = {
  title: 'Leadership and Career',
  description,
  alternates: { canonical: '/leadership' },
  openGraph: { title: 'Leadership and Career', description, url: '/leadership' },
};

export default function LeadershipPage() {
  return (
    <>
      <section className="section pt-24 lg:pt-28">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Leadership"
            title="From the service floor to General Manager"
          />
          <div className="mt-8 lg:mt-12">
            <CareerArc />
          </div>
          <div className="mt-8 lg:mt-10">
            <h2 className="flex items-center gap-4 font-sans text-xs font-semibold tracking-[0.16em] text-muted uppercase after:h-px after:flex-1 after:bg-line">
              How I lead
            </h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3 lg:gap-6">
              {leadershipPrinciples.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 120} className="card card-hover flex h-full flex-col p-6 lg:p-7">
                  <IconTile name={p.icon} tone="brick" />
                  <h3 className="mt-5 text-h3">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CareerTimeline />

      <Credentials />

      <section id="testimonial" aria-labelledby="testimonials-title" className="on-ink relative overflow-hidden bg-ink-2 text-on-ink">
        <div className="container-x section relative">
          <SectionHeading
            tone="ink"
            eyebrow="Testimonials"
            title={<span id="testimonials-title">In the words of the people I have worked with</span>}
          />
          <div className="mt-10 lg:mt-14">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="See the full record, or start a conversation"
        body="The CV sets out every role and result in one document. A consultation is the quickest way to talk through your operation."
        actions={
          <>
            <Button href={site.cv} download icon="download">
              {cta.cv.label}
            </Button>
            <Button href={cta.consult.href} variant="outline-light">
              {cta.consult.label}
            </Button>
          </>
        }
      />
    </>
  );
}
