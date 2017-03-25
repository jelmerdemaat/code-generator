const CACHE_VERSION = 5,
      CACHE_NAME = `sw-v${CACHE_VERSION}`,
      CACHE_FILES = [
        'html',
        'js',
        'css',
        'woff',
        'woff2',
        'svg',
        'ico',
        'json'
      ].join('|'),
      CACHE_REGEX = new RegExp(`\.(${CACHE_FILES})$|^data:image\/`);

self.addEventListener('install', (event) => {
    // We pass a promise to event.waitUntil to signal how
    // long install takes, and if it failed
    if (self.skipWaiting) {
        self.skipWaiting();
    }

    event.waitUntil(
        // We open a cache…
        caches.open(CACHE_NAME).then((cache) => {
            // And add resources to it
            return cache.addAll([
                '.'
            ]);
        })
    );
});

// Deleting old caches
// The 'activate' event is generally used to do stuff that would have broken
// the previous version while it was still running, for example
// getting rid of old caches.
this.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            // For all cache names, run this promise
            return Promise.all(keyList.map(function(key) {
                // If the key (name) doesn't match our current version,
                // throw it away
                console.log('Checking', key);
                if (key !== CACHE_NAME) {
                    console.log('Deleting', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request).then(function(response) {
            if (CACHE_REGEX.test(event.request.url) || event.request.mode === 'navigate') {
                return caches.open(CACHE_NAME).then(function(cache) {
                    console.log(`Putting ${event.request.url} in cache`);
                    cache.put(event.request, response.clone());
                    return response;
                });
            } else {
                return response;
            }
        });
    })
  );
});
