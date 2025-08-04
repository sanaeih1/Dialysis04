const CACHE_NAME = 'dialysis-app-v3';
const urlsToCache = [
  'https://sanaeih1.github.io/Dialysis04/',
  'https://sanaeih1.github.io/Dialysis04/index.html',
  'https://sanaeih1.github.io/Dialysis04/manifest.json',
  'https://sanaeih1.github.io/Dialysis04/foods.json',
  'https://sanaeih1.github.io/Dialysis04/contact.html',
  'https://sanaeih1.github.io/Dialysis04/mums_logo.png',
  'https://sanaeih1.github.io/Dialysis04/assets/icon-512x512.png',
  'https://sanaeih1.github.io/Dialysis04/assets/icon-192x192.png',
  'https://sanaeih1.github.io/Dialysis04/assets/home.png',
  'https://sanaeih1.github.io/Dialysis04/assets/history.png',
  'https://sanaeih1.github.io/Dialysis04/assets/video.png',
  'https://sanaeih1.github.io/Dialysis04/assets/book.png',
  'https://sanaeih1.github.io/Dialysis04/assets/settings.png',
  'https://sanaeih1.github.io/Dialysis04/assets/info.png',
  'https://sanaeih1.github.io/Dialysis04/assets/back.png',
  'https://sanaeih1.github.io/Dialysis04/assets/trash-alt.png',
  'https://sanaeih1.github.io/Dialysis04/assets/food.png',
  'https://sanaeih1.github.io/Dialysis04/assets/search.png',
  'https://sanaeih1.github.io/Dialysis04/assets/list.png',
  'https://sanaeih1.github.io/Dialysis04/assets/weight.png',
  'https://sanaeih1.github.io/Dialysis04/assets/clock.png',
  'https://sanaeih1.github.io/Dialysis04/assets/plus.png',
  'https://sanaeih1.github.io/Dialysis04/assets/water-glass.png',
  'https://sanaeih1.github.io/Dialysis04/assets/water-drop.png',
  'https://sanaeih1.github.io/Dialysis04/assets/urine.png',
  'https://sanaeih1.github.io/Dialysis04/assets/trash.png',
  'https://sanaeih1.github.io/Dialysis04/assets/font-size.png',
  'https://sanaeih1.github.io/Dialysis04/assets/sodium.png',
  'https://sanaeih1.github.io/Dialysis04/assets/potassium.png',
  'https://sanaeih1.github.io/Dialysis04/assets/phosphorus.png',
  'https://sanaeih1.github.io/Dialysis04/assets/protein.png',
  'https://sanaeih1.github.io/Dialysis04/assets/water.png',
  'https://sanaeih1.github.io/Dialysis04/assets/energy.png',
  'https://sanaeih1.github.io/Dialysis04/assets/save.png',
  'https://cdn.jsdelivr.net/npm/vazir-font@28.0.0/dist/font-face.css',
  'https://cdn.jsdelivr.net/npm/shabnam-font@5.0.0/dist/font-face.css',
  'https://cdn.jsdelivr.net/npm/persian-date@1.1.0/dist/persian-date.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          })
          .catch(() => {
            return caches.match('https://sanaeih1.github.io/Dialysis04/index.html');
          });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      return self.clients.claim();
    })
  );
});