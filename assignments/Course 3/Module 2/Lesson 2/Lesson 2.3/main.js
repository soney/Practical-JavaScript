const http = require('http');

// EDIT THIS FILE: parse req.url with the URL constructor and handle
// /search?term=... (see problem description).

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // TODO: replace the placeholder response below. Parse req.url, read the 'term'
  //       query parameter on /search, and respond with the required text.
  res.writeHead(501, { 'Content-Type': 'text/plain' });
  res.end('TODO: parse the search URL.');
});

server.listen(PORT, () => {
  console.log(`Search server running at http://localhost:${PORT}/`);
});
