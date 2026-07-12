// The Astral Forge service worker.
// Strategy: stale-while-revalidate for same-origin static assets only.
// HTML navigations, cross-origin requests (ads, fonts CDN, APIs) always go to
// the network so content stays fresh. Bump CACHE_VERSION to invalidate.
const CACHE_VERSION = 'taf-static-v2';
const ASSET_PATTERN = /\.(?:css|js|woff2?|ttf|otf|png|jpe?g|webp|gif|svg|ico)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Drop caches from previous versions.
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin static assets; everything else uses the network.
  if (url.origin !== self.location.origin || !ASSET_PATTERN.test(url.pathname)) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(request);
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      // Serve from cache immediately if present, refresh in the background.
      return cached || network;
    })()
  );
});
