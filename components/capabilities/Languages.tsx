import { languages } from '../../content/competencies.ts';
import { Reveal } from '../motion/Reveal.tsx';
import { IconTile } from '../ui/Icon.tsx';

/** Two language cards with proficiency bars that fill once they are revealed. */
export function Languages() {
  return (
    <section id="languages" aria-labelledby="languages-title" className="section">
      <div className="container-x grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-3">Languages</p>
          <h2 id="languages-title" className="text-h2">
            Fluent in English, native in Swahili
          </h2>
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-2 lg:col-span-8 lg:gap-5">
          {languages.map((l, i) => (
            <Reveal as="li" key={l.name} delay={i * 140} className="card card-hover flex h-full flex-col p-6 lg:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <IconTile name="languages" tone={i === 0 ? 'olive' : 'brick'} />
                  <h3 className="text-h3">{l.name}</h3>
                </div>
                <span className="rounded-full border border-line-strong px-3 py-1 text-xs font-semibold">{l.level}</span>
              </div>
              <div
                role="img"
                aria-label={`${l.name}: ${l.level}`}
                className="mt-8 h-2 overflow-hidden rounded-full bg-stone"
              >
                <span
                  className="block h-full origin-left scale-x-0 rounded-full bg-brick transition-transform duration-1400 ease-(--ease-out-expo) in-[.is-in]:scale-x-100"
                  style={{ width: `${l.score}%`, transitionDelay: `${300 + i * 160}ms` }}
                />
              </div>
              <div className="mt-2.5 flex justify-between text-xs text-muted">
                <span>Working</span>
                <span>Professional</span>
                <span>Native</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
