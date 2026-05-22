const CACHE_NAME = "jr-catalogo-v1";
const urlsToCache = [
  "/Imagenes_Catalogo/",
  "/Imagenes_Catalogo/index.html",
  "/Imagenes_Catalogo/manifest.json",
  "/Imagenes_Catalogo/icon-192.png",
  "/Imagenes_Catalogo/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
