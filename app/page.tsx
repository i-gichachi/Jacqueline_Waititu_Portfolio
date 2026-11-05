import type { Metadata } from 'next';
import { site } from '../content/site.ts';
import { Hero } from '../components/home/Hero.tsx';
import { Metrics } from '../components/home/Metrics.tsx';
import { Trust } from '../components/home/Trust.tsx';
import { AboutBridge } from '../components/home/AboutBridge.tsx';
import { Competencies } from '../components/home/Competencies.tsx';
import { CaseStudies } from '../components/home/CaseStudies.tsx';
import { TestimonialsSection } from '../components/home/TestimonialsSection.tsx';
import { Services } from '../components/home/Services.tsx';
import { ClosingCta } from '../components/home/ClosingCta.tsx';

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { title, description: site.description, url: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Trust />
      <AboutBridge />
      <Competencies />
      <CaseStudies />
      <TestimonialsSection />
      <Services />
      <ClosingCta />
    </>
  );
}
