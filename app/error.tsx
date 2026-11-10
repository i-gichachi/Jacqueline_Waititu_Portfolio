'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { cta } from '../content/site.ts';
import { StatusPanel } from '../components/legal/StatusPanel.tsx';
import { Button } from '../components/ui/Button.tsx';

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPanel
      code="500"
      eyebrow="Something went wrong"
      title="This page did not load as it should"
      body="It is a problem on the site’s side, not with anything you did. Try again, or carry on from the home page or the case studies."
      actions={
        <>
          <button
            type="button"
            onClick={() => retry()}
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-(--radius-btn) bg-olive px-5 py-2.5 text-small font-semibold text-on-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive-600 sm:px-6"
          >
            <RotateCcw className="size-4 transition-transform duration-500 group-hover:-rotate-90" aria-hidden="true" />
            Try again
          </button>
          <Button href="/" variant="secondary" icon="none">
            Back to home
          </Button>
          <Button href={cta.cases.href} variant="ghost">
            {cta.cases.label}
          </Button>
        </>
      }
    />
  );
}
