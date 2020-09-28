const CACHE_NAME = "v1_cache_recetas_lita";

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  "./index.html",
  "./myscript.js",
  "./style.css",
  "./Icon/bake.svg",
  "./Icon/bake_128.png",
  "./Icon/bake_256.png",
  "./Icon/bake_512.png",
  "./Iconos/facebook.svg",
  "./Iconos/github.svg",
  "./Iconos/instagram.svg",
  "./Iconos/linkedin.svg",
  "./Iconos/whatsapp.svg",
  "./Images/muffins.webp",
  "./Images/pan_molde.webp",
  "./Images/panqueques_avena.webp",
  "./Images/panqueques.webp",
  "./Images/pie_maracuya.webp",
];

self.addEventListener("install", (evt) => {
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      if (response) {
        //recuperar del cache
        return response;
      }
      //recuperar de internet
      return fetch(evt.request);
    })
  );
});
