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
          title={<span id="trust-title">Operations leadership across five demanding sectors</span>}
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
                <h3 className="font-display text-[1.15rem] leading-snug xl:text-[1.08rem]">{s.title}</h3>
              </div>
              <p className="text-[0.9rem] text-muted md:col-span-5 xl:col-span-1 xl:text-[0.86rem]">{s.body}</p>
              <ul
                className="flex flex-col gap-1 border-t border-line pt-3 md:col-span-3 md:border-t-0 md:border-l md:pt-0 md:pl-6 xl:col-span-1 xl:border-t xl:border-l-0 xl:pt-4 xl:pl-0"
                aria-label="Organisations"
              >
                {s.orgs.map((o) => (
                  <li key={o} className="text-[0.8rem] leading-snug font-semibold text-olive">
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 grid gap-5 border-t border-line pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-8">
          <h3 className="eyebrow lg:col-span-3 lg:self-start lg:pt-5">Organisations and institutions</h3>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line md:grid-cols-4 lg:col-span-9">
            {organisations.map((o) => (
              <li
                key={o}
                className="flex min-h-20 items-center justify-center bg-paper px-3 py-4 text-center font-display text-[0.98rem] leading-snug text-text/85 transition-colors duration-300 hover:bg-surface hover:text-brick sm:text-[1.08rem]"
              >
                {o}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
