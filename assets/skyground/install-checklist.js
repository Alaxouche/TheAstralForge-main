/**
 * install-checklist.js
 * Persists per-step "complete" state for installation guides in localStorage,
 * and reflects completed steps on the install stepper pills. Lets a user pick
 * up the install where they left off across sessions.
 */
(function () {
  'use strict';

  var PREFIX = 'taf-step-done:';

  function key(url) { return PREFIX + url; }

  function isDone(url) {
    try { return localStorage.getItem(key(url)) === '1'; }
    catch (_) { return false; }
  }

  function setDone(url, done) {
    try {
      if (done) localStorage.setItem(key(url), '1');
      else localStorage.removeItem(key(url));
    } catch (_) {}
  }

  // Mark stepper pills whose target URL is flagged done in storage.
  function reflectStepper() {
    document.querySelectorAll('.install-progress__step a[href]').forEach(function (a) {
      var li = a.closest('.install-progress__step');
      if (!li) return;
      var href = a.getAttribute('href');
      if (isDone(href) && !li.classList.contains('install-progress__step--current')) {
        li.classList.add('install-progress__step--done');
      }
    });
  }

  function init() {
    var box = document.querySelector('.install-checklist');
    if (box) {
      var url = box.dataset.stepUrl;
      var checkbox = box.querySelector('.install-checklist__checkbox');
      if (checkbox && url) {
        checkbox.checked = isDone(url);
        box.classList.toggle('install-checklist--done', checkbox.checked);
        checkbox.addEventListener('change', function () {
          setDone(url, checkbox.checked);
          box.classList.toggle('install-checklist--done', checkbox.checked);
          reflectStepper();
        });
      }
    }
    reflectStepper();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
