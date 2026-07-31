const fs = require("fs");
const https = require("https");
const { WebSocketServer } = require("ws");

const HOST = process.env.WSS_HOST || "35.1.103.63";
const PORT = Number(process.env.WSS_PORT || 8080);
const KEY_PATH = process.env.WSS_KEY_PATH || "35.1.103.63+3-key.pem";
const CERT_PATH = process.env.WSS_CERT_PATH || "35.1.103.63+3.pem";

// Read SSL certificates
const serverConfig = {
  key: fs.readFileSync(KEY_PATH),
  cert: fs.readFileSync(CERT_PATH),
};

// Create an HTTPS server
const server = https.createServer(serverConfig);

// Attach WebSocketServer to the HTTPS server
const wss = new WebSocketServer({ server });

// Basic broadcast signaling server
wss.on("connection", function connection(ws) {
  console.log("A new client connected");

  ws.on("message", function message(data) {
    // Broadcast any received message to all OTHER connected clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === 1) {
        // 1 is WebSocket.OPEN
        client.send(data.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// The HTTPS server must listen, not just the WSS
server.listen(PORT, HOST, () => {
  console.log(`Signaling server running on wss://${HOST}:${PORT}/`);
});
