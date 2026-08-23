/*
 * Server entry — used only at build time by scripts/prerender.mjs.
 *
 * Renders the app to static HTML that is injected into dist/index.html, so
 * crawlers and link-preview bots (LinkedIn, WhatsApp, Slack) see the real
 * content instead of an empty <div id="root">.
 *
 * The browser still boots with createRoot (not hydrateRoot) — the prerendered
 * markup is replaced on mount. That keeps us immune to hydration mismatches
 * from localStorage-dependent state and the randomly shuffled portfolio order.
 */

import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import App from './App';

export function render(url = '/'): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );
}
