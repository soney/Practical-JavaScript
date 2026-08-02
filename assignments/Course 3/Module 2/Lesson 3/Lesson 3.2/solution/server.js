const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');

// The HTTP file server below is already set up for you: it serves the page and
// its client script over HTTP. You do not need to change it.
const server = http.createServer(async (req, res) => {
    const fileName = req.url === '/' ? 'index.html' : req.url.slice(1);
    const contentType = fileName.endsWith('.js') ? 'text/javascript' : 'text/html';
    try {
        const content = await fs.readFile(path.join(__dirname, fileName), 'utf8');
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        res.writeHead(404);
        res.end('Not found');
    }
});

// The WebSocket server shares the HTTP server above (already set up for you).
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
    console.log('A client has connected.');

    socket.on('message', (rawData) => {
        // STEP 1 (provided for you): convert the incoming data to a string and
        // cap it at 200 characters. 'rawData' may arrive as a Buffer, so call
        // .toString() on it first. The result is stored in 'message'.
        const message = rawData.toString().substring(0, 200);

        // SOLUTION: broadcast 'message' to every open client, including the
        // original 'socket', so the sender sees their own message too.
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Lab Server running on http://localhost:${PORT}`);
});
