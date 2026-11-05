import type { Metadata } from 'next';
import { terms } from '../../content/legal.ts';
import { LegalPage } from '../../components/legal/LegalPage.tsx';

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.description,
  alternates: { canonical: '/terms' },
  openGraph: { title: terms.metaTitle, description: terms.description, url: '/terms' },
};

export default function Page() {
  return <LegalPage doc={terms} />;
}
