/**
 * nav-fold.js
 * Explicitly collapses/expands nav items using inline styles.
 * Runs before paint (via DOMContentLoaded) to avoid flicker.
 */
(function () {
  function initNav() {
    var nav = document.querySelector('.readme-nav');
    if (!nav) return;

    // Collapse every child nav-list
    nav.querySelectorAll('.nav-list-item > .nav-list').forEach(function (ul) {
      ul.style.display = 'none';
    });

    // Expand nav-lists whose li.active was set by Jekyll
    nav.querySelectorAll('.nav-list-item.active > .nav-list').forEach(function (ul) {
      ul.style.display = 'block';
    });

    // Rotate expander arrows for open items
    nav.querySelectorAll('.nav-list-item.active > .nav-list-expander svg, .nav-list-item.nav-open > .nav-list-expander svg').forEach(function (svg) {
      svg.style.transform = 'rotate(90deg)';
    });

    // Click handler
    nav.querySelectorAll('.nav-list-expander').forEach(function (expander) {
      expander.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var li = expander.closest('.nav-list-item');
        if (!li) return;
        var childNav = li.querySelector(':scope > .nav-list');
        if (!childNav) return;
        var isOpen = childNav.style.display !== 'none';
        childNav.style.display = isOpen ? 'none' : 'block';
        var svg = expander.querySelector('svg');
        if (svg) svg.style.transform = isOpen ? '' : 'rotate(90deg)';
        li.classList.toggle('nav-open', !isOpen);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
