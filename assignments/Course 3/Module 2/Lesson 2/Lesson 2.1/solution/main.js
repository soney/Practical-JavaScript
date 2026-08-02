const http = require('http');

// Create the server instance
const server = http.createServer((req, res) => {
  // Set the response header to plain text
  res.setHeader('Content-Type', 'text/plain');

  // SOLUTION: branch on req.method (GET/POST/other), always status 200
  // Check the HTTP verb used in the request
  if (req.method === 'GET') {
    res.statusCode = 200;
    res.end('Fetching data...');
  } 
  else if (req.method === 'POST') {
    res.statusCode = 200;
    res.end('Creating new resource...');
  } 
  else {
    // For PUT, DELETE, PATCH, etc.
    res.statusCode = 200; // Per requirements, keeping 200 OK
    res.end('Method not supported');
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
