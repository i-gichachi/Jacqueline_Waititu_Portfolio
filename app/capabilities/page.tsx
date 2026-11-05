import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import { pillars } from '../../content/competencies.ts';
import { Languages } from '../../components/capabilities/Languages.tsx';
import { PillarSection } from '../../components/capabilities/PillarSection.tsx';
import { Tools } from '../../components/capabilities/Tools.tsx';
import { Reveal } from '../../components/motion/Reveal.tsx';
import { SectionHeading } from '../../components/ui/SectionHeading.tsx';

const description =
  'Jacqueline Waititu’s operations capabilities in three pillars, Build and Scale, Transform and Integrate, Govern and Protect, each with her method and a result from her record.';

export const metadata: Metadata = {
  title: 'Operations Capabilities',
  description,
  alternates: { canonical: '/capabilities' },
  openGraph: { title: 'Operations Capabilities', description, url: '/capabilities' },
};

export default function CapabilitiesPage() {
  return (
    <>
      <section className="border-b border-line pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Capabilities"
            title="What it takes to run a country operation"
          />
          <Reveal delay={120} className="mt-8 lg:mt-10">
            <nav aria-label="Capability pillars" className="grid gap-3 sm:grid-cols-3">
              {pillars.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="group flex min-h-14 items-center justify-between gap-4 rounded-xl border border-line-strong bg-surface px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brick hover:shadow-(--shadow-card)"
                >
                  <span>
                    <span className="block font-display text-lg leading-tight">{p.title}</span>
                    <span className="mt-1 block text-sm text-muted">{p.summary}</span>
                  </span>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive transition-transform duration-300 group-hover:translate-y-0.5">
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {pillars.map((p, i) => (
        <PillarSection key={p.id} pillar={p} tone={i % 2 === 0 ? 'paper' : 'stone'} />
      ))}

      <Tools />

      <Languages />
    </>
  );
}
