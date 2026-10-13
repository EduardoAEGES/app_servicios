/* =========================================================
   SERVICE WORKER — permite instalar la app y usarla sin conexión.
   Si cambias archivos y no ves los cambios en el teléfono,
   sube el número de versión de CACHE.
   ========================================================= */

const CACHE = "hogarix-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/data.js",
  "./js/state.js",
  "./js/components.js",
  "./js/screens/portada.js",
  "./js/screens/inicio.js",
  "./js/screens/busqueda.js",
  "./js/screens/chat.js",
  "./js/screens/perfil.js",
  "./js/screens/especialista.js",
  "./js/app.js",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

/* Archivos propios: primero red (para ver cambios), si falla usa caché.
   Imágenes y fuentes externas: primero caché. */
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const sameOrigin = new URL(e.request.url).origin === location.origin;

  if (sameOrigin) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
            return res;
          })
      )
    );
  }
});
