/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Footer: Minimal, dark surface continuation from Contact
 */

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-deeper text-on-deep py-10 md:py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-on-deep/85 text-sm">Alexandru Burtea</span>
            <span className="text-on-deep/25" aria-hidden="true">·</span>
            <span className="text-on-deep/45 text-xs">{t.footer.tagline}</span>
          </div>
          <p className="text-on-deep/35 text-xs">{t.footer.text}</p>
        </div>
      </div>
    </footer>
  );
}
