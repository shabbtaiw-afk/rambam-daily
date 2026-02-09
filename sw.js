const CACHE_NAME = 'rambam-tracker-v2'; // שינוי ל-v2 כדי להכריח עדכון
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// התקנה ושמירת הקבצים במטמון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // מכריח את ה-SW החדש להיכנס לתוקף מיד
  );
});

// ניקוי מטמון ישן
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// שליפת קבצים מהמטמון כשאין אינטרנט
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
