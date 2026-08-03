// ShareDB demo, stage 3: the counter server again, now registering a
// second OT type and naming the document's type explicitly.
// Reading: "ShareDB OT Types"
//
// Build the page:  npx webpack     (run inside this folder; creates dist/)
// Run it:          node server.js
// Visit:           http://localhost:8000  (open the browser console too)

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
// Register the "rich-text" OT type. Only json0 is built in; any other
// type has to be installed and registered before a document can use it.
ShareDB.types.register(richText.type);
// #endregion

// #region doc
const backend = new ShareDB();
const connection = backend.connect();
const doc = connection.get('examples', 'counter');

doc.fetch((error) => {
  if (error) {
    throw error;
  }

  if (doc.type === null) {
    // The document is not created yet. The second argument names its
    // OT type; leaving it out means 'json0' anyway.
    doc.create({ numClicks: 0 }, 'json0', () => {
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
