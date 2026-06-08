import { useLanguage } from '@/contexts/LanguageContext';

// Featured hero: custom dining room with slat divider + built-in shelving — self-hosted
const HERO_IMAGE = '/images/living_room_30.jpg';
const HERO_IMAGE_SM = '/images/living_room_30.jpg';

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Image as <img> for proper priority + responsive loading */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1200}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
      <div className="absolute bottom-0 left-0 right-0 container pb-16 md:pb-24">
        <div className="max-w-2xl">
          <p className="text-white/75 text-xs font-medium tracking-[0.2em] uppercase mb-4">
            {t.hero.title}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight mb-6">
            {t.hero.name}
          </h1>
          <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 bg-on-deep text-surface-deep px-6 py-3 text-sm font-medium tracking-wide hover:bg-on-deep/90 transition-colors"
            >
              {t.hero.cta_portfolio}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 text-sm font-medium tracking-wide hover:border-white hover:bg-white/10 transition-colors"
            >
              {t.hero.cta_contact}
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 md:right-12 hidden md:flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-12 bg-white/50 animate-pulse" />
        <span className="text-white text-[10px] tracking-[0.2em] uppercase rotate-90 origin-center translate-y-4">
          Scroll
        </span>
      </div>
    </section>
  );
}
