// The static file server from "Serving Static Files".
//
// Run it:   node static-server.js
// Visit:    http://localhost:3000            (serves sample-static-page/index.html)
//           http://localhost:3000/styles.css (the stylesheet, as text/css)
//           http://localhost:3000/xyz.html   (a 404)

const http = require('http');
const fs = require('fs');
const path = require('path');

// #region content-type
function getContentType(filePath) {
  const extension = path.extname(filePath);

  if (extension === '.css') {
    return 'text/css';
  } else if (extension === '.js') {
    return 'text/javascript';
  } else if (extension === '.jpg') {
    return 'image/jpeg';
  }

  return 'text/html';
}
// #endregion

const server = http.createServer((request, response) => {
  // #region url
  let url = request.url;

  if (url === '/') {
    url = 'index.html';
  }

  const filePath = path.join(__dirname, 'sample-static-page', url);
  // #endregion

  // #region read
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
    } else {
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(content);
    }
  });
  // #endregion
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
