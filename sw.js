// Optional SW (not required for local file usage)
const CACHE = 'ac-pay-v1-7b';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon-180.png'];
self.addEventListener('install', e=>{ self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
