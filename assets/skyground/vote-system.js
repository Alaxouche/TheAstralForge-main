/**
 * vote-system.js
 * "Was this helpful?" feedback — the single handler for page votes
 * (.vote-btn) and FAQ item votes (.faq-vote).
 *
 * The user's own vote is kept in localStorage (key "af_votes") so the UI
 * remembers it. Each newly cast vote is ALSO counted globally through the
 * free Abacus counter API, so the site owner gets real numbers.
 * Notes on the remote counts:
 *   - fire-and-forget: if the API is down, the UI still works;
 *   - counters only increment, so un-voting or switching a vote cannot
 *     decrement — treat the numbers as a trend, not an exact tally.
 * Read the counts with: node scripts/vote-stats.mjs
 */
(() => {
  const STORAGE_KEY = 'af_votes';
  const REMOTE_API  = 'https://abacus.jasoncameron.dev/hit/theastralforge';

  /* ── Storage helpers ─────────────────────────────────────── */

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch {}
  }

  /* ── Remote counter (Abacus) ─────────────────────────────── */

  // Abacus keys: [A-Za-z0-9._-], max 64 chars. Same logic lives in
  // scripts/vote-stats.mjs — keep the two in sync.
  function remoteKey(kind, id, type) {
    const slug = String(kind + '-' + id)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 58);
    return slug + (type === 'helpful' ? '-yes' : '-no');
  }

  function recordRemote(kind, id, type) {
    try {
      fetch(`${REMOTE_API}/${remoteKey(kind, id, type)}`, { keepalive: true })
        .catch(() => {});
    } catch {}
  }

  /* ── Page-level vote section (".vote-btn") ───────────────── */

  function initPageVotes() {
    const buttons = document.querySelectorAll('.vote-btn[data-vote]');
    if (!buttons.length) return;

    const pageId = 'page:' + window.location.pathname;

    function renderButtons() {
      const data = load();
      const entry = data[pageId] || { helpful: 0, 'not-helpful': 0, userVote: null };
      buttons.forEach(btn => {
        const type = btn.dataset.vote;
        const countEl = btn.querySelector('.vote-count');
        if (countEl) countEl.textContent = entry[type] || 0;
        btn.classList.toggle('vote-btn--active', entry.userVote === type);
        btn.setAttribute('aria-pressed', String(entry.userVote === type));
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const type   = btn.dataset.vote;
        const data   = load();
        const entry  = data[pageId] || { helpful: 0, 'not-helpful': 0, userVote: null };
        const prev   = entry.userVote;

        // Undo previous vote if any
        if (prev !== null) {
          entry[prev] = Math.max(0, (entry[prev] || 0) - 1);
        }

        if (prev === type) {
          // Toggle off — user un-votes
          entry.userVote = null;
        } else {
          // Cast new vote
          entry[type] = (entry[type] || 0) + 1;
          entry.userVote = type;
          recordRemote('page', window.location.pathname, type);
        }

        data[pageId] = entry;
        save(data);
        renderButtons();
      });
    });

    renderButtons();
  }

  /* ── FAQ item votes (".faq-vote") ────────────────────────── */

  function initFaqVotes() {
    const items = document.querySelectorAll('[data-faq-item][data-faq-id]');
    if (!items.length) return;

    function renderItem(item, faqId) {
      const data  = load();
      const key   = 'faq:' + faqId;
      const entry = data[key] || { helpful: 0, unhelpful: 0, userVote: null };

      item.querySelectorAll('.faq-vote[data-faq-vote]').forEach(btn => {
        const type    = btn.dataset.faqVote;
        const countEl = btn.querySelector('.faq-vote-count');
        if (countEl) countEl.textContent = entry[type] || 0;
        btn.classList.toggle('faq-vote--active', entry.userVote === type);
        btn.setAttribute('aria-pressed', String(entry.userVote === type));
      });
    }

    items.forEach(item => {
      const faqId = item.dataset.faqId;
      const key   = 'faq:' + faqId;

      renderItem(item, faqId);

      item.querySelectorAll('.faq-vote[data-faq-vote]').forEach(btn => {
        btn.addEventListener('click', () => {
          const type  = btn.dataset.faqVote;
          const data  = load();
          const entry = data[key] || { helpful: 0, unhelpful: 0, userVote: null };
          const prev  = entry.userVote;

          if (prev !== null) {
            entry[prev] = Math.max(0, (entry[prev] || 0) - 1);
          }

          if (prev === type) {
            entry.userVote = null;
          } else {
            entry[type] = (entry[type] || 0) + 1;
            entry.userVote = type;
            recordRemote('faq', faqId, type);
          }

          data[key] = entry;
          save(data);
          renderItem(item, faqId);
        });
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────── */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPageVotes();
      initFaqVotes();
    });
  } else {
    initPageVotes();
    initFaqVotes();
  }
})();
