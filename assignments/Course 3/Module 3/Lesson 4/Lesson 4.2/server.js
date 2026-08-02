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

// TODO: (1) Server code talks to the backend through a connection, just like
// a client would. Replace the line below with these two lines, which
// connect to the backend and get the counter document from the "examples"
// collection with the ID "counter":
//   const connection = backend.connect();
//   const doc = connection.get('examples', 'counter');
const doc = null;

// initCounter makes sure the counter document exists before the server
// starts. It is called at the bottom of this file.
function initCounter(callback) {
  // TODO: (2) Fetch the document. If doc.type is null, the document does not
  // exist yet, so create it with { numClicks: 0 }. Replace the callback()
  // line below with:
  //   doc.fetch((err) => {
  //     if (err) throw err;
  //     if (doc.type === null) {
  //       doc.create({ numClicks: 0 }, callback);
  //       return;
  //     }
  //     callback();
  //   });
  callback();
}

// Responds so you can tell the server is up. Leave this route as it is.
app.get('/', (req, res) => {
  res.send('ShareDB counter server is running');
});

app.get('/doc', (req, res) => {
  // TODO: (3) Respond with the current document data. Replace the two lines
  // below with:
  //   res.json(doc.data);
  res.status(501).json({ message: 'GET /doc not implemented yet' });
});

app.post('/click', (req, res) => {
  // TODO: (4) Record one click by submitting a json0 operation that adds 1
  // to numClicks, then respond with the updated data. Replace the two
  // lines below with:
  //   doc.submitOp([{ p: ['numClicks'], na: 1 }], (err) => {
  //     if (err) {
  //       res.status(500).json({ message: err.message });
  //       return;
  //     }
  //     res.json(doc.data);
  //   });
  res.status(501).json({ message: 'POST /click not implemented yet' });
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
