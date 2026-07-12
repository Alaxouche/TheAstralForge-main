// Site search. The index is generated at build time by Jekyll
// (assets/data/search-index.json) from every page's title and its
// h2/h3 section headings — nothing is hardcoded here.
class SearchSystem {
  constructor() {
    this.searchData = [];
    this.init();
  }

  async init() {
    this.attachEventListeners();
    await this.loadSearchIndex();
  }

  async loadSearchIndex() {
    try {
      const res = await fetch('/assets/data/search-index.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.searchData = await res.json();
    } catch (err) {
      console.warn('[SearchSystem] could not load search index:', err);
      this.searchData = [];
    }
  }

  search(query) {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    const results = [];

    for (const item of this.searchData) {
      const titleHit = item.title.toLowerCase().includes(q);
      const categoryHit = item.category.toLowerCase().includes(q);
      const headingHit = (item.headings || []).find(h => h.toLowerCase().includes(q));

      if (titleHit || categoryHit || headingHit) {
        results.push({
          ...item,
          // Rank title matches above section matches
          score: titleHit ? 2 : (headingHit ? 1 : 0),
          matchedHeading: !titleHit && headingHit ? headingHit : null,
        });
      }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  }

  attachEventListeners() {
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;
    
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = e.target.value;
        const results = this.search(query);
        this.displayResults(results, searchResults);
      }, 300);
    });
    
    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('show');
      }
    });
    
    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length >= 2) {
        searchResults.classList.add('show');
      }
    });
  }

  displayResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">No results found</div>';
      container.classList.add('show');
      return;
    }
    
    const query = container.closest('.search-container').querySelector('input').value;
    container.innerHTML = results.map(result => `
      <a href="${result.url}" class="search-result-item">
        <div class="search-result-title">${this.highlightMatch(result.title, query)}</div>
        <div class="search-result-category">${
          result.matchedHeading
            ? `${result.category} › ${this.highlightMatch(result.matchedHeading, query)}`
            : result.category
        }</div>
      </a>
    `).join('');
    
    container.classList.add('show');
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.SearchSystem = new SearchSystem();
  });
}
