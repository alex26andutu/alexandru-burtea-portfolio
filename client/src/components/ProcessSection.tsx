import { useLanguage } from '@/contexts/LanguageContext';

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

        {/* Two-column: numbered steps left, descriptions right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16 lg:mb-24">
          {/* Left — numbered steps */}
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
                </div>
              </li>
            ))}
          </ol>

          {/* Right — descriptions without numbers */}
          <div className="space-y-0">
            {t.process.steps.map((step, i) => (
              <div
                key={i}
                className={`py-8 ${
                  i < t.process.steps.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <p className="text-foreground/80 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo below — full width */}
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
        <p className="mt-4 mb-12 text-xs text-muted-foreground tracking-wide uppercase font-medium">
          From workshop to home — every piece, hand-finished
        </p>

        {/* Quote block */}
        <blockquote className="border-l-4 border-primary pl-8 py-6 bg-secondary/40 max-w-3xl">
          <p className="text-foreground/80 text-lg italic leading-relaxed mb-4">
            "Detailed 3D design using selected materials and finishes, allowing full visualization
            before production begins and approval.
          </p>
          <cite className="text-xs tracking-widest uppercase font-medium text-foreground/60 not-italic">
            Alexandru Burtea
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
