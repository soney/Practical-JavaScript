const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // TODO: Respond to every request with the plain text "Hello, World!".
  //   1. Use res.writeHead(200, ...) to send a 200 status code.
  //   2. Use res.end(...) to send the text "Hello, World!".
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
