const http = require('http');

// EDIT THIS FILE: collect the POST request body from the request stream, then
// respond with "Data Received: <body>" (see problem description).

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // TODO: replace the placeholder response below. Listen for the 'data' event to
  //       gather chunks into a body string, then on 'end' send it back.
  res.writeHead(501, { 'Content-Type': 'text/plain' });
  res.end('TODO: collect the request body.');
});

server.listen(PORT, () => {
  console.log(`Stream Collector server running at http://localhost:${PORT}/`);
});
