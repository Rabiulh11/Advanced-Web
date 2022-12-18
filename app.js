// check if browser supports service worker and register it
const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("sw.js");
      
    }
  };
  
  
  registerServiceWorker();
  