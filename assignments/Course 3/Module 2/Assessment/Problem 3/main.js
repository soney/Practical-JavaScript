const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const WebSocket = require('ws');

// The HTTP server is already written for you. It serves index.html (the notepad
// page) when the browser asks for "/" or "/index.html", and returns 404 for
// anything else.
const server = http.createServer(async (req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        const html = await fs.readFile(path.join(__dirname, 'index.html'), 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

// The WebSocket server is already created and attached to the HTTP server.
// Every connected browser tab becomes one of its clients (wss.clients).
const wss = new WebSocket.Server({ server });

// TODO: Make the server listen for messages and broadcast them to other clients.
//
// 1. Listen for the 'connection' event on `wss`. It fires once for each client
//    that connects, and gives you that client's `socket`.
// 2. Inside that handler, listen for the 'message' event on `socket`. The data
//    arrives as a Buffer, so convert it to text with rawData.toString().
// 3. Send that text to every OTHER connected client: loop over `wss.clients`
//    with a for...of loop, and call client.send(text) only when the client is
//    not the sender (client !== socket) and its connection is open
//    (client.readyState === WebSocket.OPEN).
//
// Write your code below:


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
