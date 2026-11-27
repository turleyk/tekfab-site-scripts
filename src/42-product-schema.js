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
