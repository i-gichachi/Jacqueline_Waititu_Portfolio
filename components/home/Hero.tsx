import type { CSSProperties } from 'react';
import { cta, site } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { Portrait } from '../shared/Portrait.tsx';

/* Staggered entrance in pure CSS, so the hero never waits for JavaScript. Reduced motion is handled in globals.css. */
const rise = 'animate-[heroRise_0.9s_var(--ease-out-expo)_both] [animation-delay:var(--d)]';
const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Home hero on ink: portrait, name as the H1, role, positioning line and the two main actions. */
export function Hero() {
  const [first, ...rest] = site.name.split(' ');
  return (
    <section className="on-ink relative overflow-hidden bg-ink text-on-ink" aria-labelledby="hero-name">
      <div className="container-x relative grid gap-9 pt-24 pb-14 sm:pb-16 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-36 lg:pb-24">
        <div className={`w-[70%] max-w-80 pt-3 sm:max-w-88 lg:order-last lg:col-span-5 lg:w-full lg:max-w-none lg:pl-8 ${rise}`} style={d(0)}>
          <Portrait priority />
        </div>

        <div className="min-w-0 lg:col-span-7">
          <h1 id="hero-name" className={`text-display ${rise}`} style={d(120)}>
            <span className="block">{first}</span>
            <span className="block">{rest.join(' ')}</span>
          </h1>
          <div className="mt-6 lg:mt-8">
            <div aria-hidden="true" className="h-px w-24 origin-left animate-[heroDraw_1.1s_var(--ease-out-expo)_0.5s_both] bg-brick-light" />
            <p className={`mt-5 font-display text-[1.45rem] leading-tight sm:text-[1.8rem] lg:text-[2.15rem] ${rise}`} style={d(260)}>
              {site.role}
            </p>
          </div>
          <p className={`mt-4 max-w-152 text-lead text-on-ink-muted ${rise}`} style={d(380)}>
            18+ years building, scaling and integrating operations across BPO, online platforms and trust and safety, from a
            five-person start-up to a 103-person business acquired by Social Discovery Group.
          </p>
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${rise}`} style={d(500)}>
            <Button href={cta.consult.href}>{cta.consult.label}</Button>
            <Button href={cta.cases.href} variant="outline-light">
              {cta.cases.label}
            </Button>
          </div>
        </div>
      </div>
      <style>{`@keyframes heroRise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@keyframes heroDraw{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
