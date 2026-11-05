import type { Metadata } from 'next';
import { cta } from '../content/site.ts';
import { StatusPanel } from '../components/legal/StatusPanel.tsx';
import { Button } from '../components/ui/Button.tsx';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This address has no page on my site. My case studies are on the Track Record page.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StatusPanel
      code="404"
      eyebrow="Page not found"
      title="This page is not on the site"
      body="The link may be out of date, or the address mistyped. Every case study is on the Track Record page, or start again from the home page."
      actions={
        <>
          <Button href={cta.cases.href}>{cta.cases.label}</Button>
          <Button href="/" variant="secondary" icon="none">
            Back to home
          </Button>
        </>
      }
    />
  );
}
