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
