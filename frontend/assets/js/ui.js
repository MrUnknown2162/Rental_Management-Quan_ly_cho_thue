const ui = (() => {
  let loaderEl = null;
  function showLoader(container = document.body) {
    hideLoader();
    loaderEl = document.createElement('div');
    loaderEl.className = 'global-loader';
    loaderEl.innerHTML = '<div class="lds-dual-ring"></div>';
    container.appendChild(loaderEl);
  }
  function hideLoader() {
    if (loaderEl && loaderEl.parentNode) loaderEl.parentNode.removeChild(loaderEl);
    loaderEl = null;
  }
  function showToast(msg, timeout = 2500) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('visible'), 10);
    setTimeout(() => t.classList.remove('visible'), timeout);
    setTimeout(() => t.remove(), timeout + 300);
  }
  return { showLoader, hideLoader, showToast };
})();