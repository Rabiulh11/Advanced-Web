
let cache_name = "chuck_norris"
// add event listener for the service worker

// install necessary resources
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_name).then(cache => {
                return cache.addAll(assets);
            }).catch(err => console.log(err))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.url === "https://api.chucknorris.io/jokes/") {
        // or whatever your app's URL is
        event.respondWith(
            fetch(event.request).catch(err =>
                self.cache.open(cache_name).then(cache => cache.match("/index.html"))
            )
        );
    } else {
        event.respondWith(fetch(event.request).catch(err => caches.match(event.request).then(response => response)));
        }
    }
);