// WebRTC demo, stage 2: the signaling server for the video chat.
// Reading: "Peer-to-Peer Video Chat with WebRTC"
//
// Run it:   node server.js
// Visit:    http://localhost:3000  in two browser windows at once
//
// This file is identical to stage 1's server. Adding video changed the
// page and the client code, and changed nothing here: the server forwards
// signaling messages without reading them, and the video itself never
// touches it.

// #region modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
// #endregion

// #region static-server
// The static file server from Module 2, Lesson 1: whatever file the URL
// names, read it out of static/ and send it back.
const server = http.createServer((request, response) => {
  let url = request.url;

  if (url === '/') {
    url = 'index.html';
  }

  const filePath = path.join(__dirname, 'static', url);

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

// #region relay
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  socket.addEventListener('message', (messageEvent) => {
    const data = messageEvent.data;

    for (const client of wss.clients) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
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
