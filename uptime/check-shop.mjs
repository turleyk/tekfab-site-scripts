#!/usr/bin/env node
// TekFab shop uptime check – is shop.tekfab.co.uk up and showing its pages?
//
// Runs by itself on GitHub Actions every 3 hours (.github/workflows/uptime.yml), and once straight
// after any Zoho publish. Plain Node 20, no packages.
//
//   node uptime/check-shop.mjs                 check the pages, print the result
//   node uptime/check-shop.mjs --log FILE      also append one line to the CSV log
//
// What it checks (20 pages, one every 10 seconds – never a full-catalogue crawl):
//   - the fixed pages in uptime/pages.json (home, quote form, categories, top Google Ads products)
//   - a few product pages picked at random from the store sitemap, so over time the whole range is sampled
// A page passes if it returns HTTP 200, is a real-sized page, and is not Zoho's "page not found" screen.
// A page that fails is tried once more after 60 seconds before it counts as down (to ignore blips).
// Exit code 1 if anything is down – GitHub then emails Keith. Nothing else ever alerts.
//
// It downloads the HTML only and runs no page scripts, so Google Analytics and Google Ads never see it.
// It identifies itself as "TekFab-uptime-check".

import { readFileSync, appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cfg = JSON.parse(readFileSync(join(here, 'pages.json'), 'utf8'));
const args = process.argv.slice(2);
const logFile = args.includes('--log') ? args[args.indexOf('--log') + 1] : null;

const BASE = 'https://shop.tekfab.co.uk';
const UA = 'TekFab-uptime-check/1.0 (+https://github.com/turleyk/tekfab-site-scripts)';
const GAP_MS = 10_000;          // one page every 10 s
const RETRY_WAIT_MS = 60_000;   // second try for a failed page
const TOTAL = cfg.total_pages ?? 20;
const MIN_BYTES = 15_000;       // Zoho's error pages are tiny compared with a real page
const NOT_FOUND = [/page not found/i, /page you are looking for/i, /this page (is|isn['’]t) (not )?available/i,
  /product (is )?(not|no longer) available/i];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html' }, redirect: 'follow', signal: ctrl.signal });
    const body = await res.text();
    return { status: res.status, body, finalUrl: res.url };
  } catch (e) {
    return { status: 0, body: '', error: e.name === 'AbortError' ? 'timed out after 30 s' : e.message };
  } finally {
    clearTimeout(t);
  }
}

function judge(page, r) {
  if (r.status !== 200) return r.error ? `no response (${r.error})` : `HTTP ${r.status}`;
  if (r.body.length < MIN_BYTES) return `page too small (${r.body.length} bytes) – probably an error page`;
  const hit = NOT_FOUND.find((re) => re.test(r.body));
  if (hit) return 'shows a "not found" message';
  if (page.type === 'product') {
    // A real product page carries its own Zoho product ID; the 404 page does not.
    const id = page.path.split('/').pop();
    if (/^\d{10,}$/.test(id) && !r.body.includes(id)) return 'product details missing from the page';
  }
  if (r.finalUrl && !r.finalUrl.startsWith(BASE)) return `redirected away to ${r.finalUrl}`;
  return null;
}

async function randomProducts(n, exclude) {
  const r = await get(`${BASE}/sitemap-store.xml`);
  if (r.status !== 200) throw new Error(`store sitemap not available (${r.error || 'HTTP ' + r.status})`);
  const paths = [...r.body.matchAll(/<loc>\s*https:\/\/shop\.tekfab\.co\.uk(\/products\/[^<\s]+)\s*<\/loc>/g)]
    .map((m) => m[1]).filter((p) => !exclude.has(p));
  if (paths.length < 100) throw new Error(`store sitemap lists only ${paths.length} products – expected thousands`);
  const picked = new Set();
  while (picked.size < n) picked.add(paths[Math.floor(Math.random() * paths.length)]);
  return { pages: [...picked].map((p) => ({ name: 'Random product', path: p, type: 'product' })), sitemapCount: paths.length };
}

const started = new Date();
const fixed = cfg.pages;
const failures = [];
let pages = [...fixed];
let note = '';

try {
  const { pages: extra, sitemapCount } = await randomProducts(Math.max(0, TOTAL - fixed.length), new Set(fixed.map((p) => p.path)));
  pages = pages.concat(extra);
  note = `store sitemap lists ${sitemapCount} products`;
} catch (e) {
  failures.push({ name: 'Store sitemap', path: '/sitemap-store.xml', why: e.message });
}
await sleep(GAP_MS);

for (const [i, page] of pages.entries()) {
  let why = judge(page, await get(BASE + page.path));
  if (why) {
    await sleep(RETRY_WAIT_MS);
    const second = judge(page, await get(BASE + page.path));
    why = second ? `${second} (failed twice, 60 s apart)` : null;
  }
  console.log(`${why ? 'DOWN' : 'ok  '}  ${page.name.padEnd(34)} ${page.path}${why ? '  – ' + why : ''}`);
  if (why) failures.push({ ...page, why });
  if (i < pages.length - 1) await sleep(GAP_MS);
}

const ok = failures.length === 0;
const checked = pages.length + 1; // + the sitemap
console.log(`\n${ok ? 'SHOP UP' : 'SHOP PROBLEM'}: ${checked - failures.length}/${checked} OK at ${started.toISOString()}${note ? ' – ' + note : ''}`);

if (logFile) {
  if (!existsSync(logFile)) writeFileSync(logFile, 'checked_at_utc,result,pages_checked,pages_down,down_pages\n');
  const down = failures.map((f) => `${f.path} (${f.why})`).join(' | ').replace(/"/g, "'");
  appendFileSync(logFile, `${started.toISOString()},${ok ? 'up' : 'down'},${checked},${failures.length},"${down}"\n`);
}

if (!ok) {
  const summary = ['## Shop pages down', '', `Checked ${started.toISOString()} (UTC). ${failures.length} of ${checked} failed:`, '',
    ...failures.map((f) => `- **${f.name}** – ${BASE}${f.path} – ${f.why}`)].join('\n');
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
  process.exit(1);
}
