import { useLanguage } from '@/contexts/LanguageContext';
import { populatedCategories } from '@/lib/photos';

// Featured hero: custom dining room with slat divider + built-in shelving — self-hosted
// Multiple formats (AVIF/WebP/JPG) + mobile variant for fastest LCP
const HERO_BASE = '/images/hero_main';

/*
 * Hero — the name stays the headline; "Precisie, op maat." sits beneath it.
 * The futuristic layer comes from the trade, not from neon: a faint
 * technical-drawing grid over the photo, and dimension lines drawn across the
 * furniture like an AutoCAD sheet. Both are decorative and hidden from
 * assistive tech.
 */
export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="hero-x relative w-full h-screen min-h-[680px] max-h-[1000px] overflow-hidden">
      <picture>
        <source
          type="image/avif"
          srcSet={`${HERO_BASE}-800.avif 800w, ${HERO_BASE}.avif 1600w`}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={`${HERO_BASE}-800.webp 800w, ${HERO_BASE}.webp 1600w`}
          sizes="100vw"
        />
        {/* Described rather than decorative: this is a portfolio photo, so it
            carries content a screen-reader user should get. aria-hidden is
            deliberately absent — with it, the alt below would never be read. */}
        <img
          src={`${HERO_BASE}.jpg`}
          alt={t.hero.photo_alt}
          width={1600}
          height={1200}
          decoding="async"
          fetchPriority="high"
          className="hero-x-img absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div className="hero-x-shade absolute inset-0" />
      <div className="hero-x-grid absolute inset-0" aria-hidden="true" />

      {/* Dimension lines — desktop only */}
      <div className="hero-x-dims hidden lg:block" aria-hidden="true">
        <span className="dim-h"><i>2400 mm</i></span>
        <span className="dim-v"><i>2600 mm</i></span>
      </div>

      <div className="relative z-10 h-full container flex flex-col justify-end pb-14 md:pb-20 pt-28">
        <div className="max-w-4xl">
          <p className="hero-x-tag fade-up" style={{ animationDelay: '0.05s' }}>
            <span className="hero-x-tag-dot" aria-hidden="true" />
            {t.hero.title}
          </p>
          <h1 className="fade-up font-display text-[3.2rem] sm:text-7xl lg:text-[6.25rem] xl:text-[6.75rem] font-light text-white leading-[0.92] tracking-tight mt-7" style={{ animationDelay: '0.15s' }}>
            {t.hero.name}
          </h1>
          <p className="fade-up font-display text-3xl md:text-5xl font-light text-white/90 mt-4 md:mt-5" style={{ animationDelay: '0.25s' }}>
            {t.hero.tagline_lead} <em className="hero-x-em">{t.hero.tagline_em}</em>
          </p>
          <p className="fade-up text-white/70 text-base md:text-lg font-light leading-relaxed mt-6 max-w-lg" style={{ animationDelay: '0.35s' }}>
            {t.hero.subtitle}
          </p>
          <div className="fade-up flex flex-col sm:flex-row gap-3 mt-9" style={{ animationDelay: '0.45s' }}>
            <a href="#portfolio" className="btn-glow">
              {t.hero.cta_portfolio}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              {t.hero.cta_contact}
            </a>
          </div>
        </div>

        <ul className="hero-x-stats fade-up" style={{ animationDelay: '0.55s' }}>
          {t.hero.stats.map((s, i) => (
            <li key={i} className="glass-tile">
              <b className="font-display">
                {s.value.replace('{categories}', String(populatedCategories.length))}
              </b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
