// Offline support: keep the app's own files and its libraries on the device.
// Bump VERSION whenever you publish a change so phones pick up the new files.
const VERSION = 'v17';
const SHELL = ['./', 'index.html', 'firebase-config.js', 'manifest.webmanifest', 'icons/icon.svg', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache (GitHub Pages lets it keep files for 10 minutes).
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Firebase data and sign-in traffic always go to the network; Firestore keeps its own offline copy.
  if (/googleapis\.com$|firebaseapp\.com$/.test(url.hostname) && !url.pathname.startsWith('/css')) return;
  const isLib = /gstatic\.com$|cdnjs\.cloudflare\.com$|fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !isLib) return;
  // App files: network first so updates show up, falling back to the saved copy offline.
  // Libraries and fonts: saved copy first, since their URLs never change.
  e.respondWith(isLib
    ? caches.match(e.request).then(hit => hit || fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; }))
    : fetch(e.request.url, { cache: 'no-cache' }).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('index.html'))));
});
