/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Portfolio: Single full-width cinematic showcase — no category sidebar.
 *
 * Behavior:
 *  - All photos shuffled once per page load, advance sequentially through
 *    the shuffled order — feels random without instant repeats.
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
import { photos } from '@/lib/photos';
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

// Shuffle once per page load
const shuffledPhotos = shuffle(photos);

export default function PortfolioSection() {
  const { t } = useLanguage();

  // ── Carousel state ────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leavingTimerRef = useRef<number | null>(null);

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
    goTo((activeIdx + 1) % shuffledPhotos.length);
  }, [activeIdx, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIdx - 1 + shuffledPhotos.length) % shuffledPhotos.length);
  }, [activeIdx, goTo]);

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
  }, [activeIdx, isPaused, goNext]);

  // ── Pause when tab hidden ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // ── Preload next image ────────────────────────────────────────────────
  useEffect(() => {
    if (shuffledPhotos.length <= 1) return;
    const nextSrc =
      shuffledPhotos[(activeIdx + 1) % shuffledPhotos.length]?.src;
    if (nextSrc) {
      const img = new Image();
      img.src = nextSrc;
    }
  }, [activeIdx]);

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

  const progressKey = `${activeIdx}`;

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-secondary">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-label section-accent">
            {t.portfolio.heading}
          </span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            A selection of recent custom furniture projects
          </p>
        </div>

        {/* Full-width showcase */}
        <div
          id="showcase-panel"
          role="region"
          aria-label="Portfolio showcase"
          className="showcase"
        >
          <div
            ref={stageRef}
            className="showcase-stage"
            tabIndex={0}
            role="button"
            aria-label={`${t.portfolio.view_full} — project ${activeIdx + 1} of ${shuffledPhotos.length}`}
            onMouseEnter={() => setHoverPaused(true)}
            onMouseLeave={() => setHoverPaused(false)}
            onFocus={() => setHoverPaused(true)}
            onBlur={() => setHoverPaused(false)}
            onClick={() => setLightboxIndex(activeIdx)}
            onKeyDown={onStageKeyDown}
          >
            {/* Leaving slide (cross-fade out) */}
            {leavingPhoto && (
              <picture
                key={`leaving-${leavingPhoto.id}`}
                className="showcase-slide leaving"
                aria-hidden="true"
              >
                <source srcSet={leavingPhoto.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
                <source srcSet={leavingPhoto.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
                <img
                  src={leavingPhoto.src}
                  alt=""
                  className="showcase-picture-img"
                  draggable={false}
                  decoding="async"
                />
              </picture>
            )}

            {/* Active slide */}
            {activePhoto && (
              <picture
                key={`active-${activePhoto.id}`}
                className="showcase-slide active"
              >
                <source srcSet={activePhoto.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
                <source srcSet={activePhoto.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="showcase-picture-img"
                  draggable={false}
                  decoding="async"
                />
              </picture>
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

          {/* Hint below stage */}
          <div className="showcase-meta">
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
