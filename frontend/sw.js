// Minimal service worker - only handles install and activate
// No fetch handler to avoid overhead during navigation
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());
