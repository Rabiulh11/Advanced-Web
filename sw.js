// install necessary apps and resources
const ASSETS = [
    "https://api.chucknorris.io/jokes/random",
    "https://api.chucknorris.io/jokes/search?query=animal", 
    "https://api.chucknorris.io/jokes/categories", 
    "https://api.chucknorris.io/jokes/random?category=animal",
    "/"
];

let cache_name = "chuck_norris"
// add event listener for the service worker

// install necessary resources
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_name).then(cache => {
            caches.open(cache_name);
            return cache.addAll(ASSETS);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
      if (await caches.match(event.request)) { return await caches.match(event.request); }
      const response = await fetch(event.request);
      const cache = await caches.open(cache_name);
      cache.put(event.request, response.clone());
      return response;
    })());
  });