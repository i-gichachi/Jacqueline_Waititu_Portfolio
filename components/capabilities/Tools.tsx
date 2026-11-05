import { toolGroups } from '../../content/competencies.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { IconTile } from '../ui/Icon.tsx';
import { SectionHeading } from '../ui/SectionHeading.tsx';

const MONOGRAM: Record<string, string> = {
  Zoom: 'Zm',
  Slack: 'Sl',
  Asana: 'As',
  'Generative AI (GenAI)': 'AI',
  'Power BI': 'BI',
  'Akira HRMS': 'HR',
};

const monogram = (name: string) =>
  MONOGRAM[name] ??
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/** All ten tools in four equal group cards, each with a monogram badge and the work it did. */
export function Tools() {
  return (
    <section id="tools" aria-labelledby="tools-title" className="section bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tools"
          title={<span id="tools-title">The systems behind the work</span>}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {toolGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 100} className="card card-hover flex h-full flex-col bg-paper p-5 sm:p-6">
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <IconTile name={g.icon} />
                <h3 className="flex min-h-12 items-center font-sans text-base leading-snug font-semibold">{g.title}</h3>
              </div>
              <ul className="mt-2 grid">
                {g.tools.map((t) => (
                  <li key={t.name} className="flex items-start gap-3 border-b border-line py-4 last:border-b-0">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface font-display text-sm tracking-wide text-olive"
                    >
                      {monogram(t.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold leading-snug">{t.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{t.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
