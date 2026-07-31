const http = require('http');
const express = require('express');
const ws = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

// Create an express app and http server
const app = express();

app.use(express.static("dist"));

const server = http.createServer(app);

const wss = new ws.WebSocketServer( { server: server });

const backend = new ShareDB();

wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
});

server.listen(8000, () => {
    console.log("Listening on http://localhost:8000");
})