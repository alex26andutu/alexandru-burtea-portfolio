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
  // The bar floats as a frosted-glass panel; it firms up once scrolled.
  const surfaceClass = scrolled ? 'glass-nav is-scrolled' : 'glass-nav';

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
      className="fixed top-0 left-0 right-0 z-50 pt-3 md:pt-5"
    >
      <div className="container">
        <nav className={`flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-2xl transition-all duration-300 ${surfaceClass}`} aria-label="Main navigation">
          {/* Logo / Name */}
          <a
            href="#"
            aria-label="Alexandru Burtea"
            className={`font-display text-lg font-semibold tracking-tight transition-colors ${logoClass}`}
          >
            A<span className="text-primary">.</span> Burtea
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">

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
              className={`flex items-center rounded-lg border text-xs font-medium overflow-hidden transition-colors ${langBorderClass}`}
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
          className="md:hidden glass-nav is-scrolled mx-3 mt-2 rounded-2xl px-6 py-6 flex flex-col gap-5"
        >

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
              <span className="text-xs text-muted-foreground">{t.nav.language_label}</span>
              <div
                role="group"
                aria-label="Language"
                className="flex items-center rounded-lg border border-border text-xs font-medium overflow-hidden"
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
