/**
 * loadorder.js — fullscreen toggle for the Load Order Library embed.
 */
(function () {
  'use strict';

  function init() {
    document.querySelectorAll('[data-loadorder]').forEach(function (embed) {
      var btn = embed.querySelector('[data-lo-fullscreen]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (embed.requestFullscreen) {
          embed.requestFullscreen().catch(function () {
            embed.classList.toggle('lo-embed--maximized');
          });
        } else {
          // No Fullscreen API: fall back to a CSS "maximized" overlay.
          embed.classList.toggle('lo-embed--maximized');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
