/* Zozo service worker.
   - Site files (HTML, CSS, JS, data, icons): cached on install; served network-first so updates and the daily refresh show up right away, with the cached copy used offline.
   - Fonts and the charts library from their CDNs: cached at runtime after first use.
   Bump VERSION whenever the shell files change. */
const VERSION = 'zozo-v6';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/zozo.css',
  './assets/app.js',
  './assets/charts.js',
  './assets/logo.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/apple-touch-icon.png',
  './data/brief.js',
  './data/weekly.js',
  './data/live.js',
  './data/signals.js',
  './data/extreme.js',
  './data/history.js',
  './data/calendar.js',
  './data/movers.js',
  './data/universe.js',
  './data/sectors.js',
  './data/glossary.js',
  './data/daus.js',
];
const RUNTIME_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const networkFirst = async (req) => {
  const cache = await caches.open(VERSION);
  try {
    const res = await fetch(req, { cache: 'no-store' });
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
};

const staleWhileRevalidate = async (req, event) => {
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req, { ignoreSearch: true });
  const fresh = fetch(req).then((res) => {
    if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  if (hit) { event.waitUntil(fresh); return hit; }
  const res = await fresh;
  if (res) return res;
  // offline navigation with nothing cached for this URL: fall back to the app shell
  if (req.mode === 'navigate') return cache.match('./index.html');
  return Response.error();
};

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    // network-first for everything of our own: updates show up on the next load; the cache covers offline use
    if (req.mode === 'navigate') { e.respondWith(networkFirst(req).catch(() => caches.match('./index.html'))); return; }
    e.respondWith(networkFirst(req));
    return;
  }
  if (RUNTIME_HOSTS.includes(url.hostname)) e.respondWith(staleWhileRevalidate(req, e));
  // everything else (TradingView, Yahoo, news links) goes straight to the network
});
