const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, 'page.html');

const server = http.createServer((req, res) => {
  // TODO: Read the file at filePath and send its contents as the response.
  //   1. Use fs.readFile(filePath, ...) to read the file.
  //   2. In the callback, send a 200 status code with res.writeHead.
  //   3. Send the file contents with res.end(...).
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
