// Source: tekfab-website-code/header/05-trust-box.html
TF.css(".tf-trust-box{border:1px solid #e2e8f0;border-radius:8px;background:#fff;padding:12px 16px;margin:4px 0 16px 0;font-family:inherit}\n.tf-trust-box ul{list-style:none;margin:0;padding:0}\n.tf-trust-box li{display:flex;gap:8px;align-items:flex-start;font-size:13px;line-height:1.4;color:#1e293b;padding:4px 0}\n.tf-trust-box li span.tf-tick{color:#16a34a;font-weight:700;flex:0 0 auto}\n.tf-trust-box small{display:block;color:#64748b;font-size:11px;margin-top:1px}\n.tf-trust-box a{color:#0284c7 !important;text-decoration:none !important;font-weight:600}\n@media (max-width:600px){.tf-trust-box{padding:10px 12px}.tf-trust-box li{font-size:12px}}");
(function () {
  var LANTERN_SLUGS = ['ridged-aluminium-lantern-roof', 'single-vented-aluminium-lantern-roof',
                       'double-vented-aluminium-lantern-roof', 'pyramid-aluminium-lantern-roof'];

  function isLanternPage() {
    var p = window.location.pathname.toLowerCase();
    if (p.indexOf('/products/') === -1) { return false; }
    return LANTERN_SLUGS.some(function (s) { return p.indexOf(s) > -1; });
  }

  var HTML =
    '<div class="tf-trust-box" id="tf-trust-box"><ul>' +
      '<li><span class="tf-tick">&#10003;</span><div>Free delivery to most UK mainland postcodes' +
        '<small>Some areas (e.g. Scotland, Cornwall, parts of Kent) carry a delivery charge, shown at checkout before you pay.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Delivered in around 10 days (15 days for vented lanterns)' +
        '<small>From payment clearing.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Price includes VAT</div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Sheerline S1 system: 25-year manufacturer guarantee' +
        '<small>Covers the aluminium profiles, powder-coated finish and thermal performance (gaskets 10 years).</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Questions? Call <a href="tel:01785508212">01785 508212</a> (Mon&ndash;Fri, 9am&ndash;5pm) ' +
        'or email <a href="mailto:enquiries@tekfab.co.uk">enquiries@tekfab.co.uk</a></div></li>' +
    '</ul></div>';

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
