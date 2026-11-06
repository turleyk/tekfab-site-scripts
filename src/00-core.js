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
