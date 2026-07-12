(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right').forEach(el => {
      observer.observe(el);
    });
  });
})();

(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

(() => {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

(() => {
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = button.dataset.platform;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl;
      switch(platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'reddit':
          shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
          break;
        case 'discord':
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied! Paste it in Discord.');
          });
          return;
        case 'copy':
          navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard!');
          });
          return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
})();

function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* Page votes and FAQ votes are handled by vote-system.js (single source of truth). */

(() => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
})();

(() => {
  const layout = document.querySelector('.readme-layout');
  if (!layout) return;

  const toggle = document.querySelector('[data-reading-toggle]');
  const toc = document.querySelector('[data-floating-toc]');
  const tocContent = document.querySelector('[data-floating-toc-content]');
  const content = document.querySelector('.readme-content');
  const storageKey = `reading_mode_${window.location.pathname}`;

  const slugify = (text, index) => {
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return slug || `section-${index + 1}`;
  };

  const setReadingMode = (enabled) => {
    document.body.classList.toggle('reading-mode', enabled);
    if (toggle) {
      toggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
  };

  // Only enable reading mode if user explicitly activated it, not by default
  const stored = localStorage.getItem(storageKey);
  setReadingMode(stored === 'true');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextState = !document.body.classList.contains('reading-mode');
      setReadingMode(nextState);
      localStorage.setItem(storageKey, nextState);
    });
  }

  if (!toc || !tocContent || !content) return;
  const headings = Array.from(content.querySelectorAll('h2, h3'));
  if (!headings.length) {
    toc.hidden = true;
    return;
  }

  const list = document.createElement('ul');
  list.className = 'floating-toc__list';

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent, index);
    }

    const item = document.createElement('li');
    item.className = `toc-${heading.tagName.toLowerCase()}`;
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
  });

  tocContent.innerHTML = '';
  tocContent.appendChild(list);
  toc.hidden = false;
})();

(() => {
  const faq = document.querySelector('[data-faq]');
  if (!faq) return;

  const items = Array.from(faq.querySelectorAll('[data-faq-item]'));
  const filters = Array.from(faq.querySelectorAll('[data-faq-filter]'));
  const emptyState = faq.querySelector('[data-faq-empty]');

  const setFilter = (filter) => {
    let visibleCount = 0;
    items.forEach(item => {
      const tags = (item.dataset.tags || '').split(',');
      const match = filter === 'all' || tags.includes(filter);
      item.style.display = match ? '' : 'none';
      if (match) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  };

  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      setFilter(button.dataset.faqFilter);
    });
  });

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (question && answer) {
      question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        answer.hidden = expanded;
      });
    }
  });

  setFilter('all');
})();

(() => {
  const form = document.querySelector('[data-contribution-form]');
  if (!form) return;

  const preview = form.querySelector('[data-contribution-preview]');
  const copyBtn = form.querySelector('[data-contribution-copy]');
  const fields = Array.from(form.querySelectorAll('input, textarea, select'));

  const buildPreview = () => {
    const getValue = (selector) => {
      const el = form.querySelector(selector);
      return el ? el.value.trim() : '';
    };

    const title = getValue('[name="contrib-title"]') || 'Contribution summary';
    const type = getValue('[name="contrib-type"]') || 'Docs update';
    const project = getValue('[name="contrib-project"]') || 'General';
    const details = getValue('[name="contrib-details"]') || 'Describe the change here.';
    const links = getValue('[name="contrib-links"]');

    const linkSection = links ? `\n## Links\n- ${links.replace(/\n/g, '\n- ')}` : '';

    return `# ${title}\n\n## Type\n- ${type}\n\n## Project\n- ${project}\n\n## Details\n${details}${linkSection}\n\n## Checklist\n- [ ] Tested locally\n- [ ] Updated documentation`;
  };

  const updatePreview = () => {
    if (!preview) return;
    preview.textContent = buildPreview();
  };

  fields.forEach(field => {
    field.addEventListener('input', updatePreview);
  });

  if (copyBtn && preview) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preview.textContent);
        showToast('PR draft copied to clipboard.');
      } catch (error) {
        showToast('Unable to copy. Please select the text manually.');
      }
    });
  }

  updatePreview();
})();

(() => {
  const blocks = Array.from(document.querySelectorAll('[data-modlist-size]'));
  if (!blocks.length) return;
  const defaultSource = 'https://raw.githubusercontent.com/Alaxouche/Wunduniik/main/modlist.json';
  const snapshotSource = '/assets/data/modlist-snapshot.json';

  const toGb = (bytes) => {
    if (!Number.isFinite(bytes)) return null;
    return `${(bytes / 1e9).toFixed(1)} GB`;
  };

  const pickEntry = (data, title, machineUrl) => {
    if (!Array.isArray(data)) {
      return data;
    }

    const normalizedTitle = String(title || '').toLowerCase().trim();
    const byTitle = title
      ? data.find(item => String(item.title || '').toLowerCase().trim() === normalizedTitle)
      : null;
    if (byTitle) return byTitle;

    const byMachine = machineUrl
      ? data.find(item => {
        const direct = String(item.machineURL || '').toLowerCase();
        const linked = String((item.links && item.links.machineURL) || '').toLowerCase();
        return direct === machineUrl.toLowerCase() || linked === machineUrl.toLowerCase();
      })
      : null;
    return byMachine || null;
  };

  const fetchJson = async (source) => {
    const response = await fetch(source, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const fetchWithFallback = async (source) => {
    const candidates = [source, defaultSource, snapshotSource]
      .filter((value, index, arr) => value && arr.indexOf(value) === index);

    for (const candidate of candidates) {
      try {
        return await fetchJson(candidate);
      } catch (error) {
        console.warn('[ModlistSize] Source failed:', candidate, error);
      }
    }

    return null;
  };

  const setUnavailable = (block) => {
    block.dataset.modlistState = 'error';
    const totalEl = block.querySelector('[data-modlist-total]');
    const installEl = block.querySelector('[data-modlist-install]');
    const downloadEl = block.querySelector('[data-modlist-download]');
    const versionEl = block.querySelector('[data-modlist-version]');

    if (totalEl) totalEl.textContent = 'Unavailable';
    if (installEl) installEl.textContent = 'Unavailable';
    if (downloadEl) downloadEl.textContent = 'Unavailable';
    if (versionEl) {
      versionEl.textContent = 'Version unavailable';
      versionEl.hidden = false;
    }
  };

  blocks.forEach(block => {
    const source = block.dataset.modlistSource || defaultSource;
    block.dataset.modlistState = 'loading';

    const title = block.dataset.modlistTitle;
    const machineUrl = block.dataset.modlistMachine;

    fetchWithFallback(source)
      .then(data => {
        if (!data) {
          setUnavailable(block);
          return;
        }

        const entry = pickEntry(data, title, machineUrl);
        const meta = entry && entry.download_metadata;
        if (!meta) {
          setUnavailable(block);
          return;
        }

        const install = toGb(meta.SizeOfInstalledFiles);
        const download = toGb(meta.SizeOfArchives);
        const total = toGb(meta.TotalSize || (meta.SizeOfInstalledFiles + meta.SizeOfArchives));

        const totalEl = block.querySelector('[data-modlist-total]');
        const installEl = block.querySelector('[data-modlist-install]');
        const downloadEl = block.querySelector('[data-modlist-download]');
        const versionEl = block.querySelector('[data-modlist-version]');

        if (totalEl && total) totalEl.textContent = total;
        if (installEl && install) installEl.textContent = install;
        if (downloadEl && download) downloadEl.textContent = download;

        if (versionEl && entry && entry.version) {
          versionEl.textContent = `Version ${entry.version}`;
          versionEl.hidden = false;
        }

        block.dataset.modlistState = 'success';
      })
      .catch(() => {
        setUnavailable(block);
      });
  });
})();
