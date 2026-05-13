// Prefetch fallback for browsers that do not support the Speculation Rules API
// (Firefox, Safari). Listens for pointer-enter events on same-origin links and
// injects a <link rel="prefetch"> (or preload) element to hint the browser.
if (!HTMLScriptElement.supports || !HTMLScriptElement.supports('speculationrules')) {
  const preloadedUrls = {};

  const pointerenterHandler = function () {
    if (!preloadedUrls[this.href]) {
      preloadedUrls[this.href] = true;

      const prefetcher = document.createElement('link');

      prefetcher.as = prefetcher.relList.supports('prefetch') ? 'document' : 'fetch';
      prefetcher.rel = prefetcher.relList.supports('prefetch') ? 'prefetch' : 'preload';
      prefetcher.href = this.href;

      document.head.appendChild(prefetcher);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="/"]').forEach((item) => {
      item.addEventListener('pointerenter', pointerenterHandler);
    });
  });
}
