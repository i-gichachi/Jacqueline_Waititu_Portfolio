import type { Metadata } from 'next';
import { ConnectIntro } from '../../components/connect/ConnectIntro.tsx';
import { Booking } from '../../components/connect/Booking.tsx';
import { NextSteps } from '../../components/connect/NextSteps.tsx';

const description =
  'Book a consultation with Jacqueline Waititu, General Manager and Operations Leader, about senior operations roles or advisory work. Email, phone, LinkedIn and CV.';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description,
  alternates: { canonical: '/connect' },
  openGraph: { title: 'Book a Consultation | Jacqueline Waititu', description, url: '/connect' },
};

export default function ConnectPage() {
  return (
    <>
      <ConnectIntro />
      <Booking />
      <NextSteps />
    </>
  );
}
