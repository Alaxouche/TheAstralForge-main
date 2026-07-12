// Stats System — fetches live data from modlist.json
const DEFAULT_MODLIST_JSON_URL = 'https://raw.githubusercontent.com/Alaxouche/Wunduniik/main/modlist.json';
const MODLIST_SNAPSHOT_URL = '/assets/data/modlist-snapshot.json';

const MODLIST_SOURCE_MAP = {
  'wunduniik': DEFAULT_MODLIST_JSON_URL,
  'krentoraan': 'https://raw.githubusercontent.com/Alaxouche/Krentoraan/main/modlist.json',
  'ghost-of-the-grid': DEFAULT_MODLIST_JSON_URL,
  'no-mans-sky-explorer': DEFAULT_MODLIST_JSON_URL,
  'extrasolar-containment-protocol': DEFAULT_MODLIST_JSON_URL
};

// Maps page modlist_id → "title" field in modlist.json
const MODLIST_TITLE_MAP = {
  'wunduniik':            'Wunduniik',
  'krentoraan':           'Krentoraan',
  'ghost-of-the-grid':    'Ghost of the Grid',
  'no-mans-sky-explorer': "No Man's Sky - Explorer",
  'extrasolar-containment-protocol': 'Extrasolar Containment Protocol'
};

class StatsSystem {
  constructor() {
    this.init();
  }

  async init() {
    const elements = document.querySelectorAll('[data-stats-modlist]');
    if (!elements.length) return;

    elements.forEach(el => {
      el.dataset.statsState = 'loading';
    });

    const sourceMap = new Map();

    elements.forEach(el => {
      const modlistId = el.dataset.statsModlist;
      const source = el.dataset.statsSource || MODLIST_SOURCE_MAP[modlistId] || DEFAULT_MODLIST_JSON_URL;
      if (!sourceMap.has(source)) {
        sourceMap.set(source, []);
      }
      sourceMap.get(source).push(el);
    });

    for (const [source, scopedElements] of sourceMap.entries()) {
      const data = await this.fetchWithFallback(source);
      if (!data) {
        scopedElements.forEach(el => {
          el.dataset.statsState = 'error';
        });
        continue;
      }

      this.render(scopedElements, data);
    }
  }

  async fetchJson(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async fetchWithFallback(source) {
    const sources = [source, DEFAULT_MODLIST_JSON_URL, MODLIST_SNAPSHOT_URL]
      .filter((value, index, arr) => value && arr.indexOf(value) === index);

    for (const candidate of sources) {
      try {
        return await this.fetchJson(candidate);
      } catch (error) {
        console.warn('[StatsSystem] Source failed:', candidate, error);
      }
    }

    return null;
  }

  render(elements, data) {
    const entries = Array.isArray(data) ? data : [data];
    const normalize = (value) => String(value || '').trim().toLowerCase();

    elements.forEach(el => {
      const modlistId = el.dataset.statsModlist;
      const title = el.dataset.statsTitle || MODLIST_TITLE_MAP[modlistId];
      if (!title) return;

      const targetTitle = normalize(title);
      const entry = entries.find(item => normalize(item && item.title) === targetTitle);
      if (!entry) {
        el.dataset.statsState = 'error';
        return;
      }

      const version     = entry.version || '—';
      const mods        = entry.download_metadata?.NumberOfArchives ?? '—';
      const totalBytes  = entry.download_metadata?.TotalSize;
      const size        = totalBytes != null ? this.formatBytes(totalBytes) : '—';
      const dateUpdated = entry.dateUpdated ? this.formatDate(entry.dateUpdated) : '—';

      el.innerHTML = `
        <div class="project-stat">
          <span class="project-stat__value">${version}</span>
          <span class="project-stat__label">Version</span>
        </div>
        <div class="project-stat">
          <span class="project-stat__value">${typeof mods === 'number' ? mods.toLocaleString() : mods}</span>
          <span class="project-stat__label">Mods</span>
        </div>
        <div class="project-stat">
          <span class="project-stat__value">${size}</span>
          <span class="project-stat__label">Total Size</span>
        </div>
        <div class="project-stat">
          <span class="project-stat__value">${dateUpdated}</span>
          <span class="project-stat__label">Last Update</span>
        </div>
      `;
      el.dataset.statsState = 'success';
    });
  }

  formatBytes(bytes) {
    const gb = bytes / (1024 ** 3);
    if (gb >= 1) return `${gb.toFixed(1)} GB`;
    const mb = bytes / (1024 ** 2);
    return `${mb.toFixed(0)} MB`;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now  = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7)  return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  const boot = () => {
    window.StatsSystem = new StatsSystem();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
