/* TekFab site scripts for shop.tekfab.co.uk. Built 2026-11-06T16:56Z from src/. Do not edit site.js directly. */
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

// Source: tekfab-website-code/header/02-filter-sort-numeric.html
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
sortedContainers.forEach((container, index) => {
if (index < maxVisibleOptions && maxVisibleOptions < totalOptions) {
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

// Source: tekfab-website-code/header/03-mobile-quote-widget.html
TF.ready(function() {
var currentPath = window.location.pathname;

// 1. Strictly verify this is a category page first
var isCategoryPage = currentPath.indexOf('/categories') > -1;

if (isCategoryPage) {
// 2. List the specific lantern collections
var targetKeywords = [
'roof-lanterns',
'ridged-lanterns',
'vented-roof-lanterns',
'pyramid-lanterns'
];

// Check if the URL contains any of our target terms
var isTargetCollection = targetKeywords.some(function(keyword) {
return currentPath.indexOf(keyword) > -1;
});

// 3. Only run if it's a target category AND on a mobile screen width
if (isTargetCollection && window.innerWidth < 768) {

var targetElement = document.querySelector('.zs-product-list') ||
document.querySelector('.theme-product-collection') ||
document.querySelector('[data-zs-product-list]') ||
document.querySelector('#product-list-container');

if (!targetElement) {
targetElement = document.querySelector('main') || document.querySelector('#main-container');
}

if (targetElement) {
if (document.getElementById('zoho-mobile-custom-quote-widget')) return;

var mobileFormWrapper = document.createElement('div');
mobileFormWrapper.id = 'zoho-mobile-custom-quote-widget';
mobileFormWrapper.style.width = '100%';
mobileFormWrapper.style.marginBottom = '20px';

mobileFormWrapper.innerHTML = `
<div style="font-family:'Inter', sans-serif; margin:10px auto; max-width:100%; padding:0 10px; box-sizing:border-box;">
<div style="background-color:rgb(255, 255, 255); border:1px solid rgb(226, 232, 240); border-top:4px solid rgb(2, 132, 199); padding:16px; box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.05); box-sizing:border-box; border-radius:4px;">
<form action="https://shop.tekfab.co.uk/roof-lantern-quote-v2" method="get" style="margin:0; padding:0;">
<h3 style="margin:0 0 6px 0; font-size:15px; font-weight:700; color:rgb(30, 41, 59); text-align:left;">Find Your Size or Get a Custom Quote</h3>
<p style="margin:0 0 12px 0; font-size:13px; line-height:1.4; color:rgb(100, 116, 139); text-align:left;">
Tap the <strong>"Show All Filters"</strong> button below to find a standard size for instant checkout.
<br><br>
Alternatively, if your exact dimensions aren't listed, enter your sizes below to configure a custom size for quotation.
</p>

<div style="margin-bottom:12px; clear:both; overflow:hidden;">
<div style="float:left; width:48%; margin-right:4%;">
<label style="display:block; font-size:10px; font-weight:700; color:rgb(100, 116, 139); text-transform:uppercase; margin-bottom:2px; text-align:left;">Width (mm)</label>
<input type="number" name="width" placeholder="e.g. 1000" style="width:100%; padding:8px; border:1px solid rgb(226, 232, 240); font-size:13px; box-sizing:border-box; border-radius:4px; color:#1e293b; background-color:#ffffff;">
</div>
<div style="float:left; width:48%;">
<label style="display:block; font-size:10px; font-weight:700; color:rgb(100, 116, 139); text-transform:uppercase; margin-bottom:2px; text-align:left;">Length (mm)</label>
<input type="number" name="length" placeholder="e.g. 3000" style="width:100%; padding:8px; border:1px solid rgb(226, 232, 240); font-size:13px; box-sizing:border-box; border-radius:4px; color:#1e293b; background-color:#ffffff;">
</div>
</div>

<button type="submit" style="width:100%; text-align:center; background-color:rgb(2, 132, 199); color:rgb(255, 255, 255); font-weight:600; font-size:13px; padding:10px 12px; border:none; border-radius:4px; cursor:pointer;">Configure Custom Sizing</button>
</form>
</div>
</div>
`;

targetElement.parentNode.insertBefore(mobileFormWrapper, targetElement);
}
}
}
});

// Source: tekfab-website-code/header/04-size-notice-box.html
TF.css(".size-notice-box {\nbackground-color: #f8fafc;\nborder: 2px solid #0284c7;\nborder-radius: 8px;\npadding: 14px 18px;\nmargin: 12px 0 16px 0;\nbox-shadow: 0 2px 4px rgba(0,0,0,0.05);\nfont-family: inherit;\n}\n.size-notice-breadcrumb {\nfont-size: 11px;\ntext-transform: uppercase;\nletter-spacing: 0.5px;\nfont-weight: 700;\ncolor: #64748b;\nmargin-bottom: 4px;\n}\n.size-notice-breadcrumb a {\ncolor: #0284c7 !important;\ntext-decoration: none !important;\n}\n.size-notice-breadcrumb a:hover {\ntext-decoration: underline !important;\n}\n.size-notice-title {\nfont-size: 14px;\nfont-weight: 700;\ncolor: #0f172a;\nmargin-bottom: 4px;\ndisplay: flex;\nalign-items: center;\ngap: 6px;\n}\n.size-notice-desc {\nfont-size: 12px;\ncolor: #475569;\nmargin-bottom: 8px;\nline-height: 1.35;\n}\n.size-notice-guide {\nbackground-color: #f1f5f9;\nborder-left: 3px solid #0284c7;\npadding: 6px 10px;\nmargin-bottom: 10px;\nfont-size: 11px;\ncolor: #334155;\nline-height: 1.35;\nborder-radius: 0 4px 4px 0;\n}\n.size-notice-btn {\ndisplay: block;\ntext-align: center;\nbackground-color: #0284c7;\ncolor: #ffffff !important;\nfont-weight: 600;\nfont-size: 13px;\npadding: 8px 12px;\nborder-radius: 5px;\ntext-decoration: none !important;\ntransition: background-color 0.2s;\n}\n.size-notice-btn:hover {\nbackground-color: #0369a1;\n}\n.size-notice-nav {\nmargin-top: 10px;\npadding-top: 8px;\nborder-top: 1px solid #e2e8f0;\nfont-size: 11px;\ncolor: #64748b;\nline-height: 1.4;\n}\n.size-notice-nav a {\ncolor: #0284c7 !important;\ntext-decoration: underline !important;\nfont-weight: 500;\n}\n.size-notice-nav a:hover {\ncolor: #0369a1 !important;\n}\n\n/* MOBILE-SPECIFIC OPTIMIZATIONS */\n@media (max-width: 600px) {\n.size-notice-box {\npadding: 10px 12px;\nmargin: 10px 0 14px 0;\n}\n.size-notice-title {\nfont-size: 13px;\n}\n.size-notice-desc {\nfont-size: 11px;\n}\n.size-notice-guide {\nfont-size: 11px;\npadding: 5px 8px;\nmargin-bottom: 8px;\n}\n.size-notice-btn {\nfont-size: 12px;\npadding: 7px 10px;\n}\n}");
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
var buttonText = "Filter All Roof Lantern Sizes →";
var styleName = "Roof Lantern";
var styleDesc = "<strong>Quick Style Guide:</strong> Ridged lanterns are rectangular, Pyramids are square, and Vented options add electric opening vents for airflow.";

// ROUTE 1: Ridged Lanterns
if (currentPath.includes("ridged-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/ridged-lanterns/1565765000052482103";
buttonText = "Filter All Ridged Lantern Sizes →";
styleName = "Ridged Lanterns";
styleDesc = "<strong>Ridged Style:</strong> Designed for standard rectangular roof openings (not square).";
}
// ROUTE 2: Single Vented Lanterns
else if (currentPath.includes("single-vented-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/vented-roof-lanterns/1565765000052482117?pf=32328000003634033_Type_Single_Vented_Aluminium_Lantern_Roof";
buttonText = "Filter All Single Vented Sizes →";
styleName = "Vented Lanterns (Single)";
styleDesc = "<strong>Vented Style:</strong> Standard rectangular ridged lantern equipped with 1 electric opening vent for ventilation.";
}
// ROUTE 3: Double Vented Lanterns
else if (currentPath.includes("double-vented-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/vented-roof-lanterns/1565765000052482117?pf=32328000003634033_Type_Double_Vented_Aluminium_Lantern_Roof";
buttonText = "Filter All Double Vented Sizes →";
styleName = "Vented Lanterns (Double)";
styleDesc = "<strong>Vented Style:</strong> Standard rectangular ridged lantern equipped with 2 electric opening vents for maximum ventilation.";
}
// ROUTE 4: Pyramid Lanterns
else if (currentPath.includes("pyramid-aluminium-lantern-roof")) {
targetUrl = "https://shop.tekfab.co.uk/categories/pyramid-lanterns/1565765000052482061";
buttonText = "Filter All Pyramid Lantern Sizes →";
styleName = "Pyramid Lanterns";
styleDesc = "<strong>Pyramid Style:</strong> Designed specifically for perfectly square roof openings (equal length and width).";
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
This listing is for a specific set dimension. Filter all available standard sizes by your exact width & length on our main catalog page.
</div>

<!-- Quick Style Guide Callout -->
<div class="size-notice-guide">
${styleDesc}
</div>

<!-- Main Action Button -->
<a href="${targetUrl}" class="size-notice-btn">
${buttonText}
</a>

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
})();
