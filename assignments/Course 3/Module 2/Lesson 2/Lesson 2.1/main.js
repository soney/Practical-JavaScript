const http = require('http');

// EDIT THIS FILE: respond based on req.method (see problem description):
//   GET -> "Fetching data...", POST -> "Creating new resource...",
//   any other method -> "Method not supported". Always send status 200.

// Create the server instance
const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/plain');

  // TODO: replace the single placeholder response below with branching on
  //       req.method so GET, POST, and other methods each get the right reply.
  res.end('TODO: respond based on the request method.');

});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
