// 'CACHE' - The 'Storage' of the 'Browser'
const CACHE_NAME = 'vesrion-1';
const urlsToCache = ['index.html', 'offline.html'];

// Install the 'Service Worker'
// Here 'this' means the 'service worker' itself
this.addEventListener('install', (event) => {   /* 1st parameter - Type of the Event, 2nd parameter - A Callback function which executes 
                                                after the event is called */
    // Open the cache and add files to it
    event.waitUntil(    // Wait until the cache is opened
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');    // This message will be displayed every time you 'Clear the Cache' and Reload the page

                return cache.addAll(urlsToCache);
            })
    );
});    

// Listen for Requests
this.addEventListener('fetch', (event) => {   
    /* When we notice a 'fetch request', we respond with the following.
        We match all the requests that our page is receiving and then we'll fetch again all those requests */
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                // return a fetch of that specific request. So whenever there is something to fetch, we simply fetch it
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))  // If it cannot fetch data (i.e:- No internet), simply display 'offline.html'
            })
    );
});

// Activate the 'Service Worker'
this.addEventListener('activate', (event) => {   
    // In the 'activation', we are going to remove all the previous caches and just keep the new one
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    // Only keep the Caches in the cacheWhiteList (in this case - 'vesrion-1')
                    if(!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            ))
    );
});
