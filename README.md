# TekFab site scripts (public)

Scripts for shop.tekfab.co.uk (Zoho Commerce), served by GitHub Pages at
`https://scripts.tekfab.co.uk/site.js` (GitHub Pages, custom domain set in the `CNAME` file).

Zoho's Header Code loads that file with one line, so changes go live by committing here.
GitHub Pages updates within about 10 minutes. No Zoho publish is needed for these scripts.

Nothing in this repo is secret. Business notes and history live in the private repo `tekfab-website-code`.

| File | What it does |
|------|--------------|
| `src/00-core.js` | Helpers: run code when the page is ready, add CSS. |
| `src/10-filter-sort.js` | Sorts size filter options numerically on category pages. |
| `src/20-mobile-quote-widget.js` | On mobile lantern category pages, adds the "Find Your Size or Get a Custom Quote" box. |
| `src/30-size-notice-box.js` | On lantern product pages, adds the "Need a different size?" box. |
| `src/40-trust-box.js` | On lantern product pages, adds the reassurance box under the price and hides the empty coupons and ratings sections. |

To change something, edit the file in `src/`, run `./build.sh`, and commit both `src/` and `site.js`.

These stay pasted directly in Zoho Header Code, not here:
- the gclid fix, which must run before Zoho's own scripts
- the Trustpilot verification tag

## Backlog
- Make the reassurance box a configurable, site-wide feature: general lines (delivery, VAT, contact) on every product, plus extra lines per product type (e.g. lead time and Sheerline guarantee for lanterns), driven by one settings block rather than code edits. (Keith, 6 Nov 2026)
