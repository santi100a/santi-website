importScripts('./lib/workbox-sw.js');

workbox.routing.registerRoute(
    () => true,
    new workbox.strategies.CacheFirst()
);