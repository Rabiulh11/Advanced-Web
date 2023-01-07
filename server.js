// Server-side proxy
// Use the http module to create an HTTP server that listens for requests from the client and proxies them to the target API
const http = require('http');
http.createServer((req, res) => {
    const xhr = new XMLHttpRequest();
    xhr.open(req.method, req.url);
    xhr.onload = () => {
      res.writeHead(xhr.status, xhr.getAllResponseHeaders());
      res.end(xhr.response);
    };
    xhr.onerror = () => {
      res.writeHead(500);
      res.end();
    };
    xhr.send(req.body);
  }).listen(8080);