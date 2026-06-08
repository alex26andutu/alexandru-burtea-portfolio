/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Portfolio: Sidebar (categories) + Auto-rotating Showcase (slideshow).
 *
 * Behavior:
 *  - Default category = first non-empty (no "All" option).
 *  - Photos per category are shuffled once on category-change, then advance
 *    sequentially through the shuffled order — feels random without being
 *    confusing (no instant repeat).
 *  - Auto-advance every SLIDE_DURATION ms with a top-aligned progress bar.
 *  - Pause on hover, on focus, when tab is hidden, when reduced-motion is on,
 *    and via an explicit pause button (top-right).
 *  - Click stage → opens lightbox at current slide.
 *  - Keyboard: ← / → navigate, Space pause/play, Enter opens lightbox.
 *  - Next image preloaded in background for snappy transitions.
 */

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { photos, type PhotoCategory, categoryOrder } from '@/lib/photos';
import Lightbox from './Lightbox';

const SLIDE_DURATION_MS = 5000;
const TRANSITION_MS = 900;

/** Fisher-Yates — returns a shuffled copy, original untouched. */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PortfolioSection() {
  const { t } = useLanguage();

  // ── Counts + active categories ────────────────────────────────────────
  const countsByCategory = useMemo(() => {
    const counts: Partial<Record<PhotoCategory, number>> = {};
    for (const p of photos) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, []);

  const activeCategories = useMemo(
    () => categoryOrder.filter((cat) => (countsByCategory[cat] ?? 0) > 0),
    [countsByCategory]
  );

  const [activeCategory, setActiveCategory] = useState<PhotoCategory>(
    activeCategories[0] ?? 'kitchen'
  );

  // ── Photos for current category, shuffled once per category change ────
  const shuffledPhotos = useMemo(
    () => shuffle(photos.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  // ── Carousel state ────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leavingTimerRef = useRef<number | null>(null);

  // Reset to first slide on category change
  useEffect(() => {
    setActiveIdx(0);
    setLeavingIdx(null);
    if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
  }, [activeCategory]);

  const goTo = useCallback(
    (newIdx: number) => {
      if (newIdx === activeIdx) return;
      setLeavingIdx(activeIdx);
      setActiveIdx(newIdx);
      if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
      leavingTimerRef.current = window.setTimeout(
        () => setLeavingIdx(null),
        TRANSITION_MS
      );
    },
    [activeIdx]
  );

  const goNext = useCallback(() => {
    if (shuffledPhotos.length === 0) return;
    goTo((activeIdx + 1) % shuffledPhotos.length);
  }, [activeIdx, shuffledPhotos.length, goTo]);

  const goPrev = useCallback(() => {
    if (shuffledPhotos.length === 0) return;
    goTo((activeIdx - 1 + shuffledPhotos.length) % shuffledPhotos.length);
  }, [activeIdx, shuffledPhotos.length, goTo]);

  // ── Auto-advance timer ────────────────────────────────────────────────
  const isPaused = hoverPaused || manuallyPaused || tabHidden;

  useEffect(() => {
    if (shuffledPhotos.length <= 1) return;
    if (isPaused) return;
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const id = window.setTimeout(goNext, SLIDE_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [activeIdx, shuffledPhotos.length, isPaused, goNext]);

  // ── Pause when tab hidden ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // ── Preload neighbouring images ───────────────────────────────────────
  useEffect(() => {
    if (shuffledPhotos.length <= 1) return;
    const nextSrc =
      shuffledPhotos[(activeIdx + 1) % shuffledPhotos.length]?.src;
    if (nextSrc) {
      const img = new Image();
      img.src = nextSrc;
    }
  }, [activeIdx, shuffledPhotos]);

  // ── Clean up leaving timer on unmount ─────────────────────────────────
  useEffect(
    () => () => {
      if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
    },
    []
  );

  // ── Keyboard nav on stage ─────────────────────────────────────────────
  const onStageKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setManuallyPaused((p) => !p);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setLightboxIndex(activeIdx);
      }
    },
    [goNext, goPrev, activeIdx]
  );

  // Manual prev/next reset the timer (re-render triggers timeout above)
  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goPrev();
    },
    [goPrev]
  );
  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goNext();
    },
    [goNext]
  );

  const activePhoto = shuffledPhotos[activeIdx];
  const leavingPhoto = leavingIdx !== null ? shuffledPhotos[leavingIdx] : null;
  const showDots = shuffledPhotos.length > 1 && shuffledPhotos.length <= 10;

  // Progress bar restarts via `key` (React unmounts/remounts → animation
  // starts from 0). Paused state freezes the animation via CSS class.
  const progressKey = `${activeCategory}-${activeIdx}`;

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-secondary">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-label section-accent">
            {t.portfolio.heading}
          </span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            {t.portfolio.subheading}
          </p>
        </div>

        {/* Sidebar + showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside
            className="cat-sidebar"
            role="tablist"
            aria-label="Project categories"
          >
            {activeCategories.map((cat) => {
              const label = t.portfolio.categories[cat] || cat;
              const isActive = activeCategory === cat;
              const count = countsByCategory[cat] ?? 0;
              return (
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="showcase-panel"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cat-item ${isActive ? 'active' : ''}`}
                >
                  <span className="flex-1">{label}</span>
                  <span className="cat-count" aria-label={`${count} photos`}>
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* Showcase */}
          <div
            id="showcase-panel"
            role="tabpanel"
            aria-label={t.portfolio.categories[activeCategory]}
            className="showcase"
          >
            <div
              ref={stageRef}
              className="showcase-stage"
              tabIndex={0}
              role="button"
              aria-label={`${t.portfolio.view_full} — ${
                t.portfolio.categories[activeCategory]
              } ${activeIdx + 1} of ${shuffledPhotos.length}`}
              onMouseEnter={() => setHoverPaused(true)}
              onMouseLeave={() => setHoverPaused(false)}
              onFocus={() => setHoverPaused(true)}
              onBlur={() => setHoverPaused(false)}
              onClick={() => setLightboxIndex(activeIdx)}
              onKeyDown={onStageKeyDown}
            >
              {/* Leaving slide (cross-fade out) */}
              {leavingPhoto && (
                <img
                  key={`leaving-${activeCategory}-${leavingPhoto.id}`}
                  src={leavingPhoto.src}
                  alt=""
                  aria-hidden="true"
                  className="showcase-slide leaving"
                  draggable={false}
                  decoding="async"
                />
              )}

              {/* Active slide */}
              {activePhoto && (
                <img
                  key={`active-${activeCategory}-${activePhoto.id}`}
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="showcase-slide active"
                  draggable={false}
                  decoding="async"
                />
              )}

              {/* Counter top-left */}
              <div className="showcase-counter">
                {String(activeIdx + 1).padStart(2, '0')}
                <span className="showcase-counter-total">
                  / {String(shuffledPhotos.length).padStart(2, '0')}
                </span>
              </div>

              {/* Pause / Play toggle */}
              {shuffledPhotos.length > 1 && (
                <button
                  type="button"
                  className="showcase-pause"
                  onClick={(e) => {
                    e.stopPropagation();
                    setManuallyPaused((p) => !p);
                  }}
                  aria-label={
                    manuallyPaused ? t.portfolio.play : t.portfolio.pause
                  }
                  title={
                    manuallyPaused ? t.portfolio.play : t.portfolio.pause
                  }
                >
                  {manuallyPaused ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  )}
                </button>
              )}

              {/* Prev / Next */}
              {shuffledPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="showcase-nav showcase-nav-prev"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M15 18l-6-6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="showcase-nav showcase-nav-next"
                    onClick={handleNext}
                    aria-label="Next photo"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Progress bar */}
              {shuffledPhotos.length > 1 && (
                <div className="showcase-progress-track">
                  <div
                    key={progressKey}
                    className={`showcase-progress-fill ${
                      isPaused ? 'paused' : ''
                    }`}
                    style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            {/* Meta bar below stage */}
            <div className="showcase-meta">
              <span className="showcase-cat-name">
                {t.portfolio.categories[activeCategory]}
              </span>
              <span className="showcase-hint">{t.portfolio.view_full}</span>
            </div>

            {/* Dot indicator — only for ≤ 10 photos */}
            {showDots && (
              <div className="showcase-dots" role="group" aria-label="Slide indicators">
                {shuffledPhotos.map((p, i) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => goTo(i)}
                    className={`showcase-dot ${i === activeIdx ? 'active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === activeIdx}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={shuffledPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))
          }
          onNext={() =>
            setLightboxIndex((i) =>
              i !== null && i < shuffledPhotos.length - 1 ? i + 1 : i
            )
          }
        />
      )}
    </section>
  );
}
