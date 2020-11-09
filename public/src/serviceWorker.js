const CACHE_NAME = 'mc-v1';

const cacheUrls = ['/'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(cacheUrls);
            })
            .catch(err => {
                console.error('smth went wrong with caches.open: ', err);
            }),
    );
});

self.addEventListener('fetch', event => {
    console.log('sw', event.request);

    if (navigator.onLine) {
        return fetch(event.request);
    }

    event.respondWith(
        caches
            .match(event.request)
            .then(cachedResponse => {
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch(err => {
                console.error('smth went wrong with caches.match: ', err);
            }),
    );
});
