/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Portfolio: six category cards, one of which opens in place.
 *
 * Landing state — a card per room: lead photo at a fixed 3/2, the room name,
 * a line of description, the photo count and a "view all" affordance. Six
 * cards read as a body of work; a wall of thumbnails reads as a contact sheet.
 *
 * Open state — that category's photos in the two-ratio grid: 'wide' spans two
 * columns at 3/2, 'tall' spans one at 3/4, so nothing is cropped to fit a
 * uniform tile. A collapse control returns to the cards.
 *
 * The lightbox always receives the photos of the open category and an index
 * into that same array, so the photo that opens is the photo that was clicked.
 * Photo order is whatever photos.ts defines — fixed, never shuffled.
 * The open category is remembered in localStorage.
 */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { photos, populatedCategories, type Photo, type PhotoCategory } from '@/lib/photos';
import Lightbox from './Lightbox';

const LS_OPEN = 'portfolio_filter'; // kept: older visitors already store a category here

/*
 * Photos revealed when a category first opens. Living Rooms holds 19, which is
 * more scrolling than an employer will spend; the rest come in on request.
 */
const INITIAL_BATCH = 12;

export default function PortfolioSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  /*
   * null = the six cards. A category = that category opened.
   * The old key stored either 'all' or a category name, so a returning
   * visitor's value still maps cleanly onto this.
   */
  const [openCategory, setOpenCategory] = useState<PhotoCategory | null>(() => {
    try {
      const stored = localStorage.getItem(LS_OPEN);
      return stored && populatedCategories.includes(stored as PhotoCategory)
        ? (stored as PhotoCategory)
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_OPEN, openCategory ?? 'all');
    } catch {
      /* ignore */
    }
  }, [openCategory]);

  // ── Derived data ──────────────────────────────────────────────────────
  const byCategory = useMemo(() => {
    const map = new Map<PhotoCategory, Photo[]>();
    for (const cat of populatedCategories) {
      map.set(cat, photos.filter((p) => p.category === cat));
    }
    return map;
  }, []);

  /*
   * Card image. A wide photo fills a 3/2 card almost exactly; a portrait one
   * would lose about a third of its height, so prefer wide and fall back only
   * if a category has none.
   */
  const cards = useMemo(
    () =>
      populatedCategories.map((cat) => {
        const list = byCategory.get(cat)!;
        return {
          category: cat,
          lead: list.find((p) => p.orientation === 'wide') ?? list[0],
          count: list.length,
        };
      }),
    [byCategory]
  );

  const openPhotos = openCategory ? byCategory.get(openCategory)! : [];

  // ── Progressive reveal ────────────────────────────────────────────────
  const [showAll, setShowAll] = useState(false);
  // Collapsing back to the batch on every category change keeps the opening
  // view consistent, whichever category is picked.
  useEffect(() => setShowAll(false), [openCategory]);

  /*
   * What is actually on screen. It is a prefix of openPhotos, so a cell's
   * index is valid in both — but the lightbox is handed this list, not the
   * full one, so prev/next can never walk into photos that are still hidden.
   */
  const visiblePhotos = showAll ? openPhotos : openPhotos.slice(0, INITIAL_BATCH);
  const hiddenCount = openPhotos.length - visiblePhotos.length;

  // ── Lightbox ──────────────────────────────────────────────────────────
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // A category change must never leave the lightbox pointing into the old list.
  useEffect(() => setLightboxIndex(null), [openCategory]);

  const scrollToSection = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openCat = useCallback(
    (cat: PhotoCategory) => {
      setOpenCategory(cat);
      scrollToSection();
    },
    [scrollToSection]
  );

  const closeCat = useCallback(() => {
    setOpenCategory(null);
    scrollToSection();
  }, [scrollToSection]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:py-36 bg-secondary">
      <div className="container">
        <div className="mb-12">
          <span className="section-label section-accent">{t.portfolio.heading}</span>
          <p className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed">
            {t.portfolio.subheading}
          </p>
        </div>

        {openCategory === null ? (
          /* ── LANDING: six category cards ── */
          <div className="portfolio-cards">
            {cards.map(({ category, lead, count }) => (
              <button
                key={category}
                type="button"
                className="portfolio-card"
                onClick={() => openCat(category)}
                aria-label={`${t.portfolio.categories[category]} — ${count} ${t.portfolio.photos}`}
              >
                <span className="portfolio-card-media">
                  <picture>
                    <source srcSet={`${lead.base}.avif`} type="image/avif" />
                    <source srcSet={`${lead.base}.webp`} type="image/webp" />
                    <img
                      src={lead.src}
                      alt={lead.alt}
                      loading="lazy"
                      decoding="async"
                      className="portfolio-card-img"
                    />
                  </picture>
                </span>
                <span className="portfolio-card-body">
                  <span className="portfolio-card-title font-display">
                    {t.portfolio.categories[category]}
                  </span>
                  <span className="portfolio-card-blurb">
                    {t.portfolio.category_blurb[category]}
                  </span>
                  <span className="portfolio-card-foot">
                    <span className="portfolio-card-count">
                      {count} {t.portfolio.photos}
                    </span>
                    <span className="portfolio-card-cta">
                      {t.portfolio.view_all}
                      <span aria-hidden="true"> →</span>
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* ── OPEN: one category in the two-ratio grid ── */
          <div className="portfolio-grid-wrapper">
            <div className="portfolio-open-head">
              <button type="button" className="portfolio-back" onClick={closeCat}>
                <span aria-hidden="true">←</span>
                {t.portfolio.all_categories}
              </button>
              <h3 className="portfolio-open-title font-display">
                {t.portfolio.categories[openCategory]}
              </h3>
              <span className="portfolio-grid-count">
                {visiblePhotos.length === openPhotos.length
                  ? `${openPhotos.length} ${t.portfolio.photos}`
                  : `${visiblePhotos.length} / ${openPhotos.length} ${t.portfolio.photos}`}
              </span>
            </div>

            <div className="portfolio-grid">
              {visiblePhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  className={`portfolio-grid-cell ${
                    photo.orientation === 'wide' ? 'is-wide' : 'is-tall'
                  }`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={photo.alt}
                >
                  <picture>
                    <source srcSet={`${photo.base}.avif`} type="image/avif" />
                    <source srcSet={`${photo.base}.webp`} type="image/webp" />
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="portfolio-grid-img"
                    />
                  </picture>
                  <span className="portfolio-grid-seq">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            <div className="portfolio-open-foot">
              {hiddenCount > 0 && (
                <button
                  type="button"
                  className="portfolio-show-more"
                  onClick={() => setShowAll(true)}
                >
                  {t.portfolio.show_more}
                  <span className="portfolio-show-more-count">+{hiddenCount}</span>
                </button>
              )}
              <button type="button" className="portfolio-back" onClick={closeCat}>
                <span aria-hidden="true">←</span>
                {t.portfolio.all_categories}
              </button>
            </div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={visiblePhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
          onNext={() =>
            setLightboxIndex((i) => (i !== null && i < visiblePhotos.length - 1 ? i + 1 : i))
          }
        />
      )}
    </section>
  );
}
