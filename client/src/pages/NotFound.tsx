/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * NotFound: Editorial 404 page consistent with the rest of the portfolio
 */

import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <span className="section-label section-accent inline-flex">Page not found</span>
        <h1 className="font-display text-7xl md:text-9xl font-light text-foreground leading-none mt-8 tracking-tight">
          404
        </h1>
        <p className="mt-8 text-foreground/75 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. It may have been moved
          or removed.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium tracking-wide hover:bg-foreground/85 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M13 7H1m5-5L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </button>
        </div>
      </div>
    </main>
  );
}
