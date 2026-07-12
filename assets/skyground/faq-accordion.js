// FAQ Accordion System
class FAQAccordion {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.initializeFromHash();
  }

  attachEventListeners() {
    // Skip FAQ blocks inside [data-faq] — those are wired up by features.js
    document.querySelectorAll('.faq-question').forEach(question => {
      if (question.closest('[data-faq]')) return;
      question.addEventListener('click', (e) => {
        const item = e.target.closest('.faq-item');
        this.toggle(item);
      });
    });

    // Search in FAQ
    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterFAQ(e.target.value);
      });
    }
  }

  toggle(item) {
    const isOpen = item.classList.contains('active');
    
    // Close all others (optional - remove for multi-open)
    document.querySelectorAll('.faq-item.active').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('active');
      }
    });

    item.classList.toggle('active', !isOpen);
    
    // Update URL hash
    if (!isOpen) {
      const id = item.id || item.querySelector('.faq-question').textContent.toLowerCase().replace(/\s+/g, '-');
      window.location.hash = id;
    } else {
      history.replaceState(null, null, ' ');
    }
  }

  filterFAQ(query) {
    const lowerQuery = query.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
      const question = item.querySelector('.faq-question').textContent.toLowerCase();
      const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
      
      if (question.includes(lowerQuery) || answer.includes(lowerQuery)) {
        item.style.display = '';
        if (query.length >= 3) {
          item.classList.add('active');
        }
      } else {
        item.style.display = 'none';
      }
    });
  }

  initializeFromHash() {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const item = document.getElementById(id) || 
                   Array.from(document.querySelectorAll('.faq-item')).find(el => 
                     el.querySelector('.faq-question').textContent.toLowerCase().replace(/\s+/g, '-') === id
                   );
      if (item) {
        item.classList.add('active');
        setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.FAQAccordion = new FAQAccordion();
  });
}
