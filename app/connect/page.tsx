import type { Metadata } from 'next';
import { ConnectIntro } from '../../components/connect/ConnectIntro.tsx';
import { Booking } from '../../components/connect/Booking.tsx';
import { NextSteps } from '../../components/connect/NextSteps.tsx';
import { hasBookingLink } from '../../content/site.ts';

const description = `Book a consultation with me about senior operations roles or advisory work. ${
  hasBookingLink ? 'Calendly booking, email' : 'Email'
}, phone, LinkedIn and my CV.`;

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
