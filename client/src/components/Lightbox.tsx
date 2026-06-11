/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Lightbox: Full-screen photo viewer with keyboard nav, click-to-zoom,
 *           share (Web Share API + clipboard fallback), and download.
 */

import { useCallback, useEffect, useState } from 'react';
import { Photo } from '@/lib/photos';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const photo = photos[currentIndex];
  const [zoomed, setZoomed] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  // Reset zoom when image changes
  useEffect(() => {
    setZoomed(false);
  }, [currentIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === ' ' || e.key === 'Enter') {
        // Spacebar / Enter toggles zoom
        e.preventDefault();
        setZoomed((z) => !z);
      }
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  async function handleShare() {
    if (!photo) return;
    const url = `${window.location.origin}${photo.src}`;
    const title = 'Alexandru Burtea — Custom Furniture';
    const text = photo.alt;

    // Web Share API on supported browsers (mostly mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus('copied');
      window.setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      /* ignore */
    }
  }

  if (!photo) return null;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      {/* Toolbar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 py-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-white/60 text-xs tracking-widest font-medium">
          {currentIndex + 1} / {photos.length}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
            title={zoomed ? 'Zoom out' : 'Zoom in'}
          >
            {zoomed ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M8 11h6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full relative"
            onClick={handleShare}
            aria-label="Share photo"
            title="Share photo"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            {shareStatus === 'copied' && (
              <span className="absolute -bottom-7 right-0 text-[10px] uppercase tracking-widest text-white/80 whitespace-nowrap">
                Link copied
              </span>
            )}
          </button>
          <a
            href={photo.src}
            download
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Download photo"
            title="Download photo"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            type="button"
            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            onClick={onClose}
            aria-label="Close"
            title="Close (Esc)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <picture>
          <source srcSet={photo.src.replace(/\.jpg$/, '.avif')} type="image/avif" />
          <source srcSet={photo.src.replace(/\.jpg$/, '.webp')} type="image/webp" />
          <img
            src={photo.src}
            alt={photo.alt}
            className={`lightbox-img max-w-full max-h-[85vh] object-contain ${
              zoomed ? 'zoomed' : ''
            }`}
            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
            onClick={() => setZoomed((z) => !z)}
            draggable={false}
          />
        </picture>
      </div>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous (← arrow)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < photos.length - 1 && (
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next (→ arrow)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Caption + alt at bottom */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs px-4 text-center max-w-[80vw] leading-relaxed"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.alt}
      </div>
    </div>
  );
}
