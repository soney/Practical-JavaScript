const http = require('http');
const express = require('express');
const ws = require('ws');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const backend = new ShareDB();
const connection = backend.connect();
const doc = connection.get('examples', 'todo-list');
doc.fetch((err) => {
    if(err) {
        throw err;
    }

    if(doc.type === null) {
        //document is not created yet
        doc.create({
            todos: []
        }, "json0" , () => {
            console.log("Document created!");
            startServer();
        });
    } else {
        console.log("Document already exists");
        startServer();
    }
});


function startServer() {
    // Create an express app and http server
    const app = express();

    app.use(express.static("dist"));

    const server = http.createServer(app);

    const wss = new ws.WebSocketServer({ server });

    wss.on('connection', (ws) => {
        const stream = new WebSocketJSONStream(ws);
        backend.listen(stream);
    });

    server.listen(8000, () => {
        console.log("Listening on http://localhost:8000");
    })
}