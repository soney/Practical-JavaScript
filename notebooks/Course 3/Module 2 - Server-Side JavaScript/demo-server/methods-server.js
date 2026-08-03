// The method logger from "Understanding HTTP Methods".
//
// Run it:   node methods-server.js
// Visit:    http://localhost:3000
// Stop it:  Ctrl+C in the terminal
//
// Keep the terminal visible while you use the page: every request is
// logged as its method and its URL. The page's buttons request the same
// URLs with different methods.

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  // #region log
  console.log(request.method + ' ' + request.url);
  // #endregion

  // #region users
  if (request.method === 'GET' && request.url === '/users') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Here is the list of users');
    return;
  }

  if (request.method === 'POST' && request.url === '/users') {
    // 201, not 200: it worked, and something new now exists.
    response.writeHead(201, { 'Content-Type': 'text/plain' });
    response.end('User created');
    return;
  }
  // #endregion

  // #region files
  let url = request.url;

  if (url === '/') {
    url = 'index.html';
  }

  const filePath = path.join(__dirname, 'methods-page', url);

  // Everything below ignores request.method: a PUT or a DELETE for a
  // file is answered exactly like a GET.
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(content);
    }
  });
  // #endregion
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

function getContentType(filePath) {
  const extension = path.extname(filePath);

  if (extension === '.css') {
    return 'text/css';
  } else if (extension === '.js') {
    return 'text/javascript';
  } else if (extension === '.txt') {
    return 'text/plain';
  }

  return 'text/html';
}
