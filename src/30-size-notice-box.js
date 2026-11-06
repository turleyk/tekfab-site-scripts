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
