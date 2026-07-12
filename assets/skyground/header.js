(() => {
  const header = document.querySelector('header');
  
  if (!header) return;
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
})();

(() => {
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  
  if (!searchInput || !searchResults) return;
  
  const getSearchableContent = () => {
    const pages = [];
    
    document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      const text = heading.textContent.trim();
      if (text.length > 0) {
        pages.push({
          title: text,
          url: window.location.pathname + '#' + (heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-')),
          type: heading.tagName.toLowerCase(),
        });
      }
    });
    
    return pages;
  };
  
  const searchableContent = getSearchableContent();
  
  const performSearch = (query) => {
    if (!query.trim()) {
      searchResults.classList.remove('active');
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = searchableContent.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery)
    );
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
      searchResults.classList.add('active');
      return;
    }
    
    searchResults.innerHTML = results
      .slice(0, 10)
      .map(
        (result) =>
          `<div class="search-result-item">
            <a href="${result.url}">
              <div class="search-result-title">${result.title}</div>
            </a>
          </div>`
      )
      .join('');
    
    searchResults.classList.add('active');
  };
  
  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.remove('active');
      searchInput.value = '';
    }
  });
})();
