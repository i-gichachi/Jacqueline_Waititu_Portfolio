import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Briefcase, CalendarDays, MapPin } from 'lucide-react';
import { cases, getCase } from '../../../content/cases.ts';
import { site } from '../../../content/site.ts';
import { Reveal } from '../../../components/motion/Reveal.tsx';
import { CountUp } from '../../../components/motion/CountUp.tsx';
import { SectionHeading } from '../../../components/ui/SectionHeading.tsx';
import { IconTile } from '../../../components/ui/Icon.tsx';
import { Breadcrumb } from '../../../components/case/Breadcrumb.tsx';
import { ConnectedSteps } from '../../../components/case/ConnectedSteps.tsx';
import { ApproachIcon } from '../../../components/case/approachIcons.tsx';
import { CheckList } from '../../../components/case/CheckList.tsx';
import { CasePager } from '../../../components/case/CasePager.tsx';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const url = `/track-record/${c.slug}`;
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: c.title, description: c.summary, url },
  };
}

const label = 'text-label font-semibold tracking-[0.14em] text-muted uppercase';

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const glance = [
    { term: 'Organisation', value: c.organisation },
    { term: 'Role', value: c.role },
    { term: 'Period', value: c.period },
    { term: 'Location', value: c.location },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Track Record', item: `${site.url}/track-record` },
      { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/track-record/${c.slug}` },
    ],
  };

  return (
    <>
      {/* Compact header: breadcrumb, title, lead and the at-a-glance panel. */}
      <section className="pt-24 pb-12 sm:pb-14 lg:pt-28 lg:pb-20">
        <div className="container-x">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Track Record', href: '/track-record' }, { label: c.title }]} />
          <div className="mt-3 grid gap-8 lg:mt-6 lg:grid-cols-12 lg:gap-12">
            <Reveal className="min-w-0 lg:col-span-8">
              <p className="eyebrow">{c.organisation}</p>
              <h1 className="mt-4 text-h1">{c.title}</h1>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-small font-semibold text-muted" aria-label="Role, period and location">
                <li className="inline-flex items-center gap-1.5">
                  <Briefcase aria-hidden="true" className="size-4 text-olive" strokeWidth={1.75} />
                  {c.role}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <CalendarDays aria-hidden="true" className="size-4 text-olive" strokeWidth={1.75} />
                  {c.period}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="size-4 text-olive" strokeWidth={1.75} />
                  {c.location}
                </li>
              </ul>
              <p className="mt-6 text-lead text-muted lg:mt-8">{c.summary}</p>
            </Reveal>
            <Reveal delay={140} className="lg:col-span-4">
              <aside aria-labelledby="glance" className="card h-full p-6 sm:p-7">
                <h2 id="glance" className="eyebrow">
                  At a glance
                </h2>
                <dl className="mt-4 divide-y divide-line">
                  {glance.map((g) => (
                    <div key={g.term} className="grid grid-cols-[7rem_1fr] gap-3 py-3">
                      <dt className={`${label} pt-0.5`}>{g.term}</dt>
                      <dd className="text-body-sm font-semibold">{g.value}</dd>
                    </div>
                  ))}
                  <div className="grid gap-3 pt-4 pb-1">
                    <dt className={label}>Scope</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {c.scope.map((s) => (
                          <li key={s} className="rounded-full bg-olive-soft px-2.5 py-1 text-small font-semibold text-olive">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key metrics on ink. */}
      <section aria-labelledby="metrics" className="on-ink bg-ink text-on-ink">
        <div className="container-x py-10 sm:py-14 lg:py-16">
          <h2 id="metrics" className="eyebrow">
            Key metrics
          </h2>
          <dl className="mt-4 grid divide-y divide-line-ink sm:mt-8 sm:grid-cols-3 sm:gap-8 sm:divide-y-0">
            {c.metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 110}
                className="grid grid-cols-[9.5rem_1fr] items-center gap-3 py-4 sm:flex sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-3 sm:border-t sm:border-line-ink sm:py-0 sm:pt-6"
              >
                <dt className="order-2 text-small text-on-ink-muted sm:order-none ">{m.label}</dt>
                <dd className="order-1 font-display text-h3 leading-none whitespace-nowrap sm:order-none sm:text-figure">
                  <CountUp metric={m} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Context and challenge. */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="The situation" title="Context and challenge" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
            {[
              { title: 'Context', icon: 'building', tone: 'olive' as const, body: c.context },
              { title: 'Challenge', icon: 'target', tone: 'brick' as const, body: c.challenge },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 110} className="h-full">
                <article className="card flex h-full flex-col gap-4 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <IconTile name={b.icon} tone={b.tone} />
                    <h3 className="text-h3">{b.title}</h3>
                  </div>
                  <p className="text-muted">{b.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic approach: equal cards joined by a drawn line. */}
      <section className="section bg-stone">
        <div className="container-x">
          <SectionHeading eyebrow="How I approached it" title="Strategic approach" />
          <div className="mt-8 lg:mt-12">
            <ConnectedSteps
              steps={c.approach.map((a, i) => ({ icon: <ApproachIcon slug={c.slug} index={i} />, title: a.title, body: a.body }))}
            />
          </div>
        </div>
      </section>

      {/* Results and impact. */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Outcome" title="Results and impact" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
            {[
              { title: 'Quantitative achievements', icon: 'bar-chart-3', items: c.quantitative },
              { title: 'Qualitative achievements', icon: 'award', items: c.qualitative },
            ].map((g, i) => (
              <Reveal key={g.title} delay={i * 110} className="h-full">
                <article className="card flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-4 border-b border-line pb-5">
                    <IconTile name={g.icon} />
                    <h3 className="text-h3">{g.title}</h3>
                  </div>
                  <CheckList items={g.items} className="mt-5" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key takeaway and conclusion. */}
      <section className="section border-y border-line bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="group/draw lg:col-span-7">
            <h2 className="eyebrow">Key takeaway</h2>
            <span
              aria-hidden="true"
              className="mt-6 block h-0.5 w-16 origin-left bg-brick transition-transform delay-300 duration-1000 ease-(--ease-out-expo) group-[.reveal-wait]/draw:scale-x-0"
            />
            <p className="mt-6 font-display text-h3">{c.takeaway}</p>
          </Reveal>
          <Reveal delay={140} className="flex flex-col lg:col-span-5 lg:justify-end lg:border-l lg:border-line lg:pl-12">
            <h2 className="eyebrow">Conclusion</h2>
            <p className="mt-5 text-lead text-muted">{c.conclusion}</p>
          </Reveal>
        </div>
      </section>

      {/* Technical proficiencies utilised. */}
      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="Tools and competencies" title="Technical proficiencies utilised" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-12 lg:gap-6">
            <Reveal className="h-full">
              <article className="card flex h-full flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <IconTile name="layout-grid" />
                  <h3 className="text-h3">Tools</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {c.tools.map((t) => (
                    <li key={t} className="inline-flex min-h-10 items-center rounded-full border border-line bg-paper px-4 text-small font-semibold">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal delay={110} className="h-full">
              <article className="card flex h-full flex-col gap-5 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <IconTile name="layers" tone="brick" />
                  <h3 className="text-h3">Core competencies</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {c.competencies.map((t) => (
                    <li key={t} className="max-w-full">
                      <Link
                        href="/capabilities"
                        className="group inline-flex min-h-11 max-w-full items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2 text-small font-semibold transition-colors duration-300 hover:border-olive hover:text-olive"
                      >
                        <span>{t}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-olive"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <CasePager slug={c.slug} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}
