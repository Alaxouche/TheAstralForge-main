/**
 * version-banner.js
 * On a modlist page, compares the latest version in the modlist snapshot to the
 * version the visitor last saw (localStorage). If it changed, shows a dismissible
 * "new version available" banner. First visit is recorded silently.
 */
(function () {
  'use strict';

  var SNAPSHOT_URL = '/assets/data/modlist-snapshot.json';
  var SEEN_PREFIX  = 'taf-seen-version:';

  var TITLE_MAP = {
    'wunduniik':                       'Wunduniik',
    'krentoraan':                      'Krentoraan',
    'ghost-of-the-grid':               'Ghost of the Grid',
    'no-mans-sky-explorer':            "No Man's Sky - Explorer",
    'extrasolar-containment-protocol': 'Extrasolar Containment Protocol'
  };

  var STRINGS = {
    en: { msg: 'New version {v} available', cta: 'View changelog', close: 'Dismiss' },
    fr: { msg: 'Nouvelle version {v} disponible', cta: 'Voir le journal', close: 'Fermer' },
    de: { msg: 'Neue Version {v} verfügbar', cta: 'Änderungen ansehen', close: 'Schließen' },
    es: { msg: 'Nueva versión {v} disponible', cta: 'Ver cambios', close: 'Cerrar' },
    ru: { msg: 'Доступна новая версия {v}', cta: 'Список изменений', close: 'Закрыть' }
  };

  function lang() {
    try {
      var l = localStorage.getItem('sg-lang');
      return STRINGS[l] ? l : 'en';
    } catch (_) { return 'en'; }
  }

  function changelogHref(modlistId) {
    var links = document.querySelectorAll('a[href*="changelog"]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('href').indexOf(modlistId) !== -1) {
        return links[i].getAttribute('href');
      }
    }
    return null;
  }

  function showBanner(version, modlistId) {
    var s = STRINGS[lang()];
    var host = document.querySelector('.readme-content');
    if (!host) return;

    var banner = document.createElement('div');
    banner.className = 'version-banner';
    banner.setAttribute('role', 'status');

    var text = document.createElement('span');
    text.className = 'version-banner__text';
    text.textContent = s.msg.replace('{v}', version);
    banner.appendChild(text);

    var href = changelogHref(modlistId);
    if (href) {
      var link = document.createElement('a');
      link.className = 'version-banner__cta';
      link.href = href;
      link.textContent = s.cta;
      banner.appendChild(link);
    }

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'version-banner__close';
    close.setAttribute('aria-label', s.close);
    close.textContent = '×';
    close.addEventListener('click', function () {
      try { localStorage.setItem(SEEN_PREFIX + modlistId, version); } catch (_) {}
      banner.remove();
    });
    banner.appendChild(close);

    host.insertBefore(banner, host.firstChild);
  }

  function init() {
    var el = document.querySelector('[data-stats-modlist]');
    if (!el) return;
    var modlistId = el.dataset.statsModlist;
    var title = el.dataset.statsTitle || TITLE_MAP[modlistId];
    if (!title) return;

    fetch(SNAPSHOT_URL, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        var entries = Array.isArray(data) ? data : [data];
        var norm = function (v) { return String(v || '').trim().toLowerCase(); };
        var entry = entries.find(function (it) { return norm(it.title) === norm(title); });
        if (!entry || !entry.version) return;

        var version = entry.version;
        var seenKey = SEEN_PREFIX + modlistId;
        var seen;
        try { seen = localStorage.getItem(seenKey); } catch (_) { seen = null; }

        if (seen == null) {
          // First visit: record silently, don't nag.
          try { localStorage.setItem(seenKey, version); } catch (_) {}
        } else if (seen !== version) {
          showBanner(version, modlistId);
        }
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
