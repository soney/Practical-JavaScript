// ShareDB demo, stage 4: the server creates a shared to-do list.
// Reading: "Synchronizing JSON Data"
//
// Build the page:  npx webpack     (run inside this folder; creates dist/)
// Run it:          node server.js
// Visit:           http://localhost:8000  in two browser windows at once

// #region modules
const http = require('http');
const path = require('path');
const express = require('express');
const ws = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
// #endregion

// #region doc
const backend = new ShareDB();
const connection = backend.connect();
const doc = connection.get('examples', 'todo-list');

doc.fetch((error) => {
  if (error) {
    throw error;
  }

  if (doc.type === null) {
    // The document is not created yet: an object holding an empty list.
    doc.create({ todos: [] }, 'json0', () => {
      console.log('Document created!');

      startServer();
    });
  } else {
    console.log('Document already exists');

    startServer();
  }
});
// #endregion

// #region start-server
function startServer() {
  // Create an express app and http server
  const app = express();

  app.use(express.static(path.join(__dirname, 'dist')));

  const server = http.createServer(app);

  const wss = new ws.WebSocketServer({ server: server });

  wss.on('connection', (webSocket) => {
    const stream = new WebSocketJSONStream(webSocket);

    backend.listen(stream);
  });

  server.listen(8000, () => {
    console.log('Listening on http://localhost:8000');
  });
}
// #endregion
