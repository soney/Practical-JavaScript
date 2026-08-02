const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

let hits = 0; // the number of times the count has been requested

const server = http.createServer((req, res) => {
  if (req.url === '/hits') {
    // SOLUTION: count this view and return the new total as text
    hits = hits + 1;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(String(hits));
  } else if (req.url === '/client.js') {
    // Serve the browser JavaScript file (you do not need to change this).
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(fs.readFileSync(path.join(__dirname, 'client.js')));
  } else {
    // Serve the HTML page (you do not need to change this).
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html')));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
