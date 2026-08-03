// The form receiver from "GET vs POST Requests".
//
// Run it:   node form-server.js
// Visit:    http://localhost:3000
// Stop it:  Ctrl+C in the terminal
//
// Fill in the form and submit it with the Network tab open. The page
// arrives by GET; the submission arrives by POST, carrying its data in
// the request body.

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  console.log(request.method + ' ' + request.url);

  // The URL cleanup stays outside the method check: every branch needs it.
  // #region url
  let url = request.url;

  if (url === '/') {
    url = 'index.html';
  }
  // #endregion

  // A POST is answered here whatever its URL is.
  // #region post
  if (request.method === 'POST') {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Received POST request with body ' + body);
    });
  // #endregion
  // #region get
  } else if (request.method === 'GET') {
    const filePath = path.join(__dirname, 'form-page', url);

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
      } else {
        // form-page holds nothing but HTML, so the content type is fixed.
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content);
      }
    });
  // #endregion
  // #region method-not-allowed
  } else {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Method not allowed');
  }
  // #endregion
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
