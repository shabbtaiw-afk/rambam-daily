const CACHE_NAME = 'rambam-tracker-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// התקנת ה-Service Worker ושמירת הקבצים במטמון (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// הפעלת ה-Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// אסטרטגיית Cache First: קודם בודקים בזיכרון, אם אין - הולכים לרשת
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
