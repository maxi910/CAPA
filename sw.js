// sw.js — “rompe caché” simple: siempre va a red y toma control de inmediato
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
// Forzar a traer desde red (sin cache store). Si falla, reintenta normal.
self.addEventListener('fetch', (event) => {
  try {
    const req = new Request(event.request, { cache: 'no-store' });
    event.respondWith(fetch(req));
  } catch (e) {
    event.respondWith(fetch(event.request));
  }
});
