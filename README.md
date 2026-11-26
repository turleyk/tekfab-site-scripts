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
| `src/30-size-notice-box.js` | On lantern product pages, adds the "Need a different size?" box, with a "Get a Custom Quote" button that opens the quote form pre-filled with the listing's width and length. |
| `src/40-trust-box.js` | On lantern product pages, adds the reassurance box under the price and hides the empty coupons and ratings sections. |
| `src/45-basket-checkout.js` | On the basket, adds the reassurance box and a quote link under Checkout. At checkout, hides the coupon code box (no codes in use). |
| `src/55-size-finder.js` | On the four lantern category pages, adds the "Find your lantern size" box (nearest listed size via the existing filters, or a pre-filled quote) and crawlable "Common sizes" links. Replaces the older mobile quote box there. |
| `src/60-guide-pages.js` | Styles for the buying-guide pages and homepage intro block (classes starting `tfg-`). The content is real HTML in each page's code snippet; this file only styles it. |
| `guides/*.html` | Source of the code snippet on each buying-guide page (the snippet holds a copy; edit here, then paste into the page). |
| `src/50-category-roof-lanterns.js` | On the Roof Lanterns category page, adds the SEO section (intro, benefits, sizes, FAQ) under the products and FAQ structured data. |

To change something, edit the file in `src/`, run `./build.sh`, and commit both `src/` and `site.js`.

These stay pasted directly in Zoho Header Code, not here:
- the gclid fix, which must run before Zoho's own scripts
- the Trustpilot verification tag
