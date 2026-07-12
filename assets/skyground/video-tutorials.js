// Video Tutorial System
class VideoTutorials {
  constructor() {
    this.videos = [
      { id: 1, title: 'Getting Started with Wunduniik', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '10:24', modlist: 'wunduniik' },
      { id: 2, title: 'Ghost of the Grid Installation Guide', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15:30', modlist: 'ghost-of-the-grid' },
      { id: 3, title: 'Troubleshooting Common Issues', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '8:45', modlist: 'all' },
      { id: 4, title: 'Customizing Your Modlist', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '12:15', modlist: 'all' }
    ];
    this.currentVideo = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const container = document.getElementById('video-tutorials-container');
    if (!container) return;

    container.innerHTML = `
      <div class="video-player-wrapper">
        <div id="video-player" class="video-player">
          <div class="video-placeholder">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
            </svg>
            <p>Select a video to start watching</p>
          </div>
        </div>
      </div>
      <div class="video-list">
        ${this.videos.map((video, index) => `
          <div class="video-item" data-id="${video.id}">
            <div class="video-thumbnail">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
              </svg>
            </div>
            <div class="video-info">
              <span class="video-number">${index + 1}</span>
              <div class="video-details">
                <h4 class="video-title">${video.title}</h4>
                <span class="video-duration">${video.duration}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  attachEventListeners() {
    document.querySelectorAll('.video-item').forEach(item => {
      item.addEventListener('click', () => {
        const videoId = parseInt(item.dataset.id);
        this.playVideo(videoId);
        
        // Update active state
        document.querySelectorAll('.video-item').forEach(v => v.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  playVideo(videoId) {
    const video = this.videos.find(v => v.id === videoId);
    if (!video) return;

    this.currentVideo = video;
    const player = document.getElementById('video-player');
    
    player.innerHTML = `
      <iframe 
        src="${video.url}?autoplay=1" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="video-iframe">
      </iframe>
    `;
  }

  filterByModlist(modlist) {
    const filtered = modlist === 'all' 
      ? this.videos 
      : this.videos.filter(v => v.modlist === modlist || v.modlist === 'all');
    
    // Re-render with filtered videos
    this.videos = filtered;
    this.render();
    this.attachEventListeners();
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    window.VideoTutorials = new VideoTutorials();
  });
}
