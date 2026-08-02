const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // SOLUTION: reply to every request with plain-text "Hello, World!"
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
