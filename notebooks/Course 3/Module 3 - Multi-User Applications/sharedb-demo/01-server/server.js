// ShareDB demo, stage 1: the server, with nothing shared yet.
// Reading: "Setting Up an OT Server with ShareDB"
//
// Build the page:  npx webpack     (run inside this folder; creates dist/)
// Run it:          node server.js
// Visit:           http://localhost:8000

// #region modules
const http = require('http');
const path = require('path');
const express = require('express');
const ws = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
// #endregion

// #region app
// Create an express app and http server
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

const server = http.createServer(app);

const wss = new ws.WebSocketServer({ server: server });
// #endregion

// #region backend
const backend = new ShareDB();

wss.on('connection', (webSocket) => {
  const stream = new WebSocketJSONStream(webSocket);

  backend.listen(stream);
});
// #endregion

// #region listen
server.listen(8000, () => {
  console.log('Listening on http://localhost:8000');
});
// #endregion
