import type { Metadata } from 'next';
import { privacy } from '../../content/legal.ts';
import { LegalPage } from '../../components/legal/LegalPage.tsx';

export const metadata: Metadata = {
  title: privacy.metaTitle,
  description: privacy.description,
  alternates: { canonical: '/privacy-policy' },
  openGraph: { title: privacy.metaTitle, description: privacy.description, url: '/privacy-policy' },
};

export default function Page() {
  return <LegalPage doc={privacy} />;
}
