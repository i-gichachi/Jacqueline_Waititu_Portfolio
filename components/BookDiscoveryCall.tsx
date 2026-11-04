/*
  Book a discovery call. Until the Calendly link arrives (Q22), every instance opens the advisory email
  with the advisory-email-subject microcopy; the booking gate (Load the booking calendar) is not built
  and Calendly never loads. When Q22 ships, the route builder replaces this with the click-gated embed.

  CALENDLY RULE (Ian, R7-T3, 4 November 2026): the embed must NOT enable payment collection. The site has
  no accounts and takes no payments, on the site or through Calendly; keep Calendly's payment feature off
  on her event type and load no payment step in the embed. Calendly loads only after the visitor clicks
  "Load the booking calendar" (booking-gate-button), never on page load.
*/

import { ships } from '../lib/gates.ts';
import { microcopy } from '../lib/content.ts';
import { bookingHref } from '../lib/site.ts';
import { ButtonLink } from './Button.tsx';

export function BookDiscoveryCall({
  label = microcopy('footer-booking'),
  variant = 'secondary',
  block = false,
}: {
  label?: string;
  variant?: 'primary' | 'secondary';
  block?: boolean;
}) {
  if (ships('Q22.calendly')) {
    throw new Error('Q22 shipped: build the click-gated Calendly booking gate (payment collection off, R7-T3) before using BookDiscoveryCall');
  }
  return (
    <ButtonLink href={bookingHref()} variant={variant} block={block}>
      {label}
    </ButtonLink>
  );
}
