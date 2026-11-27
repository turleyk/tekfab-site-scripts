/* TekFab site scripts for shop.tekfab.co.uk. Built 2026-11-27T16:47Z from src/. Do not edit site.js directly. */
(function () {

// TekFab site scripts core helpers. Loaded from Zoho Commerce Header Code via GitHub Pages.
var TF = window.TF || {};
window.TF = TF;
TF.ready = function (fn) {
  var safe = function () { try { fn(); } catch (e) { if (window.console) { console.warn('TF script error', e); } } };
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', safe); } else { safe(); }
};
TF.css = function (text) {
  var st = document.createElement('style');
  st.setAttribute('data-tf', '1');
  st.textContent = text;
  (document.head || document.documentElement).appendChild(st);
};

// Sorts numeric filter options (e.g. Width, Length) in number order on category pages. Originally a Zoho Header Code snippet.
function reorderByNumericValue() {
let wrappers = document.querySelectorAll("[data-zs-filter-option-values-wrapper]");
wrappers.forEach(wrapper => {
let filterOptionContainers = Array.from(wrapper.querySelectorAll("[data-zs-filter-option-value-container]"));

let sortedContainers = filterOptionContainers
.filter(filterOption => {
let optionElement = filterOption.querySelector("[data-zs-filter-option-value-formatted]");
if (optionElement) {
let optionValue = optionElement.getAttribute("data-zs-filter-option-value-formatted");
return !isNaN(optionValue);
}
})
.sort((a, b) => {
let aValue = parseFloat(a.querySelector("[data-zs-filter-option-value-formatted]").getAttribute("data-zs-filter-option-value-formatted"));
let bValue = parseFloat(b.querySelector("[data-zs-filter-option-value-formatted]").getAttribute("data-zs-filter-option-value-formatted"));
return bValue - aValue;
});

sortedContainers.forEach(container => {
wrapper.insertBefore(container, wrapper.firstChild);
});
let defaultValueElement = wrapper.closest("[data-zs-filter-option-default-value-to-show]");
let totalOptions = sortedContainers.length;
if (defaultValueElement) {
let maxVisibleOptions = parseInt(defaultValueElement.getAttribute("data-zs-filter-option-default-value-to-show"), 10) || 0;
// sortedContainers runs largest first; show the smallest N, the same as Zoho's own "Show less".
sortedContainers.slice().reverse().forEach((container, index) => {
if (maxVisibleOptions > 0 && index >= maxVisibleOptions && maxVisibleOptions < totalOptions) {
container.style.display = "none";
} else {
container.style.display = "flex";
}
});
}
});
}

TF.ready(reorderByNumericValue);
document.addEventListener("zp-event-search-success", reorderByNumericValue);
document.addEventListener('click', (event) => {
if (event.target.matches('[data-zs-filter-option-value], [data-zs-filter-refineby-clear-btn], [data-zs-selected-filter] svg')) {
setTimeout(() => {
reorderByNumericValue();
}, 2000);
}
});

// Lantern product pages: "Need a different size?" box above the price. Originally a Zoho Header Code snippet.
TF.css(".size-notice-box {\nbackground-color: #f8fafc;\nborder: 2px solid #0284c7;\nborder-radius: 8px;\npadding: 14px 18px;\nmargin: 12px 0 16px 0;\nbox-shadow: 0 2px 4px rgba(0,0,0,0.05);\nfont-family: inherit;\n}\n.size-notice-breadcrumb {\nfont-size: 11px;\ntext-transform: uppercase;\nletter-spacing: 0.5px;\nfont-weight: 700;\ncolor: #64748b;\nmargin-bottom: 4px;\n}\n.size-notice-breadcrumb a {\ncolor: #0284c7 !important;\ntext-decoration: none !important;\n}\n.size-notice-breadcrumb a:hover {\ntext-decoration: underline !important;\n}\n.size-notice-title {\nfont-size: 14px;\nfont-weight: 700;\ncolor: #0f172a;\nmargin-bottom: 4px;\ndisplay: flex;\nalign-items: center;\ngap: 6px;\n}\n.size-notice-desc {\nfont-size: 12px;\ncolor: #475569;\nmargin-bottom: 8px;\nline-height: 1.35;\n}\n.size-notice-guide {\nbackground-color: #f1f5f9;\nborder-left: 3px solid #0284c7;\npadding: 6px 10px;\nmargin-bottom: 10px;\nfont-size: 11px;\ncolor: #334155;\nline-height: 1.35;\nborder-radius: 0 4px 4px 0;\n}\n.size-notice-btn {\ndisplay: block;\ntext-align: center;\nbackground-color: #0284c7;\ncolor: #ffffff !important;\nfont-weight: 600;\nfont-size: 13px;\npadding: 8px 12px;\nborder-radius: 5px;\ntext-decoration: none !important;\ntransition: background-color 0.2s;\n}\n.size-notice-btn:hover {\nbackground-color: #0369a1;\n}\n.size-notice-quote {\nmargin-top: 10px;\npadding-top: 10px;\nborder-top: 1px solid #e2e8f0;\n}\n.size-notice-quote-title {\nfont-size: 13px;\nfont-weight: 700;\ncolor: #0f172a;\nmargin-bottom: 3px;\n}\n.size-notice-quote-desc {\nfont-size: 12px;\ncolor: #475569;\nmargin-bottom: 8px;\nline-height: 1.35;\n}\n.size-notice-btn-alt {\ndisplay: block;\ntext-align: center;\nbackground-color: #ffffff;\ncolor: #0284c7 !important;\nborder: 2px solid #0284c7;\nfont-weight: 600;\nfont-size: 13px;\npadding: 6px 12px;\nborder-radius: 5px;\ntext-decoration: none !important;\n}\n.size-notice-btn-alt:hover {\nbackground-color: #f0f9ff;\n}\n.size-notice-nav {\nmargin-top: 10px;\npadding-top: 8px;\nborder-top: 1px solid #e2e8f0;\nfont-size: 11px;\ncolor: #64748b;\nline-height: 1.4;\n}\n.size-notice-nav a {\ncolor: #0284c7 !important;\ntext-decoration: underline !important;\nfont-weight: 500;\n}\n.size-notice-nav a:hover {\ncolor: #0369a1 !important;\n}\n\n/* MOBILE-SPECIFIC OPTIMIZATIONS */\n@media (max-width: 600px) {\n.size-notice-box {\npadding: 10px 12px;\nmargin: 10px 0 14px 0;\n}\n.size-notice-title {\nfont-size: 13px;\n}\n.size-notice-desc {\nfont-size: 11px;\n}\n.size-notice-guide {\nfont-size: 11px;\npadding: 5px 8px;\nmargin-bottom: 8px;\n}\n.size-notice-btn {\nfont-size: 12px;\npadding: 7px 10px;\n}\n}");
TF.ready(function() {
if (document.querySelector('.size-notice-box')) { return; } // already added
// Only evaluate logic if we are on a product page
if (!window.location.pathname.includes('/products/')) {
return;
}

var currentPath = window.location.pathname.toLowerCase();

// STRICT PAGE GUARD: Only display on Roof Lantern SKU pages
var isLanternProduct = currentPath.includes("ridged-aluminium-lantern-roof") ||
currentPath.includes("single-vented-aluminium-lantern-roof") ||
currentPath.includes("double-vented-aluminium-lantern-roof") ||
currentPath.includes("pyramid-aluminium-lantern-roof");

if (!isLanternProduct) {
return; // Exit immediately for non-lantern products (e.g. rain sensors, accessories)
}

// DEFAULT FALLBACK VALUES
var targetUrl = "https://shop.tekfab.co.uk/categories/roof-lanterns/1565765000030904207";
var buttonText = "Find Your Lantern Size →";
var styleName = "Roof Lantern";
var styleDesc = "<strong>Quick Style Guide:</strong> Ridged lanterns are rectangular, Pyramids are square, and Vented options add electric opening vents for airflow.";

// ROUTE 1: Ridged Lanterns
if (currentPath.includes("ridged-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/ridged-lanterns/1565765000052482103";
buttonText = "Find Your Ridged Lantern Size →";
styleName = "Ridged Lanterns";
styleDesc = "<strong>Ridged Style:</strong> Designed for standard rectangular roof openings (not square).";
}
// ROUTE 2: Single Vented Lanterns
else if (currentPath.includes("single-vented-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/vented-roof-lanterns/1565765000052482117?pf=32328000003634033_Type_Single_Vented_Aluminium_Lantern_Roof";
buttonText = "Find Your Single Vented Size →";
styleName = "Vented Lanterns (Single)";
styleDesc = "<strong>Vented Style:</strong> Standard rectangular ridged lantern equipped with 1 electric opening vent for ventilation.";
}
// ROUTE 3: Double Vented Lanterns
else if (currentPath.includes("double-vented-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/vented-roof-lanterns/1565765000052482117?pf=32328000003634033_Type_Double_Vented_Aluminium_Lantern_Roof";
buttonText = "Find Your Double Vented Size →";
styleName = "Vented Lanterns (Double)";
styleDesc = "<strong>Vented Style:</strong> Standard rectangular ridged lantern equipped with 2 electric opening vents for maximum ventilation.";
}
// ROUTE 4: Pyramid Lanterns
else if (currentPath.includes("pyramid-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/pyramid-lanterns/1565765000052482061";
buttonText = "Find Your Pyramid Lantern Size →";
styleName = "Pyramid Lanterns";
styleDesc = "<strong>Pyramid Style:</strong> Designed specifically for perfectly square roof openings (equal length and width).";
}

// CUSTOM QUOTE LINK: pre-fill the quote form with this listing's size, read from the page address.
var quoteUrl = "https://shop.tekfab.co.uk/roof-lantern-quote-v2";
var sizeMatch = currentPath.match(/-(\d+(?:-\d+)?)m-x-(\d+(?:-\d+)?)m-/);
if (sizeMatch) {
var toMm = function (t) { return Math.round(parseFloat(t.replace('-', '.')) * 1000); };
quoteUrl += "?width=" + toMm(sizeMatch[1]) + "&length=" + toMm(sizeMatch[2]);
}

// NOTICE BOX HTML TEMPLATE
var bannerHTML = `
<div class="size-notice-box">
<!-- Breadcrumb Navigation -->
<div class="size-notice-breadcrumb">
<a href="https://shop.tekfab.co.uk/categories/roof-lanterns/1565765000030904207">Roof Lanterns</a> &gt; ${styleName}
</div>

<div class="size-notice-title">
<span>📐</span> Need a different size for your roof opening?
</div>
<div class="size-notice-desc">
This listing is for one set size. Enter your upstand width and length in the size finder on the category page to see the nearest listed size.
</div>

<!-- Quick Style Guide Callout -->
<div class="size-notice-guide">
${styleDesc}
</div>

<!-- Main Action Button -->
<a href="${targetUrl}" class="size-notice-btn">
${buttonText}
</a>

<!-- Custom Quote -->
<div class="size-notice-quote">
<div class="size-notice-quote-title">Need an exact size? Get a custom quote</div>
<div class="size-notice-quote-desc">Every lantern is made to order. If your roof opening isn't a standard size, tell us your measurements and we'll quote for a lantern made to fit.</div>
<a href="${quoteUrl}" class="size-notice-btn-alt">Get a Custom Quote →</a>
</div>

<!-- Quick-Jump Cross Navigation -->
<div class="size-notice-nav">
Looking for a different style? Browse:
<a href="https://shop.tekfab.co.uk/categories/ridged-lanterns/1565765000052482103">Ridged (Rectangular)</a> |
<a href="https://shop.tekfab.co.uk/categories/pyramid-lanterns/1565765000052482061">Pyramid (Square)</a> |
<a href="https://shop.tekfab.co.uk/categories/vented-roof-lanterns/1565765000052482117">Vented (Electric Opening)</a>
</div>
</div>
`;

// DOM INJECTION: Target price element
var target = document.querySelector('.product-price, .zs-product-price, [class*="product-price"], [class*="price"]');
if (target) {
target.insertAdjacentHTML('beforebegin', bannerHTML);
}
});

// Lantern product pages: reassurance box under the price; hides empty coupon and ratings sections. Originally a Zoho Header Code snippet.
TF.css(".tf-trust-box{border:1px solid #e2e8f0;border-radius:8px;background:#fff;padding:12px 16px;margin:4px 0 16px 0;font-family:inherit}\n.tf-trust-box ul{list-style:none;margin:0;padding:0}\n.tf-trust-box li{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.4;color:#1e293b;padding:4px 0}\n.tf-trust-box li span.tf-tick{color:#16a34a;font-weight:700;flex:0 0 auto}\n.tf-trust-box small{display:block;color:#64748b;font-size:11px;margin-top:1px}\n.tf-trust-box a{color:#0284c7 !important;text-decoration:none !important;font-weight:600}\n@media (max-width:600px){.tf-trust-box{padding:10px 12px}.tf-trust-box li{font-size:12px}}");
// Reassurance lines shared by the product-page box (here) and the basket box (45-basket-checkout.js).
// Phone hours deliberately not shown (Keith, 27 Nov 2026).
TF.TRUST_LINES =
      '<li><span class="tf-tick">&#10003;</span><div>Free delivery to most UK mainland postcodes' +
        '<small>Some areas (e.g. Scotland, Cornwall, parts of Kent) carry a delivery charge, shown at checkout before you pay.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Made to order, delivered in around 10 days (15 days for vented lanterns)' +
        '<small>From payment clearing.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Price includes VAT</div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Sheerline S1 system: 25-year manufacturer guarantee' +
        '<small>Covers the aluminium profiles, powder-coated finish and thermal performance (gaskets 10 years).</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Questions? Call <a href="tel:01785508212">01785 508212</a> ' +
        'or email <a href="mailto:enquiries@tekfab.co.uk">enquiries@tekfab.co.uk</a></div></li>';
(function () {
  var LANTERN_SLUGS = ['ridged-aluminium-lantern-roof', 'single-vented-aluminium-lantern-roof',
                       'double-vented-aluminium-lantern-roof', 'pyramid-aluminium-lantern-roof'];

  function isLanternPage() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('/products/') === -1) { return false; }
    return LANTERN_SLUGS.some(function (s) { return p.indexOf(s) > -1; });
  }

  var HTML = '<div class="tf-trust-box" id="tf-trust-box"><ul>' + TF.TRUST_LINES + '</ul></div>';

  function hideEmptySections() {
    var all = document.querySelectorAll('details');
    for (var i = 0; i < all.length; i++) {
      var d = all[i];
      var s = d.querySelector('summary');
      if (!s) { continue; }
      var title = s.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      var body = d.textContent.toLowerCase();
      if (title.indexOf('available coupons') === 0 && body.indexOf('no coupons available') > -1) { d.style.display = 'none'; }
      if (title.indexOf('ratings and reviews') === 0 && body.indexOf('no ratings') > -1) { d.style.display = 'none'; }
    }
  }

  function addTrustBox() {
    if (document.getElementById('tf-trust-box')) { return; }
    var price = document.querySelector('.theme-desktop-product-data > [data-zs-pricing-container]') ||
                document.querySelector('[data-zs-pricing-container]');
    if (price) { price.insertAdjacentHTML('afterend', HTML); }
  }

  function run() {
    if (!isLanternPage()) { return; }
    try { addTrustBox(); hideEmptySections(); } catch (e) { /* never break the page */ }
  }

  TF.ready(function () {
    run();
    // Zoho re-draws parts of the page (e.g. after choosing options), so re-apply when that happens.
    var timer = null;
    try {
      new MutationObserver(function () {
        clearTimeout(timer);
        timer = setTimeout(run, 300);
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  });
})();

// Lantern product pages: Product structured data (JSON-LD) for Google.
// Why: Zoho Commerce generates Product markup for visitors, but the copy it serves to Googlebot has none
// (Rich Results Test 27 Nov 2026 found only Organization and BreadcrumbList), so Google shows no price or stock.
// This adds a Product block built from what the page itself shows, ONLY when no Product block is already there,
// so visitors and other search engines keep Zoho's and no page ever has two. Approved by Keith 27 Nov 2026
// (KMP 1 AZS9-T45; check in KMP 4 A21Y-T28). No returns or delivery details yet (Keith's decision); no reviews.
// Updates itself on every page load: name (h1), price and currency (Zoho's data-zs-selling-price), images,
// description (product SEO description in Commerce), page address and product ID.
// FIXED HERE (change this file if they change): brand 'Sheerline', material 'Aluminium', the colour list,
// availability 'InStock' (all lanterns are made to order), and the four lantern URL types in LANTERN_SLUGS.
(function () {
  var LANTERN_SLUGS = ['ridged-aluminium-lantern-roof', 'single-vented-aluminium-lantern-roof',
                       'double-vented-aluminium-lantern-roof', 'pyramid-aluminium-lantern-roof'];

  function isLanternPage() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('/products/') === -1) { return false; }
    return LANTERN_SLUGS.some(function (s) { return p.indexOf(s) > -1; });
  }

  function hasProductMarkup() {
    var blocks = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < blocks.length; i++) {
      if (/"@type"\s*:\s*"Product"/.test(blocks[i].textContent)) { return true; }
    }
    return false;
  }

  function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  function build() {
    var name = text(document.querySelector('h1'));
    var priceEl = document.querySelector('[data-zs-selling-price]');
    var price = priceEl && priceEl.getAttribute('data-zs-selling-price');
    var currency = (priceEl && priceEl.getAttribute('data-zs-currency-code')) || 'GBP';
    if (!name || !price || isNaN(parseFloat(price))) { return null; }

    var canon = document.querySelector('link[rel="canonical"]');
    var url = canon && canon.href ? canon.href : window.location.origin + window.location.pathname;
    var meta = document.querySelector('meta[name="description"]');
    var idEl = document.querySelector('[data-zs-product-id]');

    var seen = {}, images = [];
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length && images.length < 8; i++) {
      var src = (imgs[i].currentSrc || imgs[i].src || '').split('?')[0];
      if (/\/product-images\//.test(src) && !seen[src]) { seen[src] = 1; images.push(src); }
    }

    var data = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: name,
      url: url,
      brand: { '@type': 'Brand', name: 'Sheerline' },
      material: 'Aluminium',
      color: 'Pure White, Anthracite Grey, Jet Black',
      offers: {
        '@type': 'Offer',
        url: url,
        price: String(parseFloat(price).toFixed(2)),
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: 'TekFab' }
      }
    };
    if (meta && meta.content) { data.description = meta.content.trim(); }
    if (images.length) { data.image = images; }
    if (idEl) { data.productID = idEl.getAttribute('data-zs-product-id'); }
    return data;
  }

  function run() {
    if (!isLanternPage() || document.getElementById('tf-product-ld') || hasProductMarkup()) { return true; }
    var data = build();
    if (!data) { return false; } // page not ready yet
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'tf-product-ld';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
    return true;
  }

  TF.ready(function () {
    try {
      if (run()) { return; }
      var tries = 0, iv = setInterval(function () {
        try { if (run() || ++tries > 20) { clearInterval(iv); } } catch (e) { clearInterval(iv); }
      }, 300);
    } catch (e) { /* never break the page */ }
  });
})();

// Basket and checkout (approved by Keith 25 Nov 2026, KMP 4 A21Y-T23):
// - basket: reassurance box under the Checkout button (desktop and mobile summaries)
// - checkout: hide the coupon code box (no coupon codes in use)
TF.css(".theme-cart-details-coupon-wrap{display:none !important}\n.tf-basket-trust{margin:12px 0 0 0}\n.tf-basket-trust .tf-quote-link{display:block;margin-top:8px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:13px}");
(function () {
  var HTML =
    '<div class="tf-trust-box tf-basket-trust"><ul>' + TF.TRUST_LINES + '</ul>' +
    '<a class="tf-quote-link" href="https://shop.tekfab.co.uk/roof-lantern-quote-v2">Prefer a written quote first? Request one here &rarr;</a>' +
    '</div>';

  function isBasket() { return /^\/cart\/?$/i.test(window.location.pathname); }

  function addBox() {
    // Only the main basket summary (shown on desktop and mobile). Zoho's separate mobile
    // sticky bar is left alone so the box can't cover the screen.
    var areas = document.querySelectorAll('.theme-cart-summary-inner-container .theme-checkout-button-area');
    for (var i = 0; i < areas.length; i++) {
      var a = areas[i];
      var btn = a.querySelector('button.theme-checkout-button');
      if (!btn || /empty/i.test(btn.parentElement.className)) { continue; } // empty basket
      var next = a.nextElementSibling;
      if (next && next.classList && next.classList.contains('tf-basket-trust')) { continue; }
      a.insertAdjacentHTML('afterend', HTML);
    }
  }

  function run() {
    if (!isBasket()) { return; }
    try { addBox(); } catch (e) { /* never break the page */ }
  }

  TF.ready(function () {
    run();
    var timer = null;
    try {
      new MutationObserver(function () {
        clearTimeout(timer);
        timer = setTimeout(run, 300);
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  });
})();

// Roof Lanterns category page: SEO content section under the product list, plus FAQ structured data.
// Approved by Keith 26 Nov 2026 (KMP 4 A21Y-T22). Copy: project doc "Roof Lanterns Category Copy – Draft".
TF.css(".tf-cat-seo{max-width:1100px;margin:40px auto 24px;padding:0 20px;font-family:inherit;color:#1e293b;line-height:1.6;font-size:15px}\n.tf-cat-seo h2{font-size:24px;margin:0 0 12px;color:#0f172a}\n.tf-cat-seo h3{font-size:18px;margin:28px 0 8px;color:#0f172a}\n.tf-cat-seo p{margin:0 0 12px}\n.tf-cat-seo ul{margin:0 0 12px 20px;padding:0}\n.tf-cat-seo li{margin:0 0 6px}\n.tf-cat-seo a{color:#0284c7 !important;font-weight:600}\n.tf-cat-seo details{border-top:1px solid #e2e8f0;padding:10px 0}\n.tf-cat-seo summary{cursor:pointer;font-weight:600;color:#0f172a}\n.tf-cat-seo details p{margin:8px 0 0}\n@media (max-width:600px){.tf-cat-seo{font-size:14px;margin-top:28px}.tf-cat-seo h2{font-size:20px}}");
(function () {
  var QUOTE = 'https://shop.tekfab.co.uk/roof-lantern-quote-v2';
  var FAQ = [
    ['Do you supply or fit?',
     'Supply only. Your lantern is delivered as a kit, ready to assemble and fit, so your builder or installer can put it together on site.'],
    ['How long does delivery take?',
     'Usually around 10 days from payment clearing, or 15 days for vented lanterns. Delivery is free to most UK mainland postcodes. Some areas, such as Scotland, Cornwall and parts of Kent, carry a charge, which is shown at checkout before you pay.'],
    ['Can I order a size that isn’t listed?',
     'Yes. Every lantern is made to order, so request a quote with your upstand size and we’ll price one to fit.'],
    ['What’s the difference between ridged, pyramid and vented lanterns?',
     'Ridged lanterns have a central ridge and suit rectangular openings. Pyramid lanterns rise to a single point and suit square openings. Vented lanterns add one or two flush electric opening vents; rain and wind sensors for automatic closing are sold separately.']
  ];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function html() {
    var faq = FAQ.map(function (q) {
      var a = esc(q[1]);
      if (/request a quote/.test(a)) { a = a.replace('request a quote', '<a href="' + QUOTE + '">request a quote</a>'); }
      return '<details><summary>' + esc(q[0]) + '</summary><p>' + a + '</p></details>';
    }).join('');
    return '<section class="tf-cat-seo" id="tf-cat-seo">' +
      '<h2>Aluminium Roof Lanterns</h2>' +
      '<p>Our aluminium roof lanterns are Sheerline S1 lanterns, made in Britain to the size of your upstand. Choose a ridged lantern for rectangular roofs, a pyramid lantern for square openings, or a vented lantern with Sheerline’s flush electric SheerVent for fresh air at the touch of a button.</p>' +
      '<p>Every lantern is made to order in Pure White, Anthracite Grey or Jet Black, and you can choose the inside and outside colours separately. Prices include VAT, and delivery is free to most UK mainland postcodes, usually in around 10 days (15 for vented lanterns). Can’t see your size? <a href="' + QUOTE + '">Get a custom quote</a> and we’ll price one to fit.</p>' +
      '<h3>Why choose the Sheerline S1 roof lantern?</h3><ul>' +
        '<li><strong>Warm and quiet:</strong> Thermlock&reg; multi-chamber bars and 28mm glazing, with a centre-pane U-value of 1.0 W/m&sup2;K (subject to glass choice). The 28mm glazing also allows acoustic glass.</li>' +
        '<li><strong>Slim and bright:</strong> 50mm sightlines on the rafters, hips and ridge let in more light, and the top caps sit just 8mm above the glass for a low, clean profile.</li>' +
        '<li><strong>Secure:</strong> anti-tamper screws, a glass lock and protected top caps. Sheerline calls the S1 the UK’s most secure aluminium roof lantern, and a Secured by Design upgrade with laminated glass is available.</li>' +
        '<li><strong>Built for British weather:</strong> rated for a 1.2 kN/m&sup2; snow load, covering the whole UK up to 200m altitude. Spans up to 3.2m &times; 6m need no tie bars.</li>' +
        '<li><strong>25-year manufacturer guarantee:</strong> covering the aluminium profiles, the powder-coated finish and the thermal performance (gaskets 10 years).</li>' +
      '</ul>' +
      '<h3>Roof lantern sizes</h3>' +
      '<p>The sizes we list are the <strong>external upstand (kerb) dimensions</strong> your lantern sits on, including any roof covering. They are not the size of the hole in the ceiling. Measure the outside of the upstand, width first and then length. If your size isn’t listed, <a href="' + QUOTE + '">ask for a custom quote</a>. Our <a href="/roof-lantern-sizes">roof lantern sizes guide</a> shows every size range we list.</p>' +
      '<h3>Buying guides</h3><ul>' +
        '<li><a href="/roof-lantern-sizes">Roof lantern sizes: how to measure</a></li>' +
        '<li><a href="/vented-or-fixed-roof-lantern">Vented or fixed roof lantern: which do you need?</a></li>' +
        '<li><a href="/roof-lantern-vs-skylight">Roof lantern or skylight: what\u2019s the difference?</a></li>' +
        '<li><a href="/roof-lanterns-for-trade">Roof lanterns for builders and trade</a></li>' +
      '</ul>' +
      '<h3>Frequently asked questions</h3>' + faq +
      '</section>';
  }

  function faqSchema() {
    if (document.getElementById('tf-cat-faq-ld')) { return; }
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'tf-cat-faq-ld';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ.map(function (q) {
        return { '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } };
      })
    });
    document.head.appendChild(s);
  }

  function isPage() { return /^\/categories\/(roof-lanterns\/1565765000030904207|1565765000030904207\/roof-lanterns)\/?$/.test(window.location.pathname); }

  function run() {
    if (!isPage() || document.getElementById('tf-cat-seo')) { return; }
    var list = document.querySelector('.theme-product-category-section');
    if (!list) { return; }
    try { list.insertAdjacentHTML('afterend', html()); faqSchema(); } catch (e) { /* never break the page */ }
  }

  TF.ready(function () {
    run();
    var timer = null;
    try {
      new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(run, 300); })
        .observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  });
})();

// Lantern category pages: the category section (intro, details, FAQs) is real page HTML in the Zoho category
// description (master copy: tekfab-website-code zoho/categories/<slug>/description.html, built by
// tools/build-category-descriptions.py). The theme shows the description in the hero and hides it on phones,
// so this moves the section below the products, where it shows on every device, and adds FAQPage structured
// data from its FAQ blocks. Approved by Keith 27 Nov 2026 (KMP 1 AZS9-T44).
TF.css(".tf-cat-seo.tf-moved{margin:32px auto 24px !important}\n.tf-cat-seo a{color:#0284c7 !important}\n@media (max-width:600px){.tf-cat-seo.tf-moved{margin:24px 12px !important;padding:16px 14px !important;font-size:14px !important}.tf-cat-seo h2{font-size:19px !important}.tf-cat-seo h3{font-size:16px !important}}");
(function () {
  function faqSchema(section) {
    if (document.getElementById('tf-cat-faq-ld')) { return; }
    var items = [];
    var blocks = section.querySelectorAll('.tf-faq');
    for (var i = 0; i < blocks.length; i++) {
      var q = blocks[i].querySelector('.tf-faq-q');
      var a = blocks[i].querySelector('.tf-faq-a');
      if (q && a) {
        items.push({ '@type': 'Question', name: q.textContent.trim(),
          acceptedAnswer: { '@type': 'Answer', text: a.textContent.trim() } });
      }
    }
    if (!items.length) { return; }
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'tf-cat-faq-ld';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items });
    document.head.appendChild(s);
  }

  function run() {
    if (!/^\/categories\//.test(window.location.pathname)) { return; }
    var section = document.querySelector('.theme-category-desc .tf-cat-seo');
    if (!section) { return; }
    if (document.querySelector('.tf-cat-seo.tf-moved')) { // already moved; Zoho re-drew the description
      try { section.parentNode.removeChild(section); } catch (e) {}
      return;
    }
    var list = document.querySelector('.theme-product-category-section');
    if (!list) { return; }
    try {
      section.classList.add('tf-moved');
      list.insertAdjacentElement('afterend', section);
      faqSchema(section);
    } catch (e) { /* never break the page */ }
  }

  TF.ready(function () {
    run();
    var timer = null;
    try {
      new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(run, 300); })
        .observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  });
})();

// Lantern category pages: "Find your size" box (enter upstand width and length, jump to the nearest
// listed size via the existing filters, or a pre-filled quote) plus crawlable "Common sizes" links
// to real product pages. Approved by Keith 26 Nov 2026 (KMP 4 A21Y-T33, A21Y-T34).
// Replaced the older mobile-only quote box (20-mobile-quote-widget.js, retired 27 Nov 2026, KMP 1 AZS9-T43).
// Nothing in Zoho's own filters or navigation is changed.
// 27 Nov 2026 (KMP 1 AZS9-T43): full width, aligned with the filter bar and product grid; sizes beside the form on wide screens.
TF.css(".tf-finder{width:100%;max-width:none;margin:28px 0 24px;padding:0;box-sizing:border-box;font-family:inherit}\n.tf-finder-in{background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #0284c7;border-radius:6px;padding:18px 22px;box-sizing:border-box}\n.tf-finder-guides{margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0}\n.tf-finder-guides[hidden]{display:none}\n.tf-finder-guides h3{font-size:13px;font-weight:700;color:#0f172a;margin:0 0 6px}\n.tf-finder-guides ul{list-style:none;margin:0;padding:0}\n.tf-finder-guides li{margin:0 0 6px}\n.tf-finder-guides a{color:#0369a1 !important;font-weight:600;font-size:14px;text-decoration:none !important}\n.tf-finder-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:28px;align-items:start}\n.tf-finder-grid .tf-finder-sizes{margin-top:0;padding-top:0;border-top:0}\n@media (max-width:900px){.tf-finder-grid{grid-template-columns:1fr;gap:0}.tf-finder-grid .tf-finder-sizes{margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0}}\n.tf-finder h2{font-size:17px;margin:0 0 4px;color:#0f172a;font-weight:700}\n.tf-finder p{font-size:13px;color:#475569;margin:0 0 10px;line-height:1.45}\n.tf-finder-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}\n.tf-finder label{display:block;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:3px}\n.tf-finder input{width:130px;padding:8px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;color:#1e293b;background:#fff;box-sizing:border-box}\n.tf-finder button{background:#0284c7;color:#fff;border:0;border-radius:4px;padding:9px 16px;font-size:14px;font-weight:600;cursor:pointer}\n.tf-finder button:hover{background:#0369a1}\n.tf-finder-res{margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;line-height:1.5}\n.tf-finder-res:empty{display:none}\n.tf-finder-res a{display:inline-block;margin:6px 10px 0 0;padding:7px 12px;border-radius:4px;font-weight:600;font-size:13px;text-decoration:none !important}\n.tf-btn-main{background:#0284c7;color:#fff !important}\n.tf-btn-alt{background:#fff;color:#0284c7 !important;border:2px solid #0284c7;padding:5px 10px !important}\n.tf-finder-sizes{margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0}\n.tf-finder-sizes h3{font-size:13px;font-weight:700;color:#0f172a;margin:0 0 6px}\n.tf-finder-sizes ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}\n.tf-finder-sizes li{margin:0}\n.tf-finder-sizes a{display:inline-block;padding:5px 10px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;font-size:13px;color:#0369a1 !important;text-decoration:none !important}\n.tf-finder-sizes a:hover{border-color:#0284c7;background:#f0f9ff}\n.tf-finder-sizes .tf-grp{font-size:12px;color:#64748b;margin:8px 0 4px;font-weight:600}\n.tf-spin{display:inline-block;width:16px;height:16px;border:3px solid #bae6fd;border-top-color:#0284c7;border-radius:50%;vertical-align:-3px;margin-right:6px;animation:tfspin .8s linear infinite}\n@keyframes tfspin{to{transform:rotate(360deg)}}\n.tf-finder button:disabled{opacity:.6;cursor:wait}\n.tf-nores-txt{color:#9a3412;font-weight:600}\n.tf-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(255,255,255,.82);display:flex;align-items:center;justify-content:center}\n.tf-ov-card{background:#fff;border:1px solid #e2e8f0;border-top:4px solid #0284c7;border-radius:8px;box-shadow:0 10px 30px rgba(15,23,42,.15);padding:22px 28px;font-size:16px;font-weight:600;color:#0f172a;text-align:center;max-width:80vw}\n.tf-ov-card .tf-spin{width:34px;height:34px;border-width:4px;display:block;margin:0 auto 12px}\n.tf-near{display:flex;gap:10px;align-items:flex-start;margin-top:10px;background:#f0f9ff;border:1px solid #bae6fd;border-left:4px solid #0284c7;border-radius:6px;padding:10px 12px;font-size:14px;color:#0c4a6e}\n.tf-near-ico{font-size:18px;line-height:1.3}\n.tf-nores{background:#fff7ed;border:1px solid #fdba74;border-radius:6px;padding:12px 14px;margin:0 0 14px;font-size:14px;color:#7c2d12}\n.tf-nores a{color:#0284c7 !important;font-weight:700}\n@media (max-width:600px){.tf-finder-in{padding:12px}.tf-finder input{width:100%}.tf-finder-row>div{flex:1 1 45%}.tf-finder button{width:100%}}");
(function () {
  var QUOTE = 'https://shop.tekfab.co.uk/roof-lantern-quote-v2';
  var P = '/products/alr-';
  var R = 'ridged-aluminium-lantern-roof-', Y = 'pyramid-aluminium-lantern-roof-', S = 'single-vented-aluminium-lantern-roof-', D = 'double-vented-aluminium-lantern-roof-';
  // [label, product path]. Product URLs taken from Zoho Commerce on 26 Nov 2026.
  var RIDGED = [
    ['1m x 1.5m', R + '1m-x-1-5m-2way-4-pane/1565765000051460299'],
    ['1m x 2m', R + '1m-x-2m-2way-4-pane/1565765000051459923'],
    ['1m x 3m', R + '1m-x-3m-2way-4-pane/1565765000051459943'],
    ['1.5m x 2m', R + '1-5m-x-2m-2way-6-pane/1565765000051460357'],
    ['1.5m x 3m', R + '1-5m-x-3m-2way-4-pane/1565765000051460261'],
    ['1.5m x 4m', R + '1-5m-x-4m-2way-6-pane/1565765000051460395'],
    ['2m x 2.5m', R + '2m-x-2-5m-3way-8-pane/1565765000051493039'],
    ['2m x 3m', R + '2m-x-3m-2way-4-pane/1565765000051459903'],
    ['2m x 4m', R + '2m-x-4m-2way-6-pane/1565765000051469021'],
    ['2.5m x 4m', R + '2-5m-x-4m-3way-8-pane/1565765000051492403'],
    ['3m x 4m', R + '3m-x-4m-3way-8-pane/1565765000051469963'],
    ['3m x 5m', R + '3m-x-5m-2way-16-pane/1565765000051469655']
  ];
  var PYRAMID = [
    ['1m x 1m', Y + '1m-x-1m-4way-4-pane/1565765000051459589'],
    ['1.2m x 1.2m', Y + '1-2m-x-1-2m-4way-4-pane/1565765000051459573'],
    ['1.5m x 1.5m', Y + '1-5m-x-1-5m-4way-4-pane/1565765000051459605'],
    ['1.8m x 1.8m', Y + '1-8m-x-1-8m-4way-4-pane/1565765000051460021'],
    ['2m x 2m', Y + '2m-x-2m-4way-4-pane/1565765000051459715'],
    ['2.5m x 2.5m', Y + '2-5m-x-2-5m-4way-12-pane/1565765000051460205'],
    ['3m x 3m', Y + '3m-x-3m-4way-12-pane/1565765000051459811']
  ];
  var SINGLE = [
    ['1m x 2m', S + '1m-x-2m-2way-8-pane/1565765000064737174'],
    ['1m x 3m', S + '1m-x-3m-3way-10-pane/1565765000066511249'],
    ['1.2m x 2.4m', S + '1-2m-x-2-4m-3way-10-pane/1565765000066419721'],
    ['1.5m x 3m', S + '1-5m-x-3m-3way-10-pane/1565765000066811999'],
    ['2.4m x 4m', S + '2-4m-x-4m-3way-10-pane/1565765000065109911']
  ];
  var DOUBLE = [
    ['1m x 3m', D + '1m-x-3m-3way-10-pane/1565765000066510352'],
    ['1.2m x 3m', D + '1-2m-x-3m-3way-10-pane/1565765000066811195'],
    ['1.5m x 3m', D + '1-5m-x-3m-3way-10-pane/1565765000066871330'],
    ['2.2m x 4m', D + '2-2m-x-4m-3way-10-pane/1565765000065110509'],
    ['2.4m x 4m', D + '2-4m-x-4m-3way-10-pane/1565765000065109931']
  ];
  var PAGES = {
    '1565765000052482103': { style: 'ridged', groups: [['', RIDGED]] },
    '1565765000052482061': { style: 'pyramid', groups: [['', PYRAMID]] },
    '1565765000052482117': { style: 'vented', groups: [['Single vent', SINGLE], ['Double vent', DOUBLE]] },
    '1565765000030904207': { style: 'any', groups: [
      ['Ridged', RIDGED.filter(function (x) { return /^(1m x 2m|1m x 3m|1.5m x 3m|2m x 3m|2m x 4m|3m x 4m)$/.test(x[0]); })],
      ['Pyramid', PYRAMID.filter(function (x) { return /^(1m x 1m|1.5m x 1.5m|2m x 2m)$/.test(x[0]); })],
      ['Vented', SINGLE.filter(function (x) { return /^(1m x 2m|1.5m x 3m)$/.test(x[0]); })]
    ] }
  };

  // Zoho serves a category at /categories/<slug>/<id> and also /categories/<id>/<slug> (used by some homepage tiles).
  var m = location.pathname.match(/^\/categories\/(?:[^\/]+\/(\d+)|(\d+)\/[^\/]+)\/?$/);
  var page = m && PAGES[m[1] || m[2]];
  if (!page) { return; }

  // 27 Nov 2026 (KMP 1 AZS9-T43): on phones Zoho sets the category hero to ~750px tall, pushing the
  // finder and products off the first screen. Cap it and crop the picture to fit.
  TF.css('@media (max-width:767px){.theme-category-image-description-conatainer{min-height:190px !important;height:190px !important;background-size:cover !important;background-position:center !important}}');

  // Buying guides links. The theme hides the category description (where these normally sit) on phones,
  // so they are repeated inside the finder panel only when the description is hidden.
  var GUIDES = [
    ['/roof-lantern-sizes', 'Roof lantern sizes: how to measure your upstand'],
    ['/vented-or-fixed-roof-lantern', 'Vented or fixed: which do you need?'],
    ['/roof-lantern-vs-skylight', "Roof lantern or skylight: what\u2019s the difference?"],
    ['/lantern-roof', 'Sheerline S1 lantern: specification and options']
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function fmt(mm) { return (mm / 1000).toString() + 'm'; }
  function quoteUrl(w, l) { return QUOTE + '?width=' + w + '&length=' + l; }

  // Width and length options come from Zoho's own filter checkboxes. Zoho trims these lists once a
  // filter is ticked, so keep every option ever seen on this page (CACHE).
  var CACHE = { Width: {}, Length: {} };
  function options(kind) {
    var re = new RegExp('_' + kind + '_%28mm%29_(\\d+)$');
    document.querySelectorAll('input.theme-product-filter-check').forEach(function (e) {
      var v = e.getAttribute('data-zs-filter-option-value-id') || '';
      var mm = v.match(re);
      if (mm) { CACHE[kind][+mm[1]] = v; }
    });
    return CACHE[kind];
  }
  function nearest(map, target) {
    var best = null;
    Object.keys(map).forEach(function (k) {
      k = +k;
      if (best === null || Math.abs(k - target) < Math.abs(best - target)) { best = k; }
    });
    return best;
  }
  function boxFor(id) { return document.querySelector('input.theme-product-filter-check[data-zs-filter-option-value-id="' + id + '"]'); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function gridKey() {
    var a = document.querySelectorAll('.theme-prod-box a[href*="/products/"]');
    return a.length + '|' + (a[0] ? a[0].getAttribute('href') : '');
  }
  // Wait until Zoho has redrawn the product list (or give up after max ms).
  function settle(before, max) {
    var t0 = Date.now();
    return (function poll() {
      return wait(250).then(function () {
        if (gridKey() !== before && Date.now() - t0 > 600) { return wait(500); }
        if (Date.now() - t0 > max) { return null; }
        return poll();
      });
    })();
  }
  function clickBox(b) { var k = gridKey(); b.click(); return settle(k, 4000); }
  // Tick Zoho's own filter boxes (it ignores width/length in the address on page load).
  // Zoho doesn't show applied boxes as ticked, so this is only used on a page with no size filter applied.
  function applyFilters(ids) {
    var p = Promise.resolve();
    ids.forEach(function (id) {
      p = p.then(function () {
        var tries = 0;
        return (function tick() {
          var b = boxFor(id);
          if (b) { return clickBox(b); }
          if (++tries > 12) { return null; }
          return wait(300).then(tick);
        })();
      });
    });
    return p.then(function () { return wait(400); });
  }
  function sizeFiltered() { return /[?&]pf=[^&]*_(Width|Length)_/.test(location.search); }
  function cleanUrl() {
    var keep = location.search.replace(/^\?/, '').split('&').filter(function (x) { return x && !/_(Width|Length)_/.test(x); });
    return location.pathname + (keep.length ? '?' + keep.join('&') : '');
  }
  function productCount() {
    return new Set(Array.prototype.map.call(document.querySelectorAll('.theme-prod-box a[href*="/products/"]'), function (a) { return a.getAttribute('href'); })).size;
  }

  // Full-screen "Finding…" cover. Zoho jumps the page to the top on every filter click, so hold the
  // scroll position still underneath until the results are ready.
  var ov = null, pinY = 0;
  function holdScroll() { if (ov) { window.scrollTo(0, pinY); } }
  function cover(text) {
    if (!ov) {
      ov = document.createElement('div');
      ov.className = 'tf-ov';
      ov.setAttribute('role', 'status');
      document.body.appendChild(ov);
      pinY = window.pageYOffset;
      window.addEventListener('scroll', holdScroll, { passive: true });
    }
    ov.innerHTML = '<div class="tf-ov-card"><span class="tf-spin" aria-hidden="true"></span>' + esc(text) + '</div>';
  }
  function uncover() {
    window.removeEventListener('scroll', holdScroll);
    if (ov && ov.parentNode) { ov.parentNode.removeChild(ov); }
    ov = null;
  }

  var busy = false;
  function find(w, l, out, btn) {
    if (busy) { return; }
    if (!(w >= 300 && w <= 8000 && l >= 300 && l <= 8000)) {
      out.innerHTML = 'Please enter both sizes in millimetres, for example 1000 and 2000.';
      return;
    }
    if (page.style !== 'pyramid' && w > l) { var t = w; w = l; l = t; }
    var W = options('Width'), L = options('Length');
    var q = '<a class="tf-btn-alt" href="' + esc(quoteUrl(w, l)) + '">Get a quote for ' + w + ' x ' + l + 'mm</a>';
    if (page.style === 'pyramid') {
      if (Math.abs(w - l) > 150) {
        out.innerHTML = 'Pyramid lanterns are square. For a rectangular opening, see our <a class="tf-btn-main" href="/categories/ridged-lanterns/1565765000052482103">ridged lanterns</a>' + q;
        return;
      }
      if (!Object.keys(L).length) { L = W; }
    }
    var nw = nearest(W, w), nl = nearest(L, l);
    if (nw === null || nl === null) {
      out.innerHTML = 'Every lantern is made to order, so we can price your exact size.<br>' + q;
      return;
    }
    var exact = nw === w && nl === l, size = fmt(nw) + ' x ' + fmt(nl);
    busy = true;
    btn.disabled = true;
    out.innerHTML = '<span class="tf-spin" aria-hidden="true"></span> Finding ' + size + ' lanterns…';
    cover('Finding ' + size + ' lanterns…');
    if (sizeFiltered()) {
      try { sessionStorage.setItem('tfFinderNext', JSON.stringify({ w: w, l: l, p: location.pathname, t: Date.now() })); } catch (e) {}
      location.href = cleanUrl();
      return;
    }
    var ids = W === L ? [W[nw]] : [W[nw], L[nl]];
    applyFilters(ids).then(function () {
      var n = productCount();
      if (n > 0) {
        var shown = 'Showing <strong>' + n + '</strong> lantern' + (n > 1 ? 's' : '') + ' at <strong>' + size + '</strong>';
        out.innerHTML = exact
          ? shown + ' below.<br><a class="tf-btn-main tf-jump" href="#">View lanterns ↓</a>' + q
          : shown + ', the nearest listed size to ' + w + ' x ' + l + 'mm.' +
            '<div class="tf-near"><span class="tf-near-ico" aria-hidden="true">📐</span><div><strong>Want it to your exact size?</strong> We make every lantern to order, so we can quote for ' + w + ' x ' + l + 'mm.<br>' + q + '<a class="tf-btn-main tf-jump" href="#">View ' + size + ' lanterns ↓</a></div></div>';
        out.querySelector('.tf-jump').addEventListener('click', function (ev) {
          ev.preventDefault();
          var g = document.querySelector('.theme-prod-box');
          if (g) { g.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
        uncover();
        // Keep the result message in view, with the lanterns straight underneath it.
        var top = out.getBoundingClientRect().top + window.pageYOffset - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      } else {
        uncover();
        out.innerHTML = '<span class="tf-nores-txt">' + size + ' isn’t listed in this style. Every lantern is made to order, so we can price your exact size.</span><br>' + q;
        window.scrollTo({ top: Math.max(0, out.getBoundingClientRect().top + window.pageYOffset - 12), behavior: 'smooth' });
      }
    }).catch(function () {
      out.innerHTML = 'Something went wrong. Use the filters below, or get a quote.<br>' + q;
    }).then(function () { uncover(); busy = false; btn.disabled = false; });
  }

  function sizesHtml() {
    var multi = page.groups.length > 1;
    var body = page.groups.map(function (g) {
      var items = g[1].map(function (x) {
        return '<li><a href="' + P + x[1] + '">' + esc((multi ? g[0] + ' ' : '') + x[0]) + '</a></li>';
      }).join('');
      return (multi ? '<div class="tf-grp">' + esc(g[0]) + '</div>' : '') + '<ul>' + items + '</ul>';
    }).join('');
    return '<nav class="tf-finder-sizes" aria-label="Common lantern sizes"><h3>Common sizes</h3>' + body + '</nav>';
  }

  function build() {
    if (document.getElementById('tf-finder')) { return true; }
    var sec = document.querySelector('.theme-product-category-section');
    if (!sec) { return false; }
    var anchor = sec;
    var box = document.createElement('section');
    box.className = 'tf-finder';
    box.id = 'tf-finder';
    box.innerHTML = '<div class="tf-finder-in"><div class="tf-finder-grid"><div class="tf-finder-main">' +
      '<h2>Find your lantern size</h2>' +
      '<p>Enter the <strong>external size of your upstand</strong> (the kerb the lantern sits on), width first. We’ll show you the nearest listed size, or you can get a quote for your exact size.</p>' +
      '<form class="tf-finder-row" novalidate>' +
        '<div><label for="tf-fw">Width (mm)</label><input id="tf-fw" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 1000"></div>' +
        '<div><label for="tf-fl">Length (mm)</label><input id="tf-fl" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 2000"></div>' +
        '<div><button type="submit">Find my size</button></div>' +
      '</form></div>' +
      sizesHtml() +
      '</div><div class="tf-finder-res" aria-live="polite"></div>' +
      '<nav class="tf-finder-guides" aria-label="Buying guides" hidden><h3>Buying guides</h3><ul>' +
        GUIDES.map(function (g) { return '<li><a href="' + g[0] + '">' + esc(g[1]) + '</a></li>'; }).join('') +
      '</ul></nav>' +
      '</div>';
    anchor.parentNode.insertBefore(box, anchor);
    // Line up with the filter bar and product grid: copy the side padding of the category container.
    var zc = sec.querySelector('.zpcontainer');
    if (zc) { var cs = getComputedStyle(zc); box.style.paddingLeft = cs.paddingLeft; box.style.paddingRight = cs.paddingRight; }
    var guides = box.querySelector('.tf-finder-guides');
    var showGuides = function () {
      var d = document.querySelector('.theme-category-desc');
      guides.hidden = !(d && getComputedStyle(d).display === 'none');
    };
    showGuides();
    window.addEventListener('resize', showGuides);
    var form = box.querySelector('form'), res = box.querySelector('.tf-finder-res');
    options('Width'); options('Length');
    setTimeout(function () { options('Width'); options('Length'); }, 1500);
    var next = null;
    try { next = JSON.parse(sessionStorage.getItem('tfFinderNext') || 'null'); sessionStorage.removeItem('tfFinderNext'); } catch (e) {}
    if (next && next.p === location.pathname && Date.now() - next.t < 60000 && !sizeFiltered()) {
      box.querySelector('#tf-fw').value = next.w;
      box.querySelector('#tf-fl').value = next.l;
      res.innerHTML = '<span class="tf-spin" aria-hidden="true"></span> Finding lanterns…';
      box.scrollIntoView({ block: 'start' });
      cover('Finding lanterns…');
      setTimeout(function () { find(next.w, next.l, res, form.querySelector('button')); }, 2200);
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      find(Math.round(+box.querySelector('#tf-fw').value), Math.round(+box.querySelector('#tf-fl').value), res, form.querySelector('button'));
    });
    return true;
  }

  TF.ready(function () {
    if (!build()) {
      var tries = 0, iv = setInterval(function () { if (build() || ++tries > 20) { clearInterval(iv); } }, 300);
    }
  });
})();

// Design styles for the guide pages and the homepage intro block. The content itself is real page HTML
// (built in the Zoho page builder's text code view, class names starting tfg-), so crawlers read it
// without this script; this only styles it. Keith approved the redesign 26 Nov 2026 (KMP 4).
TF.css([
  '.tfg{--ink:#1f2933;--muted:#52606d;--line:#e4e7eb;--soft:#f5f7f9;--brand:#0284c7;--dark:#3d4236;--night:#14181d;',
  'max-width:1140px;margin:0 auto;font-family:inherit;color:var(--ink);font-size:17px;line-height:1.65;text-align:left}',
  '.tfg *{box-sizing:border-box}',
  '.tfg p{margin:0 0 14px;font-size:17px;line-height:1.65;color:var(--ink);text-align:left}',
  '.tfg h1,.tfg h2,.tfg h3{font-family:inherit;color:var(--night);text-align:left;margin:0 0 14px;letter-spacing:-.01em}',
  '.tfg h1{font-size:40px;line-height:1.15;font-weight:600}',
  '.tfg h2{font-size:30px;line-height:1.2;font-weight:600}',
  '.tfg h3{font-size:20px;line-height:1.3;font-weight:600}',
  '.tfg a{color:var(--brand)}',
  '.tfg img{max-width:100%;height:auto;display:block;border-radius:10px}',
  '.tfg-eyebrow{display:inline-block;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--brand);margin:0 0 10px}',
  '.tfg-lead{font-size:19px !important;color:var(--muted) !important}',
  '.tfg-sec{padding:56px 0;border-top:1px solid var(--line)}',
  '.tfg-sec:first-child{border-top:0;padding-top:28px}',
  '.tfg-soft{background:var(--soft);border:0;border-radius:16px;padding:48px 44px;margin:8px 0}',
  '.tfg-split{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}',
  '.tfg-split.tfg-rev .tfg-media{order:-1}',
  '.tfg-media img{width:100%;box-shadow:0 14px 40px rgba(15,23,42,.14)}',
  '.tfg-btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}',
  '.tfg-btn{display:inline-block;padding:13px 24px;border-radius:6px;font-weight:600;font-size:16px;text-decoration:none !important;line-height:1.2;border:2px solid var(--dark);transition:all .15s}',
  '.tfg-btn-p{background:var(--dark);color:#fff !important}',
  '.tfg-btn-p:hover{background:#2a2e25;border-color:#2a2e25}',
  '.tfg-btn-s{background:transparent;color:var(--dark) !important}',
  '.tfg-btn-s:hover{background:var(--dark);color:#fff !important}',
  '.tfg-btn-w{background:#fff;color:var(--night) !important;border-color:#fff}',
  '.tfg-btn-o{background:transparent;color:#fff !important;border-color:rgba(255,255,255,.8)}',
  '.tfg-head{max-width:720px;margin:0 0 30px}',
  '.tfg-grid{display:grid;gap:22px}',
  '.tfg-g2{grid-template-columns:repeat(2,1fr)}',
  '.tfg-g3{grid-template-columns:repeat(3,1fr)}',
  '.tfg-g4{grid-template-columns:repeat(4,1fr)}',
  '.tfg-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:26px;box-shadow:0 2px 6px rgba(15,23,42,.04)}',
  '.tfg-card h3{margin-bottom:8px}',
  '.tfg-card p{font-size:16px;color:var(--muted);margin:0}',
  '.tfg-card-img{padding:0;overflow:hidden}',
  '.tfg-card-img img{border-radius:0;width:100%;aspect-ratio:16/10;object-fit:cover}',
  '.tfg-card-img .tfg-card-body{padding:22px 24px 26px}',
  '.tfg-card-img .tfg-btns{margin-top:16px}',
  '.tfg-num{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:var(--brand);color:#fff;font-weight:700;font-size:18px;margin-bottom:14px}',
  '.tfg-list{margin:0 0 6px;padding:0;list-style:none}',
  '.tfg-list li{position:relative;padding:0 0 10px 30px;font-size:16px;color:var(--ink)}',
  '.tfg-list li:before{content:"";position:absolute;left:4px;top:7px;width:14px;height:8px;border-left:3px solid var(--brand);border-bottom:3px solid var(--brand);transform:rotate(-45deg)}',
  '.tfg-table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:#fff}',
  '.tfg table{width:100%;border-collapse:collapse;font-size:16px;margin:0}',
  '.tfg th{background:var(--night);color:#fff;text-align:left;font-weight:600;padding:14px 18px}',
  '.tfg td{padding:14px 18px;border-top:1px solid var(--line);vertical-align:top;text-align:left}',
  '.tfg tr:nth-child(even) td{background:var(--soft)}',
  '.tfg td:first-child{font-weight:600}',
  '.tfg th,.tfg td{word-break:normal;overflow-wrap:normal;hyphens:none}',
  '.tfg td:first-child:not(:has(a)){white-space:nowrap}',
  '.tfg-note{font-size:15px !important;color:var(--muted) !important;margin-top:14px !important}',
  '.tfg-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;background:var(--night);border-radius:16px;overflow:hidden}',
  '.tfg-stat{padding:30px 22px;text-align:center;border-left:1px solid rgba(255,255,255,.12)}',
  '.tfg-stat:first-child{border-left:0}',
  '.tfg-stat b{display:block;font-size:32px;line-height:1.1;color:#fff;font-weight:700;margin-bottom:6px}',
  '.tfg-stat span{display:block;font-size:14px;color:#cbd2d9;line-height:1.4}',
  '.tfg-cta{position:relative;border-radius:16px;overflow:hidden;padding:60px 48px;margin:56px 0 24px;background:var(--night) center/cover no-repeat;color:#fff;text-align:center}',
  '.tfg-cta:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,20,26,.92),rgba(15,20,26,.7))}',
  '.tfg-cta>*{position:relative}',
  '.tfg-cta h2{color:#fff;text-align:center;margin-bottom:10px}',
  '.tfg-cta p{color:#e4e7eb;text-align:center;max-width:640px;margin:0 auto 6px;font-size:18px}',
  '.tfg-cta .tfg-btns{justify-content:center}',
  '.tfg-hero{position:relative;border-radius:16px;overflow:hidden;padding:90px 56px;background:var(--night) center/cover no-repeat;margin:20px 0 8px}',
  '.tfg-hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,20,26,.9) 0%,rgba(15,20,26,.55) 60%,rgba(15,20,26,.25) 100%)}',
  '.tfg-hero>*{position:relative;max-width:620px}',
  '.tfg-hero h1{color:#fff}',
  '.tfg-hero p{color:#e4e7eb}',
  '.tfg-hero .tfg-eyebrow{color:#7dd3fc}',
  '.tfg-links{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:8px}',
  '.tfg-links a{display:inline-block;padding:9px 16px;border:1px solid var(--line);border-radius:999px;background:#fff;font-size:15px;color:var(--night) !important;text-decoration:none !important}',
  '.tfg-links a:hover{border-color:var(--brand);color:var(--brand) !important}',
  '.tfg-center{text-align:center}',
  '.tfg p.tfg-center{text-align:center !important;margin-top:18px}',
  '.tfg-center h2,.tfg-center p{text-align:center;margin-left:auto;margin-right:auto}',
  '.tfg-bg-ridged{background-image:url(https://feeds.tekfab.co.uk/images/lifestyle-ridged.jpg)}',
  '.tfg-bg-vented{background-image:url(https://feeds.tekfab.co.uk/images/lifestyle-vented.jpg)}',
  '.tfg-bg-interior{background-image:url(https://feeds.tekfab.co.uk/images/interior-s1-lantern.jpg)}',
  '.tfg-bg-pyramid{background-image:url(https://feeds.tekfab.co.uk/images/lifestyle-pyramid.jpg)}',
  '.tfg-soft+.tfg-sec{border-top:0}',
  '.tfg-stats{margin:8px 0}',
  '.tfg-hero+.tfg-sec{border-top:0}',
  '.tfg-hero .tfg-lead,.tfg-cta .tfg-lead{color:#e4e7eb !important}',
  '.tfg-stats+.tfg-sec{border-top:0}',
  '.tfg-media img.tfg-diagram,.tfg img.tfg-diagram{width:auto;max-width:100%;max-height:440px;margin:0 auto;box-shadow:none;border:1px solid var(--line);background:#fff;padding:18px;border-radius:12px}',
  '.tfg img.tfg-diagram-sm{max-width:300px;width:100%;margin:18px 0 0;border:1px solid var(--line);padding:12px;border-radius:10px;box-shadow:none}',
  '.tfg-hero-img img{aspect-ratio:4/3;object-fit:cover}',
  '@media (max-width:900px){.tfg-split,.tfg-g3,.tfg-g4{grid-template-columns:1fr 1fr}.tfg-split{grid-template-columns:1fr;gap:28px}.tfg-split .tfg-media{order:-1}.tfg-stats{grid-template-columns:1fr 1fr}.tfg-stat:nth-child(3){border-left:0}.tfg-stat{border-top:1px solid rgba(255,255,255,.12)}}',
  '@media (max-width:600px){.tfg{font-size:16px}.tfg h1{font-size:30px}.tfg h2{font-size:24px}.tfg p{font-size:16px}.tfg-lead{font-size:17px !important}',
  '.tfg-g2,.tfg-g3,.tfg-g4{grid-template-columns:1fr}.tfg-sec{padding:36px 0}.tfg-soft{padding:28px 20px;border-radius:12px}',
  '.tfg-hero{padding:48px 22px}.tfg-cta{padding:40px 22px}.tfg-btn{width:100%;text-align:center}.tfg th,.tfg td{padding:11px 12px;font-size:15px}.tfg-stat b{font-size:26px}}',
  // Let the page-builder container breathe and keep guide pages off the grey Zoho padding.
  '.zpcontainer:has(> .zprow .tfg){max-width:1240px;margin-left:auto;margin-right:auto}',
  // Homepage: the intro snippet sits in a narrow centred column; let it use the full row and hide the emptied row below it.
  '.zpelem-col:has(.tfg){flex:0 0 100% !important;max-width:100% !important}',
  '.zpelem-col:has(.tfg) .zprow:not(:has(.zpelement)){display:none}'
].join('\n'));
})();
