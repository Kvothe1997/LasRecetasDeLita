const CACHE_NAME = "v1_cache_recetas_lita";

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  "/PWA-pure-JS-CSS-y-HTML/index.html",
  "/PWA-pure-JS-CSS-y-HTML/myscript.js",
  "/PWA-pure-JS-CSS-y-HTML/style.css",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/bake.svg",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/facebook.svg",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/github.svg",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/instagram.svg",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/linkedin.svg",
  "/PWA-pure-JS-CSS-y-HTML/Iconos/whatsapp.svg",
  "/PWA-pure-JS-CSS-y-HTML/Images/muffins.webp",
  "/PWA-pure-JS-CSS-y-HTML/Images/pan_molde.webp",
  "/PWA-pure-JS-CSS-y-HTML/Images/panqueques_avena.webp",
  "/PWA-pure-JS-CSS-y-HTML/Images/panqueques.webp",
  "/PWA-pure-JS-CSS-y-HTML/Images/pie_maracuya.webp",
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
