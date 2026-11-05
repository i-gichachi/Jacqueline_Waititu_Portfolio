import { testimonials } from '../../content/career.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Testimonials } from '../shared/Testimonials.tsx';

/** Testimonials on ink. The component handles one or many entries. */
export function TestimonialsSection() {
  return (
    <section className="on-ink relative overflow-hidden bg-ink-2 text-on-ink" aria-labelledby="testimonials-title">
      <div className="container-x section relative">
        <SectionHeading
          tone="ink"
          eyebrow="Testimonials"
          title={<span id="testimonials-title">In the words of those who know my work</span>}
        />
        <Reveal delay={120} className="mt-10 border-t border-line-ink pt-10 lg:mt-12 lg:pt-12">
          <Testimonials items={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
