// The chat room, from "Handling Multiple WebSockets".
//
// Setup:    npm install   (once, in this folder)
// Run it:   node chat-server.js
// Visit:    http://localhost:3000  in two or more browser windows
//
// Type a message in any window and every window shows it at the same
// moment. The server forwards whatever it hears to every open
// connection, the sender included. Stop the server with Ctrl+C.

const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((request, response) => {
  const filePath = path.join(__dirname, 'chat-page', 'index.html');

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

// #region broadcast
wss.on('connection', (socket) => {
  socket.addEventListener('message', (messageEvent) => {
    const data = messageEvent.data;

    // Forward to every open connection, not only the sender.
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    }
  });
});
// #endregion

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
