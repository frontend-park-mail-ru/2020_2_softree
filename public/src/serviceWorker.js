const KEY = 'mc-v1';

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', event => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches
                .open(KEY)
                .then(cache => {
                    return cache.addAll(event.data.payload);
                })
                .catch(err => console.dir(err)),
        );
    }
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    event.respondWith(
        caches
            .match(request)
            .then(async cachedResponse => {
                if (navigator.onLine) {
                    if (!url.href.includes('/api/')) {
                        const response = await fetch(request);
                        const respClone = response.clone();
                        caches.open(KEY).then(cache => cache.put(request, respClone));
                        return response;
                    }
                    return fetch(request);
                }

                if (cachedResponse) {
                    return cachedResponse;
                }

                if (url.href.includes('/api/')) {
                    const init = {
                        status: 418,
                        statusText: 'Offline Mode',
                    };

                    const data = { message: 'Контент недоступен в оффлайн режиме' };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    return new Response(blob, init);
                } else {
                    const baseUrl = url.toString().replace(url.pathname, '/');
                    try {
                        const cache = await caches.open(KEY);
                        const keys = await cache.keys();
                        const request = keys.find(key => key.url.toString() === baseUrl);
                        return await caches.match(request);
                    } catch (e) {
                        console.dir(e);
                    }
                }
            })
            .catch(err => {
                console.log(err.stack || err);
            }),
    );
});
