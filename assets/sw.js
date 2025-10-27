// Service Worker for Performance Optimization
const CACHE_NAME = "buddybites-v1";
const urlsToCache = [
  "/",
  "/assets/tailwind.css",
  "/assets/hey_charlie-webfont.woff2",
  "/assets/museosans_700-webfont.woff2",
  "/assets/icon-dog_150x.png",
  "/assets/icon-cart.svg",
  "/assets/icon-profile.svg",
];

// Install event
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Fetch event
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

// Activate event
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
