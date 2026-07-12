// Social Share System
class SocialShare {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('.share-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.dataset.platform;
        const url = btn.dataset.url || window.location.href;
        const title = btn.dataset.title || document.title;
        const text = btn.dataset.text || '';
        
        this.share(platform, url, title, text);
      });
    });

    // Native share if available
    const nativeShareBtn = document.getElementById('native-share');
    if (nativeShareBtn && navigator.share) {
      nativeShareBtn.style.display = 'block';
      nativeShareBtn.addEventListener('click', () => {
        this.nativeShare();
      });
    }
  }

  share(platform, url, title, text) {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      discord: `https://discord.com/channels/@me`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      if (platform === 'email') {
        window.location.href = shareUrl;
      } else {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    }
  }

  async nativeShare() {
    try {
      await navigator.share({
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
      });
    } catch (err) {
      // Share cancelled or failed silently
    }
  }

  copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      this.showToast('Link copied to clipboard!');
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.SocialShare = new SocialShare();
  });
}
