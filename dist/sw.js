var CACHE_NAME = 'name-cache-v1';
var urlsToCache = [
    // '/',
    './index.html',
    './videos/metrodublin3.mp4',
    './videos/metrodublin3.webm',
    './pages/privacy-policy.html',
    './pages/subscription-confirmation.html',
    './app.bundle.js',
    'https://fonts.googleapis.com/css?family=Raleway',
    './styles/hamburger.css',
    './images/metro-1.jpg',
    './images/metro-2.JPG',
    './images/model-metro.png',
    './images/maps/dev-map.png',
    './images/maps/map-network.png',
    './images/maps/metro-network.png',
    './images/icons/design.png',
    './images/icons/emailsent.png',
    './images/icons/geo-icon.png',
    './images/icons/faq-icon.png',
    './images/icons/GT.png',
    './images/icons/logo-3.png',
    './images/icons/MDlog.png',
    './images/icons/MDlogFavIco.png',
    './images/icons/newstalk.png'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and
                // can only be consumed once. Since we are consuming this
                // once by cache and once by the browser for fetch, we need
                // to clone the response.
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
