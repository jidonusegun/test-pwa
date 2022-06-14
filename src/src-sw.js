import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({url}) => url.origin === "https://fonts.googleapis.com",
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets'
    })
);

registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }), 
            new ExpirationPlugin({
                maxEntries: 30
            })
        ]
    })
);

registerRoute(
    ({url}) => url.origin === 'https://api.themoviedb.org' || url.pathname === "/3/discover/tv",
    new StaleWhileRevalidate({
        cacheName: 'movie-api-response',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 1
            })
        ]
    })
)

registerRoute(
    ({request}) => request.destination === "image",
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 50
            })
        ]
    })
);

registerRoute(
    ({request}) => request.destination === "script" || request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-resources'
    })
)