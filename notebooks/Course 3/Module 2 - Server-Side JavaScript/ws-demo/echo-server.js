// The message round trip, from "Sending Data with WebSockets".
//
// Setup:    npm install   (once, in this folder)
// Run it:   node echo-server.js
// Visit:    http://localhost:3000  with the browser console open
//
// The client greets the server as soon as the connection opens, the
// server answers every message with "got message" plus what it heard,
// and the terminal notes when the tab closes. Stop the server with
// Ctrl+C.

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((request, response) => {
  const filePath = path.join(__dirname, 'echo-page', 'index.html');

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

const wss = new WebSocket.Server({ server });

// #region reply
wss.on('connection', (socket) => {
  socket.addEventListener('message', (messageEvent) => {
    const data = messageEvent.data;

    console.log('client said: ' + data);

    socket.send('got message ' + data);
  });
  // #endregion

  // #region goodbye
  socket.addEventListener('close', () => {
    console.log('websocket disconnected');
  });
  // #endregion
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
