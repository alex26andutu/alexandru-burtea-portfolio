import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountUp } from '@/hooks/useCountUp';

function Stat({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div className="bg-background p-6 text-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-display text-4xl md:text-5xl font-light text-foreground mb-1 tabular-nums"
      >
        {display}
      </div>
      <div className="text-xs text-muted-foreground tracking-wide uppercase font-medium">
        {label}
      </div>
    </div>
  );
}

// Craftsmanship close-up: dovetail joinery on oak drawer — self-hosted
const WORKSHOP_BASE = '/images/about_workshop';

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const items = node.querySelectorAll<HTMLElement>('.fade-in-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              window.setTimeout(() => el.classList.add('is-visible'), i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-background"
    >
      <div className="container">
        <div className="mb-16 fade-in-item">
          <span className="section-label section-accent">{t.about.heading}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2 className="fade-in-item font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-10">
              Crafting spaces<br />
              <em>with purpose.</em>
            </h2>
            <div className="space-y-5 text-foreground/80 leading-relaxed text-base">
              <p className="fade-in-item">{t.about.p1}</p>
              <p className="fade-in-item">{t.about.p2}</p>
              <p className="fade-in-item">{t.about.p3}</p>
              <p className="fade-in-item">{t.about.p4}</p>
              <p className="fade-in-item">{t.about.p5}</p>
            </div>
            <div className="mt-10 fade-in-item">
              <p className="section-label mb-5">{t.skills.heading}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t.skills.items.map((skill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-sm text-foreground/80"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <div className="fade-in-item relative overflow-hidden aspect-square">
              <picture>
                <source type="image/avif" srcSet={`${WORKSHOP_BASE}.avif`} />
                <source type="image/webp" srcSet={`${WORKSHOP_BASE}.webp`} />
                <img
                  src={`${WORKSHOP_BASE}.jpg`}
                  alt="Close-up of hand-cut dovetail joinery on an oak drawer — craftsmanship by Alexandru Burtea"
                  width={1248}
                  height={1248}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
            <div className="fade-in-item grid grid-cols-2 gap-px bg-border">
              {t.about.stats.map((stat, i) => (
                <Stat key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
