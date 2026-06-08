import { useLanguage } from '@/contexts/LanguageContext';

// Workshop image — craftsman hand-planing a walnut TV unit
const DETAIL_BASE = '/images/process_workshop';

export default function ProcessSection() {
  const { t } = useLanguage();
  return (
    <section id="process" className="py-24 md:py-36 bg-background">
      <div className="container">
        <div className="mb-16">
          <span className="section-label section-accent">{t.process.heading}</span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            {t.process.subheading}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ol className="space-y-0 list-none">
            {t.process.steps.map((step, i) => (
              <li
                key={i}
                className={`relative flex gap-6 py-8 ${
                  i < t.process.steps.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="font-display text-6xl md:text-7xl font-light text-border leading-none select-none flex-shrink-0 w-16">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/75 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden aspect-[16/9]">
              <picture>
                <source type="image/avif" srcSet={`${DETAIL_BASE}.avif`} />
                <source type="image/webp" srcSet={`${DETAIL_BASE}.webp`} />
                <img
                  src={`${DETAIL_BASE}.jpg`}
                  alt="Craftsman hand-planing a custom walnut TV unit in the workshop"
                  width={1364}
                  height={768}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground tracking-wide uppercase font-medium">
              From workshop to home — every piece, hand-finished
            </p>
            <div className="mt-8 p-6 bg-secondary border-l-2 border-primary">
              <p className="text-foreground/85 leading-relaxed italic font-display text-lg">
                &ldquo;Every project begins as a 3D model — clients see their furniture with real materials before a single board is cut.&rdquo;
              </p>
              <p className="mt-3 text-xs text-muted-foreground tracking-wide uppercase">
                Alexandru Burtea — SketchUp 3D Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
