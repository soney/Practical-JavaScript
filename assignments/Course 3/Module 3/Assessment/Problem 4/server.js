const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const WebSocket = require('ws');

const poll = {
  question: "What is your favorite programming language?",
  options: [
    { label: "JavaScript", votes: 0 },
    { label: "Python", votes: 0 },
    { label: "Rust", votes: 0 }
  ]
};

// Already written for you: this HTTP server hands the browser the two files.
const server = http.createServer(async (req, res) => {
  const fileName = req.url === '/' ? 'index.html' : req.url.slice(1);
  if (fileName !== 'index.html' && fileName !== 'client.js') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const contentType = fileName.endsWith('.js') ? 'text/javascript' : 'text/html';
  const content = await fs.readFile(path.join(__dirname, fileName), 'utf8');
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(content);
});

// Already written for you: the WebSocket server and a helper that sends a
// message to every browser that is currently connected.
const wss = new WebSocket.Server({ server });

function broadcast(message) {
  const payload = JSON.stringify(message);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

wss.on('connection', (socket) => {
  // Already written for you: send the current poll to the new browser.
  socket.send(JSON.stringify({ type: 'state', poll }));

  socket.on('message', (rawData) => {
    // Already written for you: turn the incoming text into an object.
    const message = JSON.parse(rawData.toString());

    // TODO: (1) If message.type is not 'vote', stop here (return).
    // TODO: (2) Look up poll.options[message.index]. If there is no option at
    //           that index (an invalid index), stop here.
    // TODO: (3) Add 1 to that option's votes.
    // TODO: (4) Call broadcast({ type: 'state', poll }) so every browser updates.
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
