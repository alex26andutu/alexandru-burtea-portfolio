/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Portfolio: Cinematic slideshow (default) + grid view toggle + category filter.
 *
 * UI controls are discreet — hidden until the stage is hovered, then fade in.
 * Slideshow behavior:
 *  - Photos shuffled once per page load (or filter change), advance sequentially.
 *  - Auto-advance every SLIDE_DURATION ms with progress bar.
 *  - Pause on hover/focus/manual/tab-hidden/reduced-motion.
 *  - Click stage → lightbox. Keyboard: ← / → navigate, Space pause, Enter lightbox.
 *  - Next image preloaded.
 * Grid behavior:
 *  - Masonry-style CSS grid of all filtered photos, click → lightbox.
 * Persistence: view + filter saved to localStorage.
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
const MIN_FILTER_COUNT = 5;
const LS_VIEW = 'portfolio_view';
const LS_FILTER = 'portfolio_filter';

type ViewMode = 'slideshow' | 'grid';
type Filter = PhotoCategory | 'all';

function shuffle<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Category display labels
const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  kitchen: 'Kitchens',
  living_room: 'Living Rooms',
  bedroom_wardrobe: 'Wardrobes',
  hallway: 'Hallways',
  dressing_room: 'Dressing Rooms',
  bathroom: 'Bathrooms',
  office_reception: 'Offices',
};

export default function PortfolioSection() {
  const { t } = useLanguage();

  // ── Persistent state ──────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try { return (localStorage.getItem(LS_VIEW) as ViewMode) || 'slideshow'; } catch { return 'slideshow'; }
  });
  const [activeFilter, setActiveFilter] = useState<Filter>(() => {
    try { return (localStorage.getItem(LS_FILTER) as Filter) || 'all'; } catch { return 'all'; }
  });

  useEffect(() => { try { localStorage.setItem(LS_VIEW, viewMode); } catch {} }, [viewMode]);
  useEffect(() => { try { localStorage.setItem(LS_FILTER, activeFilter); } catch {} }, [activeFilter]);

  // ── Filtered + shuffled photos ────────────────────────────────────────
  const filteredPhotos = useMemo(() => {
    const base = activeFilter === 'all' ? photos : photos.filter(p => p.category === activeFilter);
    return shuffle(base);
  }, [activeFilter]);

  // Categories with enough photos for the filter dropdown
  const filterableCategories = useMemo(() => {
    const counts: Partial<Record<PhotoCategory, number>> = {};
    for (const p of photos) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return categoryOrder.filter(cat => (counts[cat] ?? 0) >= MIN_FILTER_COUNT);
  }, []);

  const totalByCategory = useMemo(() => {
    const counts: Partial<Record<PhotoCategory, number>> = {};
    for (const p of photos) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, []);

  // ── Carousel state ────────────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0);
  const [leavingIdx, setLeavingIdx] = useState<number | null>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leavingTimerRef = useRef<number | null>(null);

  // Reset carousel when filter changes
  useEffect(() => {
    setActiveIdx(0);
    setLeavingIdx(null);
    if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
  }, [activeFilter]);

  const goTo = useCallback(
    (newIdx: number) => {
      if (newIdx === activeIdx) return;
      setLeavingIdx(activeIdx);
      setActiveIdx(newIdx);
      if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
      leavingTimerRef.current = window.setTimeout(() => setLeavingIdx(null), TRANSITION_MS);
    },
    [activeIdx]
  );

  const goNext = useCallback(() => {
    goTo((activeIdx + 1) % filteredPhotos.length);
  }, [activeIdx, filteredPhotos.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIdx - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [activeIdx, filteredPhotos.length, goTo]);

  const isPaused = hoverPaused || manuallyPaused || tabHidden;

  useEffect(() => {
    if (viewMode !== 'slideshow') return;
    if (filteredPhotos.length <= 1 || isPaused) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(goNext, SLIDE_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [activeIdx, filteredPhotos.length, isPaused, goNext, viewMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (viewMode !== 'slideshow' || filteredPhotos.length <= 1) return;
    const nextSrc = filteredPhotos[(activeIdx + 1) % filteredPhotos.length]?.src;
    if (nextSrc) { const img = new Image(); img.src = nextSrc; }
  }, [activeIdx, filteredPhotos, viewMode]);

  useEffect(() => () => {
    if (leavingTimerRef.current) window.clearTimeout(leavingTimerRef.current);
  }, []);

  const onStageKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === ' ') { e.preventDefault(); setManuallyPaused(p => !p); }
      else if (e.key === 'Enter') { e.preventDefault(); setLightboxIndex(activeIdx); }
    },
    [goNext, goPrev, activeIdx]
  );

  const handlePrev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); goPrev(); }, [goPrev]);
  const handleNext = useCallback((e: React.MouseEvent) => { e.stopPropagation(); goNext(); }, [goNext]);

  // ── Filter dropdown ───────────────────────────────────────────────────
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFilterOpen(false); };
    const onOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onOutside); };
  }, [filterOpen]);

  // Keyboard nav inside dropdown
  const onDropdownKeyDown = useCallback((e: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = filterRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
    if (!items) return;
    const current = document.activeElement as HTMLElement;
    const idx = Array.from(items).indexOf(current);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
    else if (e.key === 'Escape') { setFilterOpen(false); filterBtnRef.current?.focus(); }
  }, []);

  const selectFilter = (f: Filter) => {
    setActiveFilter(f);
    setFilterOpen(false);
  };

  // ── Touch-reveal for controls (mobile) ───────────────────────────────
  const [touchRevealed, setTouchRevealed] = useState(false);
  const touchTimerRef = useRef<number | null>(null);

  const onStageTap = useCallback(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setTouchRevealed(true);
      if (touchTimerRef.current) window.clearTimeout(touchTimerRef.current);
      touchTimerRef.current = window.setTimeout(() => setTouchRevealed(false), 3000);
    }
  }, []);

  const activePhoto = filteredPhotos[activeIdx];
  const leavingPhoto = leavingIdx !== null ? filteredPhotos[leavingIdx] : null;
  const progressKey = `${activeFilter}-${activeIdx}`;

  // Counter chip text
  const filterChip = activeFilter !== 'all' ? CATEGORY_LABELS[activeFilter] : null;

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-secondary">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-label section-accent">{t.portfolio.heading}</span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            A selection of recent custom furniture projects
          </p>
        </div>

        {/* Showcase */}
        <div id="showcase-panel" role="region" aria-label="Portfolio showcase" className="showcase">

          {viewMode === 'slideshow' ? (
            /* ── SLIDESHOW ── */
            <div
              ref={stageRef}
              className="showcase-stage"
              tabIndex={0}
              role="button"
              aria-label={`${t.portfolio.view_full} — project ${activeIdx + 1} of ${filteredPhotos.length}`}
              onMouseEnter={() => setHoverPaused(true)}
              onMouseLeave={() => setHoverPaused(false)}
              onFocus={() => setHoverPaused(true)}
              onBlur={() => setHoverPaused(false)}
              onClick={() => { onStageTap(); setLightboxIndex(activeIdx); }}
              onKeyDown={onStageKeyDown}
            >
              {/* Leaving slide */}
              {leavingPhoto && (
                <picture key={`leaving-${leavingPhoto.id}`} className="showcase-slide leaving" aria-hidden="true">
                  <source srcSet={leavingPhoto.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
                  <source srcSet={leavingPhoto.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img src={leavingPhoto.src} alt="" className="showcase-picture-img" draggable={false} decoding="async" />
                </picture>
              )}

              {/* Active slide */}
              {activePhoto && (
                <picture key={`active-${activePhoto.id}`} className="showcase-slide active">
                  <source srcSet={activePhoto.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
                  <source srcSet={activePhoto.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img src={activePhoto.src} alt={activePhoto.alt} className="showcase-picture-img" draggable={false} decoding="async" />
                </picture>
              )}

              {/* Counter */}
              <div className="showcase-counter">
                {String(activeIdx + 1).padStart(2, '0')}
                <span className="showcase-counter-total">/ {String(filteredPhotos.length).padStart(2, '0')}</span>
                {filterChip && <span className="showcase-filter-chip">{filterChip}</span>}
              </div>

              {/* Discreet controls row — top-right */}
              <div className={`showcase-controls ${touchRevealed ? 'touch-revealed' : ''}`} onClick={e => e.stopPropagation()}>
                {/* Grid toggle */}
                <button
                  type="button"
                  className="showcase-ctrl-btn"
                  onClick={() => setViewMode('grid')}
                  aria-label="Switch to grid view"
                  title="Switch to grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>

                {/* Filter trigger */}
                <div ref={filterRef} style={{ position: 'relative' }} onKeyDown={onDropdownKeyDown}>
                  <button
                    ref={filterBtnRef}
                    type="button"
                    className={`showcase-ctrl-btn ${activeFilter !== 'all' ? 'active' : ''}`}
                    onClick={() => setFilterOpen(o => !o)}
                    aria-label="Filter by category"
                    aria-expanded={filterOpen}
                    aria-haspopup="menu"
                    title="Filter by category"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="11" y1="18" x2="13" y2="18" />
                    </svg>
                  </button>

                  {filterOpen && (
                    <div className="showcase-dropdown" role="menu" aria-label="Filter by category">
                      <button
                        type="button"
                        role="menuitem"
                        aria-current={activeFilter === 'all'}
                        className={`showcase-dropdown-item ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => selectFilter('all')}
                      >
                        <span>All work</span>
                        <span className="showcase-dropdown-count">{photos.length}</span>
                      </button>
                      {filterableCategories.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          role="menuitem"
                          aria-current={activeFilter === cat}
                          className={`showcase-dropdown-item ${activeFilter === cat ? 'active' : ''}`}
                          onClick={() => selectFilter(cat)}
                        >
                          <span>{CATEGORY_LABELS[cat]}</span>
                          <span className="showcase-dropdown-count">{totalByCategory[cat] ?? 0}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Pause / Play */}
              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  className="showcase-pause"
                  onClick={(e) => { e.stopPropagation(); setManuallyPaused(p => !p); }}
                  aria-label={manuallyPaused ? t.portfolio.play : t.portfolio.pause}
                  title={manuallyPaused ? t.portfolio.play : t.portfolio.pause}
                >
                  {manuallyPaused ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  )}
                </button>
              )}

              {/* Prev / Next */}
              {filteredPhotos.length > 1 && (
                <>
                  <button type="button" className="showcase-nav showcase-nav-prev" onClick={handlePrev} aria-label="Previous photo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className="showcase-nav showcase-nav-next" onClick={handleNext} aria-label="Next photo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}

              {/* Progress bar */}
              {filteredPhotos.length > 1 && (
                <div className="showcase-progress-track">
                  <div
                    key={progressKey}
                    className={`showcase-progress-fill ${isPaused ? 'paused' : ''}`}
                    style={{ animationDuration: `${SLIDE_DURATION_MS}ms` }}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ) : (
            /* ── GRID VIEW ── */
            <div className="portfolio-grid-wrapper">
              {/* Controls bar above grid */}
              <div className="portfolio-grid-topbar">
                <button
                  type="button"
                  className="showcase-ctrl-btn active"
                  onClick={() => setViewMode('slideshow')}
                  aria-label="Switch to slideshow view"
                  title="Switch to slideshow view"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </button>

                <div ref={filterRef} style={{ position: 'relative' }} onKeyDown={onDropdownKeyDown}>
                  <button
                    ref={filterBtnRef}
                    type="button"
                    className={`showcase-ctrl-btn ${activeFilter !== 'all' ? 'active' : ''}`}
                    onClick={() => setFilterOpen(o => !o)}
                    aria-label="Filter by category"
                    aria-expanded={filterOpen}
                    aria-haspopup="menu"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="11" y1="18" x2="13" y2="18" />
                    </svg>
                    {activeFilter !== 'all' && (
                      <span className="portfolio-grid-filter-label">{CATEGORY_LABELS[activeFilter as PhotoCategory]}</span>
                    )}
                  </button>

                  {filterOpen && (
                    <div className="showcase-dropdown" role="menu" aria-label="Filter by category">
                      <button type="button" role="menuitem" aria-current={activeFilter === 'all'} className={`showcase-dropdown-item ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => selectFilter('all')}>
                        <span>All work</span><span className="showcase-dropdown-count">{photos.length}</span>
                      </button>
                      {filterableCategories.map(cat => (
                        <button key={cat} type="button" role="menuitem" aria-current={activeFilter === cat} className={`showcase-dropdown-item ${activeFilter === cat ? 'active' : ''}`} onClick={() => selectFilter(cat)}>
                          <span>{CATEGORY_LABELS[cat]}</span><span className="showcase-dropdown-count">{totalByCategory[cat] ?? 0}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="portfolio-grid-count">{filteredPhotos.length} photos</span>
              </div>

              {/* Grid */}
              <div className="portfolio-grid" role="list" aria-label="Portfolio photos">
                {filteredPhotos.map((photo, i) => (
                  <button
                    key={photo.id}
                    type="button"
                    role="listitem"
                    className="portfolio-grid-cell"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={photo.alt}
                  >
                    <picture>
                      <source srcSet={photo.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
                      <source srcSet={photo.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="portfolio-grid-img" />
                    </picture>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hint below (slideshow only) */}
          {viewMode === 'slideshow' && (
            <div className="showcase-meta">
              <span className="showcase-hint">{t.portfolio.view_full}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setLightboxIndex(i => (i !== null && i < filteredPhotos.length - 1 ? i + 1 : i))}
        />
      )}
    </section>
  );
}
