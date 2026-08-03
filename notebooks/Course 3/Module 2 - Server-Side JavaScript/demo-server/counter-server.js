// The hit counter from "Handling Server-Side Data".
//
// Run it:   node counter-server.js
// Visit:    http://localhost:3000
//
// Reload a few times, then stop the server with Ctrl+C and start it again.
// The count survives, because it lives in hit-count.txt rather than in a
// variable. Delete that file to start over.

const http = require('http');
const fs = require('fs');
const path = require('path');

const countFile = path.join(__dirname, 'hit-count.txt');

// #region storage
function setHitCount(count) {
  fs.writeFile(countFile, String(count), () => {});
}

function getHitCount() {
  return new Promise((resolve) => {
    fs.readFile(countFile, 'utf8', (error, content) => {
      if (error) {
        resolve(0);
      } else {
        resolve(parseInt(content));
      }
    });
  });
}
// #endregion

// #region handler
const server = http.createServer(async (request, response) => {
  let url = request.url;

  if (url === '/') {
    url = 'index.html';

    setHitCount(await getHitCount() + 1);
  }

  if (url === '/getHitCount') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(String(await getHitCount()));
    return;
  }
  // #endregion

  const filePath = path.join(__dirname, 'counter-page', url);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
