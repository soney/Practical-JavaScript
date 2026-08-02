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

/**
 * TODO: Broadcast the current user count to every open client.
 * 1. Count the clients: loop over wss.clients with for...of and count the
 *    ones whose readyState is WebSocket.OPEN.
 * 2. Loop over the open clients again and send each one the JSON string:
 *    JSON.stringify({ type: 'count', count: <the number you counted> })
 */
function broadcastCount() {
    // WRITE YOUR CODE HERE
}

wss.on('connection', (socket) => {
    console.log('A new student has joined the chat.');

    // TODO: A client just connected, so broadcast the updated user count.

    // The chat-message handler below is already written for you: it sanitizes
    // the incoming text and broadcasts it as a JSON chat message.
    socket.on('message', (rawData) => {
        const message = rawData.toString().trim();
        if (message.length === 0) {
            return;
        }
        const sanitizedMessage = message.substring(0, 200);
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'chat', text: sanitizedMessage }));
            }
        }
    });

    socket.on('close', () => {
        console.log('A student left the chat.');
        // TODO: A client just disconnected, so broadcast the updated user count.
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is active on http://localhost:${PORT}`);
});
