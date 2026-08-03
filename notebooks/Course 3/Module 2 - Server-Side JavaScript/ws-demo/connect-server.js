// The first WebSocket connection, from "Introduction to WebSockets".
//
// Setup:    npm install   (once, in this folder)
// Run it:   node connect-server.js
// Visit:    http://localhost:3000
//
// The page asks to upgrade its connection to a WebSocket, the server
// agrees, and each side sends the other one greeting. Watch the terminal
// here and the Network tab in the browser. Stop the server with Ctrl+C.

// #region setup
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// The HTTP half: the file server from Lesson 1, trimmed to one page.
const server = http.createServer((request, response) => {
  const filePath = path.join(__dirname, 'connect-page', 'index.html');

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
// #endregion

// #region attach
// The WebSocket server rides on the HTTP server: one port for both.
const wss = new WebSocket.Server({ server });
// #endregion

// #region connection
// Runs once for every client that connects.
wss.on('connection', (socket, request) => {
  console.log('a client connected');

  socket.send('hello from server');
});
// #endregion

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
