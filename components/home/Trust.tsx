import { organisations, sectors } from '../../content/site.ts';
import { IconTile } from '../ui/Icon.tsx';
import { Reveal } from '../motion/Reveal.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

/** Sectors served and the organisations behind them, straight after the metrics. */
export function Trust() {
  return (
    <section className="section bg-paper" aria-labelledby="trust-title">
      <div className="container-x">
        <SectionHeading
          eyebrow="Sectors and organisations"
          title={<span id="trust-title">Leadership in outsourcing, online platforms and Trust &amp; Safety</span>}
        />

        {/* Phones: compact cards. md to xl: full-width ledger rows. xl: five equal columns sharing rows (subgrid). */}
        <ul className="mt-10 grid gap-3 md:gap-4 lg:mt-12 xl:grid-cols-5">
          {sectors.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 90}
              className="card card-hover flex flex-col gap-3 p-5 md:grid md:grid-cols-12 md:items-center md:gap-6 md:px-7 xl:row-span-3 xl:grid-cols-1 xl:grid-rows-subgrid xl:items-stretch xl:gap-4 xl:p-5"
            >
              <div className="flex items-center gap-4 md:col-span-4 xl:col-span-1 xl:flex-col xl:items-start">
                <IconTile name={s.icon} tone={i % 2 ? 'brick' : 'olive'} />
                <h3 className="max-w-full font-display text-h4">{s.title}</h3>
              </div>
              <p className="text-body-sm text-muted md:col-span-5 xl:col-span-1">{s.body}</p>
              <ul
                className="flex flex-col gap-1 pt-1 md:col-span-3 md:pt-0 xl:col-span-1 xl:pt-2"
                aria-label="Organisations"
              >
                {s.orgs.map((o) => (
                  <li key={o} className="text-small font-semibold text-olive">
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          {organisations.map((g) => (
            <div key={g.label} className={g.label === 'Employers' ? 'sm:col-span-2 lg:col-span-6' : 'lg:col-span-3'}>
              <h3 className="eyebrow">{g.label}</h3>
              <ul className={`mt-4 grid gap-x-10 gap-y-2.5 ${g.names.length > 2 ? 'sm:grid-cols-2' : ''}`}>
                {g.names.map((o) => (
                  <li key={o} className="font-display text-h4 text-text">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
