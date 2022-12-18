// install necessary apps and resources
const ASSETS = [
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    "/"
];

let cache_name = "chuck_norris"

// install necessary resources
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_name).then(cache => {
            caches.open(cache_name);
            return cache.addAll(ASSETS);
            })
    );
});

// add event listener for the service worker
self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        //If cache are available, load and open files
        if (await caches.match(event.request)) { return await caches.match(event.request); }
        const response = await fetch(event.request);
        const cache = await caches.open(cache_name);
        
        //create an online clone of the site
        cache.put(event.request, response.clone());
        return response;
    })());
  });