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

  if (navigator.onLine) {
    return fetch(request);
  }

  event.respondWith(
        caches
            .match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                  return cachedResponse;
                }

                const url = new URL(request.url);

                if (url.href.includes('api')) {
                    const init = {
                        status: 418,
                        statusText: 'Offline Mode',
                    };

                    const data = { message: 'Контент недоступен в оффлайн режиме' };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    return new Response(blob, init);
                }
            })
            .catch(err => {
                console.log(err.stack || err);
            }),
    );
});
