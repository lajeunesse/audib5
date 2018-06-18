/* globals console self */
/*
  Vue Examples Service Worker
*/

let dataCacheName = 'vue-examples-app-v1-data-v1';
let appCacheName = 'vue-examples-app-v1-app-v1';
let appFilesToCache = [
    '/',
    'http://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons',
    'http://fonts.gstatic.com/s/materialicons/v38/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(appCacheName).then(cache => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(appFilesToCache);
        })
    );
});

self.addEventListener('activate', e => {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== appCacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
    * Fixes a corner case in which the app wasn't returning the latest data.
    * You can reproduce the corner case by commenting out the line below and
    * then doing the following steps: 1) load app for first time so that the
    * initial New York City data is shown 2) press the refresh button on the
    * app 3) go offline 4) reload the app. You expect to see the newer NYC
    * data, but you actually see the initial data. This happens because the
    * service worker is not yet activated. The code below essentially lets
    * you activate the service worker faster.
    */
    return self.clients.claim();
});

self.addEventListener('fetch', e => {
    // console.log('[Service Worker] Fetch', e.request.url);
    // var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    // if (e.request.url.indexOf(dataUrl) > -1) {
        /*
        * When the request URL contains dataUrl, the app is asking for fresh
        * weather data. In this case, the service worker always goes to the
        * network and then caches the response. This is called the "Cache then
        * network" strategy:
        * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
        */
        // e.respondWith(caches.open(dataCacheName)
        //     .then(cache => fetch(e.request)
        //             .then(response => {
        //                 cache.put(e.request.url, response.clone());
        //                 return response;
        //             })
        //     )
        // );
    // }
    // else {
        
    //     * The app is asking for app shell files. In this scenario the app uses the
    //     * "Cache, falling back to the network" offline strategy:
    //     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
        
    //     e.respondWith(caches.match(e.request)
    //         .then(response => response || fetch(e.request))
    //     );
    // }
});

