// Basket and checkout (approved by Keith 25 Nov 2026, KMP 4 A21Y-T23):
// - basket: reassurance box under the Checkout button (desktop and mobile summaries)
// - checkout: hide the coupon code box (no coupon codes in use)
TF.css(".theme-cart-details-coupon-wrap{display:none !important}\n.tf-basket-trust{margin:12px 0 0 0}\n.tf-basket-trust .tf-quote-link{display:block;margin-top:8px;padding-top:8px;border-top:1px solid #e2e8f0;font-size:13px}");
(function () {
  var HTML =
    '<div class="tf-trust-box tf-basket-trust"><ul>' +
      '<li><span class="tf-tick">&#10003;</span><div>Free delivery to most UK mainland postcodes' +
        '<small>Some areas (e.g. Scotland, Cornwall, parts of Kent) carry a delivery charge, shown at checkout before you pay.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Made to order, delivered in around 10 days (15 days for vented lanterns)' +
        '<small>From payment clearing.</small></div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Price includes VAT</div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Sheerline S1 system: 25-year manufacturer guarantee</div></li>' +
      '<li><span class="tf-tick">&#10003;</span><div>Questions? Call <a href="tel:01785508212">01785 508212</a> (Mon&ndash;Fri, 9am&ndash;5pm)</div></li>' +
    '</ul>' +
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
