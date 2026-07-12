// Parallax Hero Effect
class ParallaxEffect {
  constructor() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    // Respect users who prefer reduced motion: skip the parallax entirely.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.init();
  }

  init() {
    // Create parallax layers
    const heroContent = this.hero.innerHTML;
    this.hero.innerHTML = `
      <div class="hero-bg-layer" data-parallax-speed="0.5"></div>
      <div class="hero-content-wrapper">${heroContent}</div>
    `;

    this.layers = this.hero.querySelectorAll('[data-parallax-speed]');
    this.contentWrapper = this.hero.querySelector('.hero-content-wrapper');
    
    this.handleScroll = this.handleScroll.bind(this);
    
    // Use IntersectionObserver to optimize performance
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.handleScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', this.handleScroll);
        }
      });
    }, { rootMargin: '100px' });
    
    this.observer.observe(this.hero);
    this.handleScroll(); // Initial position
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const heroRect = this.hero.getBoundingClientRect();
    const heroTop = scrollY + heroRect.top;
    const heroHeight = heroRect.height;
    
    // Only apply parallax when hero is in viewport
    if (scrollY < heroTop + heroHeight) {
      this.layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.parallaxSpeed || 0.5);
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
      
      // Fade out content as you scroll
      const opacity = 1 - (scrollY / heroHeight);
      if (this.contentWrapper) {
        this.contentWrapper.style.opacity = Math.max(0, opacity);
      }
    }
  }
}

// Smooth Scroll Enhancement with offset for fixed header
class SmoothScroller {
  constructor() {
    this.headerHeight = 120; // Adjust based on your header height
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const targetPosition = target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = targetPosition - this.headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL
          history.pushState(null, null, href);
        }
      });
    });
  }
}

// Enhanced Image Lazy Loading
class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      this.images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
      });
    }
  }
}

// Initialize Performance Enhancements
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceFeatures);
  } else {
    initPerformanceFeatures();
  }
}

function initPerformanceFeatures() {
  // Initialize Parallax (only on homepage)
  if (document.querySelector('.hero')) {
    window.ParallaxEffect = new ParallaxEffect();
  }
  
  // Initialize Smooth Scroller
  window.SmoothScroller = new SmoothScroller();
  
  // Initialize Lazy Loading
  window.LazyImageLoader = new LazyImageLoader();
  
  // Add performance hint to theme toggle
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle && !themeToggle.title) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    themeToggle.title = `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`;
  }
}
