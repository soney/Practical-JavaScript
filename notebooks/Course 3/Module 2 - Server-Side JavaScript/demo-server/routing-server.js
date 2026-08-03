// The routed server from "Handling Requests and Responses".
//
// Run it:   node routing-server.js
// Visit:    http://localhost:3000        (the home page)
//           http://localhost:3000/about  (a second page)
//           http://localhost:3000/xyz    (a 404)

const http = require('http');

// #region handler
const server = http.createServer((request, response) => {
  console.log(request.method + ' ' + request.url);

  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Welcome home');
  } else if (request.url === '/about') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('About us');
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
});
// #endregion

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
