import { cta } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { CtaBand } from '../shared/CtaBand.tsx';

/** Closing band, worded for recruiters and clients alike. */
export function ClosingCta() {
  return (
    <CtaBand
      eyebrow="Start a conversation"
      title="Leadership for the operation you are building."
      body="Whether you are appointing a General Manager or Head of Operations, or need structure built inside your organisation, a consultation is the place to start."
      actions={
        <>
          <Button href={cta.consult.href}>{cta.consult.label}</Button>
          <Button href={cta.services.href} variant="outline-light">
            {cta.services.label}
          </Button>
        </>
      }
    />
  );
}
