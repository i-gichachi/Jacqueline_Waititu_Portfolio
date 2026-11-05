import { aboutBridge, cta } from '../../content/site.ts';
import { Button } from '../ui/Button.tsx';
import { Reveal } from '../motion/Reveal.tsx';

/** Short introduction that bridges to the Leadership page. */
export function AboutBridge() {
  const [lead, ...paras] = aboutBridge.paragraphs;
  return (
    <section className="section bg-stone" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-4">{aboutBridge.eyebrow}</p>
            <h2 id="about-title" className="text-h2">
              {aboutBridge.heading}
            </h2>
            <div className="mt-7 hidden lg:block">
              <Button href={cta.leadership.href} variant="secondary">{cta.leadership.label}</Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:pt-10">
            <p className="text-lead text-text">{lead}</p>
            {paras.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-muted">
                {p}
              </p>
            ))}
            <div className="mt-7 lg:hidden">
              <Button href={cta.leadership.href} variant="secondary">{cta.leadership.label}</Button>
            </div>
          </Reveal>
        </div>

        <dl className="mt-10 grid grid-cols-2 border-t border-line-strong lg:mt-14 lg:grid-cols-4">
          {aboutBridge.facts.map((f, i) => (
            <Reveal
              key={f.label}
              delay={i * 90}
              className={`flex flex-col gap-1.5 py-5 lg:py-6 ${i % 2 ? 'border-l border-line pl-4 lg:pl-6' : 'pr-4'} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
            >
              <dt className="text-[0.72rem] font-semibold tracking-[0.14em] text-muted uppercase">{f.label}</dt>
              <dd className="font-display text-[1.1rem] leading-snug sm:text-[1.3rem]">{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
