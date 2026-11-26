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
      '<p>The sizes we list are the <strong>external upstand (kerb) dimensions</strong> your lantern sits on, including any roof covering. They are not the size of the hole in the ceiling. Measure the outside of the upstand, width first and then length. If your size isn’t listed, <a href="' + QUOTE + '">ask for a custom quote</a>.</p>' +
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

  function isPage() { return /^\/categories\/roof-lanterns\/1565765000030904207\/?$/.test(window.location.pathname); }

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
