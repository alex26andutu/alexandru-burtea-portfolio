/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Portfolio: Cinematic slideshow (default) + grid view toggle + category filter.
 *
 * UI controls are discreet — hidden until the stage is hovered, then fade in.
 * Photo order is fixed: whatever photos.ts defines. A returning visitor sees
 * the same sequence, so the work can be curated deliberately.
 *
 * Slideshow behavior:
 *  - Advances sequentially; auto-advance is opt-in via the Slideshow button.
 *  - Pause on hover/focus/manual/tab-hidden/reduced-motion.
 *  - Click stage → lightbox. Keyboard: ← / → navigate, Space pause, Enter lightbox.
 *  - Next image preloaded.
 * Grid behavior:
 *  - CSS grid, 4/2/1 columns. Each photo keeps its true orientation:
 *    'wide' spans 2 columns at 3/2, 'tall' spans 1 at 3/4 — no cropping.
 *  - With no filter, photos are grouped per room with a heading and a
 *    "view all" link; with a filter, one flat ungrouped grid.
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
import { photos, type Photo, type PhotoCategory, categoryOrder } from '@/lib/photos';
import Lightbox from './Lightbox';

const SLIDE_DURATION_MS = 5000;
const TRANSITION_MS = 900;
const MIN_FILTER_COUNT = 5;
/** Photos shown per room before "view all" opens the full set. */
const PREVIEW_PER_CATEGORY = 6;
const LS_VIEW = 'portfolio_view';
const LS_FILTER = 'portfolio_filter';

type ViewMode = 'slideshow' | 'grid';
type Filter = PhotoCategory | 'all';

export default function PortfolioSection() {
  const { t, language } = useLanguage();

  // ── Persistent state ──────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try { return (localStorage.getItem(LS_VIEW) as ViewMode) || 'slideshow'; } catch { return 'slideshow'; }
  });
  const [activeFilter, setActiveFilter] = useState<Filter>(() => {
    try { return (localStorage.getItem(LS_FILTER) as Filter) || 'all'; } catch { return 'all'; }
  });

  useEffect(() => { try { localStorage.setItem(LS_VIEW, viewMode); } catch {} }, [viewMode]);
  useEffect(() => { try { localStorage.setItem(LS_FILTER, activeFilter); } catch {} }, [activeFilter]);

  // ── Filtered photos, in the order defined in photos.ts ────────────────
  const filteredPhotos = useMemo(
    () => (activeFilter === 'all' ? photos : photos.filter(p => p.category === activeFilter)),
    [activeFilter]
  );

  /*
   * Grid grouping. With no filter the grid is split per room, each showing at
   * most PREVIEW_PER_CATEGORY photos; with a filter it is one flat grid.
   *
   * `offset` is the group's start index inside gridPhotos — the flat list of
   * exactly what the grid renders, in render order. Cells pass
   * `offset + i` to the lightbox and the lightbox walks gridPhotos, so the
   * opened photo is always the clicked one and prev/next stay inside the set
   * the visitor can actually see. Deriving both from one array is what keeps
   * them in sync; never index the lightbox into `photos` directly.
   */
  const gridGroups = useMemo(() => {
    if (activeFilter !== 'all') return null;
    let offset = 0;
    const groups = [];
    for (const category of categoryOrder) {
      const all = photos.filter(p => p.category === category);
      if (all.length === 0) continue;
      const shown = all.slice(0, PREVIEW_PER_CATEGORY);
      groups.push({ category, shown, total: all.length, offset });
      offset += shown.length;
    }
    return groups;
  }, [activeFilter]);

  /** Exactly what the grid renders, flattened in render order. */
  const gridPhotos = useMemo(
    () => (gridGroups ? gridGroups.flatMap(g => g.shown) : filteredPhotos),
    [gridGroups, filteredPhotos]
  );

  // The lightbox walks whichever list the visitor is looking at.
  const lightboxPhotos = viewMode === 'grid' ? gridPhotos : filteredPhotos;

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
  const [manuallyPaused, setManuallyPaused] = useState(true);
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

  /*
   * One grid cell. `index` must be the photo's position in gridPhotos —
   * that is what the lightbox is handed, so a wrong value here opens the
   * wrong photo. Grouped sections pass group.offset + i for this reason.
   */
  const renderCell = (photo: Photo, index: number) => {
    const isWide = photo.orientation === 'wide';
    // Captions are owner-written and optional; blank ones render nothing at
    // all rather than an empty gradient bar.
    const caption = isWide ? photo.caption?.[language]?.trim() : '';
    return (
      <button
        key={photo.id}
        type="button"
        className={`portfolio-grid-cell ${isWide ? 'is-wide' : 'is-tall'}`}
        onClick={() => setLightboxIndex(index)}
        aria-label={photo.alt}
      >
        <picture>
          <source srcSet={`${photo.base}.avif`} type="image/avif" />
          <source srcSet={`${photo.base}.webp`} type="image/webp" />
          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="portfolio-grid-img" />
        </picture>
        {caption && <span className="portfolio-grid-caption">{caption}</span>}
        <span className="portfolio-grid-seq">{String(index + 1).padStart(2, '0')}</span>
      </button>
    );
  };

  const activePhoto = filteredPhotos[activeIdx];
  const leavingPhoto = leavingIdx !== null ? filteredPhotos[leavingIdx] : null;
  const progressKey = `${activeFilter}-${activeIdx}`;

  // Counter chip text
  const filterChip = activeFilter !== 'all' ? t.portfolio.categories[activeFilter] : null;

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-secondary">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-label section-accent">{t.portfolio.heading}</span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            {t.portfolio.subheading}
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
                  <source srcSet={`${leavingPhoto.base}.avif`} type="image/avif" />
                  <source srcSet={`${leavingPhoto.base}.webp`} type="image/webp" />
                  <img src={leavingPhoto.src} alt="" className="showcase-picture-img" draggable={false} decoding="async" />
                </picture>
              )}

              {/* Active slide */}
              {activePhoto && (
                <picture key={`active-${activePhoto.id}`} className="showcase-slide active">
                  <source srcSet={`${activePhoto.base}.avif`} type="image/avif" />
                  <source srcSet={`${activePhoto.base}.webp`} type="image/webp" />
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
                        <span>{t.portfolio.all_work}</span>
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
                          <span>{t.portfolio.categories[cat]}</span>
                          <span className="showcase-dropdown-count">{totalByCategory[cat] ?? 0}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Slideshow toggle button */}
              {filteredPhotos.length > 1 && (
                <button
                  type="button"
                  className="showcase-slideshow-btn"
                  onClick={(e) => { e.stopPropagation(); setManuallyPaused(p => !p); }}
                  aria-label={manuallyPaused ? 'Start slideshow' : 'Stop slideshow'}
                >
                  {manuallyPaused ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                      Slideshow
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                      Stop
                    </>
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
                  aria-label={t.portfolio.pause}
                  title={t.portfolio.pause}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </button>

                <span className="portfolio-grid-count">{gridPhotos.length} {t.portfolio.photos}</span>
              </div>

              {/* Category chips — the breadth of rooms is a selling point, so
                  it is spelled out rather than hidden behind an icon. */}
              <div className="portfolio-chips">
                <button
                  type="button"
                  className={`portfolio-chip ${activeFilter === 'all' ? 'active' : ''}`}
                  aria-pressed={activeFilter === 'all'}
                  onClick={() => selectFilter('all')}
                >
                  {t.portfolio.all_work}
                  <span className="portfolio-chip-count">{photos.length}</span>
                </button>
                {filterableCategories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`portfolio-chip ${activeFilter === cat ? 'active' : ''}`}
                    aria-pressed={activeFilter === cat}
                    onClick={() => selectFilter(cat)}
                  >
                    {t.portfolio.categories[cat]}
                    <span className="portfolio-chip-count">{totalByCategory[cat] ?? 0}</span>
                  </button>
                ))}
              </div>

              {gridGroups ? (
                /* Unfiltered: a section per room, capped at PREVIEW_PER_CATEGORY */
                gridGroups.map(group => (
                  <section key={group.category} className="portfolio-group">
                    <header className="portfolio-group-head">
                      <h3 className="portfolio-group-title font-display">
                        {t.portfolio.categories[group.category]}
                      </h3>
                      <span className="portfolio-group-rule" aria-hidden="true" />
                      <span className="portfolio-group-count">
                        {group.shown.length} {t.portfolio.count_of} {group.total}
                      </span>
                      {group.total > group.shown.length && (
                        <button
                          type="button"
                          className="portfolio-group-viewall"
                          onClick={() => selectFilter(group.category)}
                        >
                          {t.portfolio.view_all}
                          <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </header>
                    <div className="portfolio-grid">
                      {group.shown.map((photo, i) => renderCell(photo, group.offset + i))}
                    </div>
                  </section>
                ))
              ) : (
                /* Filtered: one flat grid of that room's photos */
                <div className="portfolio-grid">
                  {gridPhotos.map((photo, i) => renderCell(photo, i))}
                </div>
              )}
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
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() => setLightboxIndex(i => (i !== null && i < lightboxPhotos.length - 1 ? i + 1 : i))}
        />
      )}
    </section>
  );
}
