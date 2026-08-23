/*
 * Post-build prerender: renders the app to static HTML and injects it into
 * dist/index.html so crawlers see real content, not an empty root div.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 * Deliberately fail-safe: if anything goes wrong we leave the SPA shell
 * untouched and exit 0, so a prerender problem can never break the deploy.
 */

import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const serverEntry = resolve(root, 'dist-server/entry-server.js');

const ROOT_DIV = '<div id="root"></div>';

async function main() {
  if (!existsSync(htmlPath)) {
    console.warn('[prerender] dist/index.html not found — skipping.');
    return;
  }
  if (!existsSync(serverEntry)) {
    console.warn('[prerender] server bundle not found — skipping.');
    return;
  }

  const html = readFileSync(htmlPath, 'utf8');
  if (!html.includes(ROOT_DIV)) {
    console.warn('[prerender] root div not found in index.html — skipping.');
    return;
  }

  const { render } = await import(pathToFileURL(serverEntry).href);
  const appHtml = render('/');

  if (!appHtml || appHtml.length < 500) {
    console.warn('[prerender] rendered output suspiciously small — skipping.');
    return;
  }

  writeFileSync(
    htmlPath,
    html.replace(ROOT_DIV, `<div id="root">${appHtml}</div>`),
    'utf8'
  );
  console.log(`[prerender] injected ${appHtml.length} bytes of static HTML.`);
}

main()
  .catch((err) => {
    console.warn('[prerender] failed, shipping SPA shell instead:', err?.message ?? err);
  })
  .finally(() => {
    // The server bundle is a build artifact — never publish it.
    rmSync(resolve(root, 'dist-server'), { recursive: true, force: true });
  });
