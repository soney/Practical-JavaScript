const http = require('http');

const server = http.createServer((req, res) => {
  // SOLUTION: assemble the POST body from stream chunks, then echo it back
  // We only want to process POST requests for this challenge
  if (req.method === 'POST') {
    // 1. Initialize a variable to hold the incoming data chunks
    let body = '';

    // 2. Listen for the 'data' event
    // This event fires every time a new "chunk" of the buffer arrives
    req.on('data', (chunk) => {
      body += chunk.toString(); 
    });

    // 3. Listen for the 'end' event
    // This fires once the entire payload has been received
    req.on('end', () => {
      console.log('Full Body Received:', body);

      // Send the required response
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Data Received: ${body}`);
    });

  } else {
    // Handle non-POST requests
    res.writeHead(405);
    res.end('Please use POST to send data.');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Stream Collector server running at http://localhost:${PORT}/`);
});
