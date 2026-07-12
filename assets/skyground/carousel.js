(() => {
  const carousel = document.querySelector('.gallery-carousel');
  if (!carousel) return;

  const scrollContainer = carousel.querySelector('.carousel-scroll-container');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  if (!scrollContainer || !prevBtn || !nextBtn) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let autoScrollInterval;
  let paused = false;
  let currentIndex = 0;
  const itemWidth = 300 + 16;
  const itemsCount = scrollContainer.children.length;
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

  const updateDots = () => {
    dots.forEach((dot, idx) => {
      const active = idx === currentIndex;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
      dot.setAttribute('tabindex', active ? '0' : '-1');
    });
  };

  const scrollToIndex = (index) => {
    currentIndex = index;
    scrollContainer.scrollLeft = index * itemWidth;
    updateDots();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % itemsCount;
    scrollToIndex(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + itemsCount) % itemsCount;
    scrollToIndex(currentIndex);
  };

  // No auto-advance for users who asked for reduced motion,
  // and pause while the carousel is hovered or holds keyboard focus.
  const startAutoScroll = () => {
    if (reducedMotion || paused) return;
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, 5000);
  };

  const stopAutoScroll = () => clearInterval(autoScrollInterval);

  nextBtn.addEventListener('click', () => {
    stopAutoScroll();
    nextSlide();
    startAutoScroll();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoScroll();
    prevSlide();
    startAutoScroll();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      stopAutoScroll();
      scrollToIndex(idx);
      startAutoScroll();
    });
  });

  // Arrow keys move between dots (standard tablist behaviour)
  if (dotsContainer) {
    dotsContainer.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      stopAutoScroll();
      if (e.key === 'ArrowRight') nextSlide(); else prevSlide();
      dots[currentIndex].focus();
      startAutoScroll();
    });
  }

  carousel.addEventListener('mouseenter', () => { paused = true; stopAutoScroll(); });
  carousel.addEventListener('mouseleave', () => { paused = false; startAutoScroll(); });
  carousel.addEventListener('focusin', () => { paused = true; stopAutoScroll(); });
  carousel.addEventListener('focusout', (e) => {
    if (!carousel.contains(e.relatedTarget)) {
      paused = false;
      startAutoScroll();
    }
  });

  let scrollTimeout;
  scrollContainer.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    stopAutoScroll();
    scrollTimeout = setTimeout(startAutoScroll, 2000);
  });

  updateDots();
  startAutoScroll();
})();
