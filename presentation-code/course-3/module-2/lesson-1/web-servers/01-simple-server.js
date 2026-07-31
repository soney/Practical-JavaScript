const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Set the response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send the response body
  res.end('Hello, World! This is a simple HTTP server.');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
