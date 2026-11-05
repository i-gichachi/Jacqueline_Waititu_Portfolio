import type { Metadata } from 'next';
import { cases } from '../../content/cases.ts';
import { SectionHeading } from '../../components/ui/SectionHeading.tsx';
import { CaseList } from '../../components/track-record/CaseList.tsx';

const description =
  'Case studies in operations leadership: integrating an acquired office, preparing a business for sale, taking a 24-hour operation remote, building two offices and an HR function.';

export const metadata: Metadata = {
  title: 'Case Studies in Operations Leadership',
  description,
  alternates: { canonical: '/track-record' },
  openGraph: { title: 'Case Studies in Operations Leadership', description, url: '/track-record' },
};

export default function TrackRecordPage() {
  return (
    <section className="pt-24 pb-14 sm:pb-16 lg:pt-28 lg:pb-24">
      <div className="container-x">
        <SectionHeading
          as="h1"
          eyebrow="Track Record"
          title="Operations led through growth, sale and change"
        />
        <h2 className="sr-only">Case studies</h2>
        <CaseList cases={cases} />
      </div>
    </section>
  );
}
