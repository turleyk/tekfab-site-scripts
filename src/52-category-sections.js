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
