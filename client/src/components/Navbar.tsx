/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Navbar: Minimal, floating, with language toggle and dark-mode toggle
 * Behavior: Subtle gradient over hero, solid surface on scroll
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme, switchable } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'process', href: '#process' },
    { key: 'contact', href: '#contact' },
  ];

  // Color classes: when over hero (not scrolled) we stay light-on-image;
  // when scrolled we adopt theme tokens so dark mode works.
  const surfaceClass = scrolled
    ? 'bg-background/90 backdrop-blur-md shadow-[0_1px_0_var(--border)]'
    : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent';

  const logoClass = scrolled ? 'text-foreground' : 'text-white';
  const linkClass = scrolled
    ? 'text-foreground/80 hover:text-primary'
    : 'text-white/90 hover:text-white';
  const langBorderClass = scrolled ? 'border-border' : 'border-white/30';
  const langInactiveClass = scrolled
    ? 'text-muted-foreground hover:bg-muted'
    : 'text-white/85 hover:text-white';
  const iconBtnClass = scrolled
    ? 'text-foreground hover:text-primary'
    : 'text-white hover:text-white/80';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${surfaceClass}`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          {/* Logo / Name */}
          <a
            href="#"
            className={`font-display text-lg font-semibold tracking-tight transition-colors ${logoClass}`}
          >
            Alexandru Burtea
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Availability pill — appears on scroll */}
            <a
              href="#contact"
              aria-label={t.nav.available}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium tracking-wide transition-all border ${
                scrolled
                  ? 'border-primary/40 text-primary hover:bg-primary/10 opacity-100 translate-y-0'
                  : 'border-white/30 text-white/85 hover:bg-white/10 opacity-100 translate-y-0'
              }`}
            >
              <span className={`availability-dot ${scrolled ? '' : 'on-image'}`} />
              {t.nav.available}
            </a>

            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={`text-sm font-medium transition-colors ${linkClass}`}
              >
                {t.nav[link.key as keyof typeof t.nav]}
              </a>
            ))}

            {/* Language toggle */}
            <div
              role="group"
              aria-label="Language"
              className={`flex items-center rounded-sm border text-xs font-medium overflow-hidden transition-colors ${langBorderClass}`}
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : langInactiveClass
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('nl')}
                aria-pressed={language === 'nl'}
                className={`px-3 py-1.5 transition-colors ${
                  language === 'nl'
                    ? 'bg-primary text-primary-foreground'
                    : langInactiveClass
                }`}
              >
                NL
              </button>
            </div>

            {/* Theme toggle */}
            {switchable && toggleTheme && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 transition-colors ${iconBtnClass}`}
              >
                {theme === 'dark' ? (
                  // Sun
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  // Moon
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`md:hidden flex flex-col gap-1.5 p-2 ${iconBtnClass}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5"
        >
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 text-xs font-medium tracking-wide border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          >
            <span className="availability-dot" />
            {t.nav.available}
          </a>

          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-base font-medium text-foreground/85 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </a>
          ))}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Language:</span>
              <div
                role="group"
                aria-label="Language"
                className="flex items-center rounded-sm border border-border text-xs font-medium overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                  className={`px-3 py-1.5 transition-colors ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('nl')}
                  aria-pressed={language === 'nl'}
                  className={`px-3 py-1.5 transition-colors ${
                    language === 'nl'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  NL
                </button>
              </div>
            </div>

            {switchable && toggleTheme && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
