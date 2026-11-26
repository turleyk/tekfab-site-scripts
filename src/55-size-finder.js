// Lantern category pages: "Find your size" box (enter upstand width and length, jump to the nearest
// listed size via the existing filters, or a pre-filled quote) plus crawlable "Common sizes" links
// to real product pages. Approved by Keith 26 Nov 2026 (KMP 4 A21Y-T33, A21Y-T34).
// Replaces the older mobile-only quote box from 20-mobile-quote-widget.js on these pages.
// Nothing in Zoho's own filters or navigation is changed.
TF.css(".tf-finder{max-width:1200px;margin:16px auto 20px;padding:0 15px;box-sizing:border-box;font-family:inherit}\n.tf-finder-in{background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #0284c7;border-radius:6px;padding:16px 18px;box-sizing:border-box}\n.tf-finder h2{font-size:17px;margin:0 0 4px;color:#0f172a;font-weight:700}\n.tf-finder p{font-size:13px;color:#475569;margin:0 0 10px;line-height:1.45}\n.tf-finder-row{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}\n.tf-finder label{display:block;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:3px}\n.tf-finder input{width:130px;padding:8px;border:1px solid #cbd5e1;border-radius:4px;font-size:14px;color:#1e293b;background:#fff;box-sizing:border-box}\n.tf-finder button{background:#0284c7;color:#fff;border:0;border-radius:4px;padding:9px 16px;font-size:14px;font-weight:600;cursor:pointer}\n.tf-finder button:hover{background:#0369a1}\n.tf-finder-res{margin-top:12px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;line-height:1.5}\n.tf-finder-res:empty{display:none}\n.tf-finder-res a{display:inline-block;margin:6px 10px 0 0;padding:7px 12px;border-radius:4px;font-weight:600;font-size:13px;text-decoration:none !important}\n.tf-btn-main{background:#0284c7;color:#fff !important}\n.tf-btn-alt{background:#fff;color:#0284c7 !important;border:2px solid #0284c7;padding:5px 10px !important}\n.tf-finder-sizes{margin-top:14px;padding-top:12px;border-top:1px solid #e2e8f0}\n.tf-finder-sizes h3{font-size:13px;font-weight:700;color:#0f172a;margin:0 0 6px}\n.tf-finder-sizes ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}\n.tf-finder-sizes li{margin:0}\n.tf-finder-sizes a{display:inline-block;padding:5px 10px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;font-size:13px;color:#0369a1 !important;text-decoration:none !important}\n.tf-finder-sizes a:hover{border-color:#0284c7;background:#f0f9ff}\n.tf-finder-sizes .tf-grp{font-size:12px;color:#64748b;margin:8px 0 4px;font-weight:600}\n.tf-spin{display:inline-block;width:16px;height:16px;border:3px solid #bae6fd;border-top-color:#0284c7;border-radius:50%;vertical-align:-3px;margin-right:6px;animation:tfspin .8s linear infinite}\n@keyframes tfspin{to{transform:rotate(360deg)}}\n.tf-finder button:disabled{opacity:.6;cursor:wait}\n.tf-nores-txt{color:#9a3412;font-weight:600}\n.tf-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(255,255,255,.82);display:flex;align-items:center;justify-content:center}\n.tf-ov-card{background:#fff;border:1px solid #e2e8f0;border-top:4px solid #0284c7;border-radius:8px;box-shadow:0 10px 30px rgba(15,23,42,.15);padding:22px 28px;font-size:16px;font-weight:600;color:#0f172a;text-align:center;max-width:80vw}\n.tf-ov-card .tf-spin{width:34px;height:34px;border-width:4px;display:block;margin:0 auto 12px}\n.tf-nores{background:#fff7ed;border:1px solid #fdba74;border-radius:6px;padding:12px 14px;margin:0 0 14px;font-size:14px;color:#7c2d12}\n.tf-nores a{color:#0284c7 !important;font-weight:700}\n@media (max-width:600px){.tf-finder-in{padding:12px}.tf-finder input{width:100%}.tf-finder-row>div{flex:1 1 45%}.tf-finder button{width:100%}}");
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
        out.innerHTML = (exact
          ? 'Showing <strong>' + n + '</strong> lantern' + (n > 1 ? 's' : '') + ' at <strong>' + size + '</strong> below.'
          : 'Showing <strong>' + n + '</strong> lantern' + (n > 1 ? 's' : '') + ' at <strong>' + size + '</strong>, the nearest listed size to ' + w + ' x ' + l + 'mm. Need it exact? Get a quote.') +
          '<br><a class="tf-btn-main tf-jump" href="#">View lanterns ↓</a>' + q;
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
    var anchor = document.querySelector('.theme-product-category-section');
    if (!anchor) { return false; }
    var old = document.getElementById('zoho-mobile-custom-quote-widget');
    if (old) { old.parentNode.removeChild(old); }
    var box = document.createElement('section');
    box.className = 'tf-finder';
    box.id = 'tf-finder';
    box.innerHTML = '<div class="tf-finder-in">' +
      '<h2>Find your lantern size</h2>' +
      '<p>Enter the <strong>external size of your upstand</strong> (the kerb the lantern sits on), width first. We’ll show you the nearest listed size, or you can get a quote for your exact size.</p>' +
      '<form class="tf-finder-row" novalidate>' +
        '<div><label for="tf-fw">Width (mm)</label><input id="tf-fw" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 1000"></div>' +
        '<div><label for="tf-fl">Length (mm)</label><input id="tf-fl" type="number" inputmode="numeric" min="300" max="8000" step="10" placeholder="e.g. 2000"></div>' +
        '<div><button type="submit">Find my size</button></div>' +
      '</form>' +
      sizesHtml() +
      '<div class="tf-finder-res" aria-live="polite"></div>' +
      '</div>';
    anchor.parentNode.insertBefore(box, anchor);
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
