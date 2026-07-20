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

        {/* Steps — one full-width row per step */}
        <ol className="list-none mb-16 lg:mb-24">
          {t.process.steps.map((step, i) => (
            <li
              key={i}
              className={`grid grid-cols-[4rem_1fr_2fr] gap-8 lg:gap-16 items-start py-8 ${
                i < t.process.steps.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="font-display text-5xl font-light text-border leading-none select-none">
                {step.number}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground pt-1">
                {step.title}
              </h3>
              <p className="text-foreground/80 text-base leading-relaxed pt-1">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

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
          {t.process.caption}
        </p>

        {/* Quote block */}
        <blockquote className="border-l-4 border-primary pl-8 py-6 bg-secondary/40 max-w-3xl">
          <p className="text-foreground/80 text-lg italic leading-relaxed mb-4">
            &ldquo;{t.process.quote}&rdquo;
          </p>
          <cite className="text-xs tracking-widest uppercase font-medium text-foreground/60 not-italic">
            Alexandru Burtea
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
