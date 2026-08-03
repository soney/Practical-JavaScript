// WebRTC demo, stage 1: the signaling server two browsers use to arrange
// a direct connection.
// Reading: "Peer-to-peer Connections with WebRTC"
//
// Run it:   node server.js
// Visit:    http://localhost:3000  in two browser windows at once
//
// The server has two jobs: hand out the files in static/, and forward
// every signaling message to every OTHER connected client. It never looks
// inside the messages. Once the browsers connect to each other directly,
// nothing travels through here at all.

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
