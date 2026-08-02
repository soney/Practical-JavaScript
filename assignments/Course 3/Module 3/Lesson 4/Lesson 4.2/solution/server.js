// A ShareDB server for a shared click counter. The Express and WebSocket
// wiring at the bottom is already written for you. Your work is the
// document setup and the two routes, marked with TODO comments.

import express from 'express';
import { WebSocketServer } from 'ws';
import ShareDB from 'sharedb';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

const app = express();

// The ShareDB backend holds every shared document on this server.
const backend = new ShareDB();

// SOLUTION: connect to the backend and get the counter doc from the
// "examples" collection
const connection = backend.connect();
const doc = connection.get('examples', 'counter');

// initCounter makes sure the counter document exists before the server
// starts. It is called at the bottom of this file.
function initCounter(callback) {
  // SOLUTION: fetch the doc; if it does not exist yet (type is null),
  // create it with { numClicks: 0 }
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ numClicks: 0 }, callback);
      return;
    }
    callback();
  });
}

// Responds so you can tell the server is up. Leave this route as it is.
app.get('/', (req, res) => {
  res.send('ShareDB counter server is running');
});

app.get('/doc', (req, res) => {
  // SOLUTION: respond with the current document data
  res.json(doc.data);
});

app.post('/click', (req, res) => {
  // SOLUTION: submit a json0 op adding 1 to numClicks, then respond
  doc.submitOp([{ p: ['numClicks'], na: 1 }], (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.json(doc.data);
  });
});

// Everything below is provided. It starts the web server, then lets
// real-time clients connect over WebSockets: each connection becomes a
// JSON stream that the ShareDB backend listens to.
const PORT = process.env.PORT || 3000;
initCounter(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });
});
