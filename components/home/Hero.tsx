import type { CSSProperties } from 'react';
import { cta, site } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { Portrait } from '../shared/Portrait.tsx';

/*
  Entrance in pure CSS, so the hero never waits for JavaScript. It moves, it never fades: the name, role and
  actions are readable on the very first paint. Reduced motion is handled in globals.css.
*/
const rise = 'animate-[heroRise_0.8s_var(--ease-out-expo)_both] [animation-delay:var(--d)]';
const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/**
 * Home hero on ink. Phones: a 4:5 portrait directly under the navbar, then name and role, then the two actions,
 * all inside one screen at 390 x 844. From lg: text left, portrait right.
 */
export function Hero() {
  const [first, ...rest] = site.name.split(' ');
  return (
    <section className="on-ink bg-ink text-on-ink" aria-labelledby="hero-name">
      <div className="container-x grid gap-7 pt-[5.25rem] pb-8 sm:pb-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-28 lg:pb-12">
        <div className="min-w-0 lg:col-span-7">
          <h1 id="hero-name" className={`text-display ${rise}`} style={d(0)}>
            <span className="block">{first}</span>
            <span className="block">{rest.join(' ')}</span>
          </h1>
          <div className="mt-4 lg:mt-8">
            <div aria-hidden="true" className="h-px w-24 origin-left animate-[heroDraw_1.1s_var(--ease-out-expo)_0.4s_both] bg-brick-light" />
            <p className={`mt-4 font-display text-h3 text-balance lg:mt-5 lg:text-h2 ${rise}`} style={d(80)}>
              {site.role}
            </p>
          </div>
          <p className={`mt-3 text-lead text-on-ink-muted lg:mt-4 ${rise}`} style={d(160)}>
            18+ years building, scaling and integrating operations across BPO, online platforms and trust and safety, from a
            five-person start-up to a 103-person business acquired by Social Discovery Group.
          </p>
          <div className={`mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8 ${rise}`} style={d(240)}>
            <Button href={cta.consult.href}>{cta.consult.label}</Button>
            <Button href={cta.cases.href} variant="outline-light">
              {cta.cases.label}
            </Button>
          </div>
        </div>

        <div className={`order-first w-full max-w-[13rem] lg:order-none lg:col-span-5 lg:max-w-none lg:pl-8 ${rise}`} style={d(120)}>
          <Portrait priority />
        </div>
      </div>
      <style>{`@keyframes heroRise{from{transform:translateY(12px)}to{transform:none}}@keyframes heroDraw{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
