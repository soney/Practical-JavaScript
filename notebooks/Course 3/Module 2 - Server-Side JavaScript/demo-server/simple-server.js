// The five-line server from "Creating a Simple Web Server".
//
// Run it:   node simple-server.js
// Visit:    http://localhost:3000
// Stop it:  Ctrl+C in the terminal

// #region setup
const http = require('http');
// #endregion

// #region handler
const server = http.createServer((request, response) => {
  console.log('Got a request!');

  response.end('Hello client');
});
// #endregion

// #region listen
server.listen(3000, () => {
  console.log('Listening on port 3000');
});
// #endregion
