const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');

// Serve the page (and its client script) over HTTP so the browser can load it.
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

// Share the same HTTP server for WebSocket connections.
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
    console.log('A new student joined the chat!');

    // When the server receives a message from ANY client
    socket.on('message', (data) => {
        const message = data.toString();
        console.log('Received:', message);

        // BROADCAST LOOP: Send to every connected client
        for (const client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    socket.on('close', () => console.log('A student left the chat.'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
