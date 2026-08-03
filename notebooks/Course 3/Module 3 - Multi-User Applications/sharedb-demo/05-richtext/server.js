// ShareDB demo, stage 5: the server creates a shared rich-text document
// for a collaborative editor.
// Reading: "Synchronizing Text Editors"
//
// Build the page:  npx webpack     (run inside this folder; creates dist/)
// Run it:          node server.js
// Visit:           http://localhost:8000  in two browser windows at once
// (This page loads the Quill editor from a CDN, so it needs a network
// connection.)

// #region modules
const http = require('http');
const path = require('path');
const express = require('express');
const ws = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const richText = require('rich-text');
// #endregion

// #region register
// Register the "rich-text" OT type so documents can use it.
ShareDB.types.register(richText.type);
// #endregion

// #region doc
const backend = new ShareDB();
const connection = backend.connect();
const doc = connection.get('examples', 'richtext');

doc.fetch((error) => {
  if (error) {
    throw error;
  }

  if (doc.type === null) {
    // The document is not created yet. Its contents are an array of
    // Deltas, not a plain string, and its type is 'rich-text'.
    doc.create([{ insert: 'Type here...' }], 'rich-text', () => {
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
