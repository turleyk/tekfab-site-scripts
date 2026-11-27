# TekFab site scripts (public)

Scripts for shop.tekfab.co.uk (Zoho Commerce), served by GitHub Pages at
`https://scripts.tekfab.co.uk/site.js` (GitHub Pages, custom domain set in the `CNAME` file).

Zoho's Header Code loads that file with one line, so changes go live by committing here.
GitHub Pages updates within about 10 minutes. No Zoho publish is needed for these scripts.

Nothing in this repo is secret. Business notes and history live in the private repo `tekfab-website-code`.
The maintenance rules (who approves, how changes are logged and tested, change log) are in that repo's `MAINTENANCE.md`,
and its `deploy-map.yaml` lists every piece of code and where it is deployed.
Rule: this repo holds only what GitHub serves itself. Anything pasted into Zoho (page snippets, Header Code) lives in
`tekfab-website-code`.

| File | What it does |
|------|--------------|
| `src/00-core.js` | Helpers: run code when the page is ready, add CSS. |
| `src/10-filter-sort.js` | Sorts size filter options numerically on category pages and shows the smallest 15 until "Show All Filters" (fixed 27 Nov 2026, KMP 1 AZS9-I20). |
| `src/30-size-notice-box.js` | On lantern product pages, adds the "Need a different size?" box, pointing to the size finder on the category page, with a "Get a Custom Quote" button that opens the quote form pre-filled with the listing's width and length. |
| `src/40-trust-box.js` | On lantern product pages, adds the reassurance box under the price and hides the empty coupons and ratings sections. Defines `TF.TRUST_LINES`, the one reassurance list shared with the basket box (no phone hours, 27 Nov 2026). |
| `src/42-product-schema.js` | On lantern product pages, adds Product structured data (name, price, images, brand, condition) built from the page, only when Zoho's own Product markup is missing (Zoho serves Googlebot a copy without it). Brand, material, colours and in-stock are fixed in the file. |
| `src/45-basket-checkout.js` | On the basket, adds the reassurance box (the shared `TF.TRUST_LINES`) and a quote link under Checkout. At checkout, hides the coupon code box (no codes in use). |
| `src/55-size-finder.js` | On the four lantern category pages, adds the "Find your lantern size" box (nearest listed size via the existing filters, or a pre-filled quote) and crawlable "Common sizes" links. Replaced the older mobile quote box (`20-mobile-quote-widget.js`, retired 27 Nov 2026). Full width, lined up with the filter bar (sizes beside the form on wide screens); on phones it also caps the category hero at 190px and shows a "Buying guides" list when the theme hides the category description (27 Nov 2026). |
| `src/60-guide-pages.js` | Styles for the buying-guide pages and homepage intro block (classes starting `tfg-`). The content is real HTML in each page's code snippet (source: `tekfab-website-code/zoho/pages/`); this file only styles it. |
| `src/50-category-roof-lanterns.js` | Fallback only: adds the old Roof Lanterns SEO section if the page has no section in its category description. To be removed once the new descriptions are live. |
| `src/52-category-sections.js` | On the lantern category pages, moves the category section (real HTML in the Zoho category description, master copy in tekfab-website-code `zoho/categories/`) below the products so it shows on phones too, and adds FAQPage structured data from its FAQs (27 Nov 2026, KMP 1 AZS9-T44). |

Uptime check (not part of site.js):

| File | What it does |
|------|--------------|
| `uptime/check-shop.mjs` | Checks 20 shop pages (fixed list plus random products from the sitemap), one every 10 s. Fails if any page is down. |
| `uptime/pages.json` | The fixed pages it always checks, including the top Google Ads products. |
| `.github/workflows/uptime.yml` | Runs the check every 3 hours and on demand; GitHub emails Keith if it fails. Results go to `uptime/log.csv` on the `uptime-log` branch. |

To change something, edit the file in `src/`, run `./build.sh`, and commit both `src/` and `site.js`.

These stay pasted directly in Zoho Header Code, not here:
- the gclid fix, which must run before Zoho's own scripts
- the Trustpilot verification tag
