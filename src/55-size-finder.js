// Lantern category pages: "Find your size" box (enter upstand width and length, jump to the nearest
// listed size via the existing filters, or a pre-filled quote) plus crawlable "Common sizes" links
// to real product pages. Approved by Keith 26 Nov 2026 (KMP 4 A21Y-T33, A21Y-T34).
// Replaces the older mobile-only quote box from 20-mobile-quote-widget.js on these pages.
// Nothing in Zoho's own filters or navigation is changed.
TF.css(".tf-finder{max-width:1200px;margin:16px auto 20px;padding:0 15px;box-sizing:border-box;font-family:inherit}\n.tf-finder-in{background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #0284c7;border-radius:6px;padding:16px 18px;box-sizing:border-box}\n.tf-finder h2{font-size:17px;margin:0 0 4px;color:#0f172a;font-weight:700}\n.tf-finder p{font-size:13px;color:#475569;margin:0 0 10px;line-height:1.45}\n.tf-finder-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}\n.tf-finder label{display:block;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:3px}\n.tf-finder input{width:130px;padding:8px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;color:#1e293b;background:#fff;box-sizing:border-box}\n.tf-finder button{background:#0284c7;color:#fff;border:0;border-radius:4px;padding:9px 16px;font-size:14px;font-weight:600;cursor:pointer}\n.tf-finder button:hover{background:#0369a1}\n.tf-finder-res{margin-top:10px;font-size:14px;color:#0f172a;line-height:1.5}\n.tf-finder-res:empty{display:none}\n.tf-finder-res a{display:inline-block;margin:6px 10px 0 0;padding:7px 12px;border-radius:4px;font-weight:600;font-size:13px;text-decoration:none !important}\n.tf-btn-main{background:#0284c7;color:#fff !important}\n.tf-btn-alt{background:#fff;color:#0284c7 !important;border:2px solid #0284c7;padding:5px 10px !important}\n.tf-finder-sizes{margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0}\n.tf-finder-sizes h3{font-size:13px;font-weight:700;color:#0f172a;margin:0 0 6px}\n.tf-finder-sizes ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}\n.tf-finder-sizes li{margin:0}\n.tf-finder-sizes a{display:inline-block;padding:5px 10px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;font-size:13px;color:#0369a1 !important;text-decoration:none !important}\n.tf-finder-sizes a:hover{border-color:#0284c7;background:#f0f9ff}\n.tf-finder-sizes .tf-grp{font-size:12px;color:#64748b;margin:8px 0 4px;font-weight:600}\n.tf-nores{background:#fff7ed;border:1px solid #fdba74;border-radius:6px;padding:12px 14px;margin:0 0 14px;font-size:14px;color:#7c2d12}\n.tf-nores a{color:#0284c7 !important;font-weight:700}\n@media (max-width:600px){.tf-finder-in{padding:12px}.tf-finder input{width:100%}.tf-finder-row>div{flex:1 1 45%}.tf-finder button{width:100%}}");
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

  var m = location.pathname.match(/^\/categories\/[^\/]+\/(\d+)\/?$/);
  var page = m && PAGES[m[1]];
  if (!page) { return; }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function fmt(mm) { return (mm / 1000).toString() + 'm'; }
  function quoteUrl(w, l) { return QUOTE + '?width=' + w + '&length=' + l; }

  // Width and length options come from Zoho's own filter checkboxes on this page.
  function options(kind) {
    var re = new RegExp('_' + kind + '_%28mm%29_(\\d+)$'), out = {}, ids = {};
    document.querySelectorAll('input.theme-product-filter-check').forEach(function (e) {
      var v = e.getAttribute('data-zs-filter-option-value-id') || '';
      var mm = v.match(re);
      if (mm) { out[+mm[1]] = v; }
    });
    Object.keys(out).forEach(function (k) { ids[k] = out[k]; });
    return ids;
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
  // Zoho ignores ?pf= in the address on page load, so tick its own filter boxes instead.
  function applyFilters(wid, lid, done) {
    var steps = [];
    document.querySelectorAll('input.theme-product-filter-check:checked').forEach(function (e) {
      var v = e.getAttribute('data-zs-filter-option-value-id') || '';
      if (/_(Width|Length)_%28mm%29_/.test(v) && v !== wid && v !== lid) { steps.push(e); }
    });
    [wid, lid].forEach(function (id) { var b = boxFor(id); if (b && !b.checked) { steps.push(b); } });
    var i = 0;
    (function next() {
      if (i >= steps.length) {
        var grid = document.querySelector('.theme-prod-box');
        if (grid) { grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        if (done) { done(); }
        checkEmpty();
        return;
      }
      steps[i++].click();
      setTimeout(next, 1800);
    })();
  }

  function find(w, l, out) {
    if (!(w >= 300 && w <= 8000 && l >= 300 && l <= 8000)) {
      out.innerHTML = 'Please enter both sizes in millimetres, for example 1000 and 2000.';
      return;
    }
    if (page.style !== 'pyramid' && w > l) { var t = w; w = l; l = t; }
    var W = options('Width'), L = options('Length');
    var nw = nearest(W, w), nl = nearest(L, l);
    var q = '<a class="tf-btn-alt" href="' + esc(quoteUrl(w, l)) + '">Get a quote for ' + w + ' x ' + l + 'mm</a>';
    if (nw === null || nl === null) {
      out.innerHTML = 'Every lantern is made to order, so we can price your exact size.<br>' + q;
      return;
    }
    var exact = nw === w && nl === l;
    last = { w: w, l: l };
    out.innerHTML = (exact
      ? '<strong>' + fmt(w) + ' x ' + fmt(l) + '</strong> is a listed size.'
      : 'Nearest listed size: <strong>' + fmt(nw) + ' x ' + fmt(nl) + '</strong>. If you need exactly ' + w + ' x ' + l + 'mm, ask for a quote.') +
      '<br><a class="tf-btn-main" href="#" role="button">Show ' + fmt(nw) + ' x ' + fmt(nl) + ' lanterns</a>' + q;
    out.querySelector('.tf-btn-main').addEventListener('click', function (ev) {
      ev.preventDefault();
      var btn = this;
      btn.textContent = 'Filtering…';
      applyFilters(W[nw], L[nl], function () { btn.textContent = 'Showing ' + fmt(nw) + ' x ' + fmt(nl) + ' below'; });
    });
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
    var anchor = document.querySelector('.theme-product-category-section');
    if (!anchor) { return false; }
    var old = document.getElementById('zoho-mobile-custom-quote-widget');
    if (old) { old.parentNode.removeChild(old); }
    var box = document.createElement('section');
    box.className = 'tf-finder';
    box.id = 'tf-finder';
    box.innerHTML = '<div class="tf-finder-in">' +
      '<h2>Find your lantern size</h2>' +
      '<p>Enter the <strong>external size of your upstand</strong> (the kerb the lantern sits on), width first. We’ll show the nearest listed size, or you can get a quote for your exact size.</p>' +
      '<form class="tf-finder-row" novalidate>' +
        '<div><label for="tf-fw">Width (mm)</label><input id="tf-fw" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 1000"></div>' +
        '<div><label for="tf-fl">Length (mm)</label><input id="tf-fl" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 2000"></div>' +
        '<div><button type="submit">Find my size</button></div>' +
      '</form>' +
      '<div class="tf-finder-res" aria-live="polite"></div>' +
      sizesHtml() +
      '</div>';
    anchor.parentNode.insertBefore(box, anchor);
    var form = box.querySelector('form'), res = box.querySelector('.tf-finder-res');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      find(Math.round(+box.querySelector('#tf-fw').value), Math.round(+box.querySelector('#tf-fl').value), res);
    });
    return true;
  }

  // After filtering: if that width/length combination has no listing in this style, say so.
  var last = null;
  function checkEmpty() {
    setTimeout(function () {
      var fb = document.getElementById('tf-finder');
      var old = document.getElementById('tf-nores');
      if (old) { old.parentNode.removeChild(old); }
      var grid = document.querySelector('.theme-prod-box');
      if (!fb || (grid && grid.querySelector('a[href*="/products/"]'))) { return; }
      var n = document.createElement('div');
      n.id = 'tf-nores';
      n.className = 'tf-nores';
      n.innerHTML = 'That size isn’t listed in this style. Every lantern is made to order, so <a href="' +
        esc(last ? quoteUrl(last.w, last.l) : QUOTE) + '">get a quote for your exact size</a>.';
      var inner = fb.querySelector('.tf-finder-in');
      inner.insertBefore(n, inner.firstChild);
      fb.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2500);
  }

  TF.ready(function () {
    if (!build()) {
      var tries = 0, iv = setInterval(function () { if (build() || ++tries > 20) { clearInterval(iv); } }, 300);
    }
  });
})();
