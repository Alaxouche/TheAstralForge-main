/**
 * community-gallery.js — filter buttons for the homepage community gallery.
 * The gallery itself is rendered by Jekyll from _data/community_gallery.yml;
 * this only shows/hides items per modlist.
 */
(() => {
  const container = document.getElementById('user-gallery-container');
  const buttons = document.querySelectorAll('.gallery-filter-btn');
  if (!container || !buttons.length) return;

  const items = container.querySelectorAll('.gallery-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.toggle('active', b === btn));
      items.forEach(item => {
        item.style.display =
          (filter === 'all' || item.dataset.modlist === filter) ? '' : 'none';
      });
    });
  });
})();
