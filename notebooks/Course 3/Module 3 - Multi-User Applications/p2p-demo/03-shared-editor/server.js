// Yjs demo: the only server left, and all it does is hand out files.
// Reading: "Conflict-Free Replicated Data Types (CRDTs) and Yjs"
//
// Build the page:  npx webpack     (run inside this folder; creates dist/)
// Run it:          node server.js
// Visit:           http://localhost:3000  in two browser windows at once
//
// Nothing about the shared document lives here. There is no WebSocket
// server in this file: the browsers find each other through the Yjs
// project's public signaling servers, connect over WebRTC, and hold the
// document themselves. Once both pages have loaded, you can stop this
// server and the editors keep syncing.

// #region modules
const http = require('http');
const fs = require('fs');
const path = require('path');
// #endregion

// #region static-server
// The same static file server as the WebRTC stages, serving dist/, the
// folder webpack builds.
const server = http.createServer((request, response) => {
  let url = request.url;

  if (url === '/') {
    url = 'index.html';
  }

  const filePath = path.join(__dirname, 'dist', url);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(content);
    }
  });
});
// #endregion

// #region listen
server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
// #endregion

// #region content-type
function getContentType(filePath) {
  const ext = path.extname(filePath);

  let contentType = 'text/html';

  if (ext === '.css') {
    contentType = 'text/css';
  } else if (ext === '.js') {
    contentType = 'text/javascript';
  }

  return contentType;
}
// #endregion
