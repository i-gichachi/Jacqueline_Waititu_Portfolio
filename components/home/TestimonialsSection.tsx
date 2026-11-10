import { testimonials } from '../../content/career.ts';
import { SectionHeading } from '../ui/SectionHeading.tsx';
import { Testimonials } from '../shared/Testimonials.tsx';

/** Testimonials on ink. The component handles one entry (feature quote) or many (cards, slider on phones). */
export function TestimonialsSection() {
  return (
    <section className="on-ink bg-ink text-on-ink" aria-labelledby="testimonials-title">
      <div className="container-x section">
        <SectionHeading
          eyebrow="Testimonials"
          title={<span id="testimonials-title">In the words of those who know my work</span>}
        />
        <div className="mt-10 lg:mt-12">
          <Testimonials items={testimonials} />
        </div>
      </div>
    </section>
  );
}
