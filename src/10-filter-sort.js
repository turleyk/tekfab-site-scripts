// Sorts numeric filter options (e.g. Width, Length) in number order on category pages. Originally a Zoho Header Code snippet.
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
// sortedContainers runs largest first; show the smallest N, the same as Zoho's own "Show less".
sortedContainers.slice().reverse().forEach((container, index) => {
if (maxVisibleOptions > 0 && index >= maxVisibleOptions && maxVisibleOptions < totalOptions) {
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
