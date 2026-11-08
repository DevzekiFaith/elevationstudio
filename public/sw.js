// Elevation Studio Service Worker Handler
// Prevents 404 errors when browser or localhost PWA cache probes for sw.js
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration
      ? self.registration.unregister().then(() => self.clients.claim())
      : self.clients.claim()
  );
});
