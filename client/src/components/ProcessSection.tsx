import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DETAIL_BASE = '/images/process_workshop';

/*
 * Werkwijze as a timeline. A rail runs down the left of the steps and fills
 * with light as the visitor scrolls; steps already passed keep a lit dot, the
 * step at reading height is highlighted, the ones still to come stay muted.
 *
 * Without JavaScript, or before the first scroll event, every step renders in
 * full — the effect only adds emphasis, it never hides content.
 */
export default function ProcessSection() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const line = window.innerHeight * 0.55; // "reading height"
      let current = -1;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) current = i;
      });
      setActive(current);
      const top = list.getBoundingClientRect().top;
      const el = current >= 0 ? stepRefs.current[current] : null;
      setFill(el ? el.getBoundingClientRect().top - top + 42 : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="process" className="process-x py-24 md:py-36 bg-background">
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] gap-14 lg:gap-20">
          {/* Left — heading, intro, quote */}
          <div className="lg:sticky lg:top-32 self-start">
            <span className="section-label section-accent">{t.process.heading}</span>
            <p className="mt-6 font-display text-4xl md:text-5xl font-light leading-[1.05] text-foreground">
              {t.process.subheading}
            </p>
            <blockquote className="glass-tile mt-10 p-6 md:p-7">
              <p className="font-display italic text-2xl leading-snug text-foreground">
                &ldquo;{t.process.quote}&rdquo;
              </p>
              <cite className="mt-4 block not-italic text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                Alexandru Burtea
              </cite>
            </blockquote>
          </div>

          {/* Right — timeline */}
          <div ref={listRef} className="timeline">
            <span className="timeline-rail" aria-hidden="true" />
            <span className="timeline-fill" aria-hidden="true" style={{ height: `${fill}px` }} />
            <ol className="list-none">
            {t.process.steps.map((step, i) => {
              const state = active < 0 ? '' : i < active ? 'is-done' : i === active ? 'is-active' : 'is-next';
              return (
                <li
                  key={i}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`timeline-step ${state}`}
                >
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-card">
                    <div>
                      <span className="timeline-num">{step.number}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground mt-1">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-[15px] leading-relaxed mt-2">
                        {step.description}
                      </p>
                    </div>
                    {step.tools && step.tools.length > 0 && (
                      <ul className="timeline-tools" aria-label={step.title}>
                        {step.tools.map((tool) => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
            </ol>
          </div>
        </div>

        {/* Photo below — full width */}
        <div className="process-photo relative overflow-hidden aspect-[16/9] mt-20 lg:mt-28">
          <picture>
            <source type="image/avif" srcSet={`${DETAIL_BASE}.avif`} />
            <source type="image/webp" srcSet={`${DETAIL_BASE}.webp`} />
            <img
              src={`${DETAIL_BASE}.jpg`}
              alt="A cabinet on a workbench in the workshop"
              width={1364}
              height={768}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <p className="mt-4 text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
          {t.process.caption}
        </p>
      </div>
    </section>
  );
}
