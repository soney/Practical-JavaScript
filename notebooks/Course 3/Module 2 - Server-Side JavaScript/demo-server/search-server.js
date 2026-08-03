// The grocery search from "Handling Query Parameters".
//
// Run it:   node search-server.js
// Visit:    http://localhost:3000
// Stop it:  Ctrl+C in the terminal
//
// Search with a maximum price and watch the terminal: the path stays
// /search while the query string changes with what you typed.

const http = require('http');
const fs = require('fs');
const path = require('path');

// #region products
const products = [
  { name: 'Milk', price: 3.49 },
  { name: 'Eggs', price: 2.99 },
  { name: 'Orange Juice', price: 4.29 },
  { name: 'Bread', price: 2.49 },
  { name: 'Butter', price: 3.79 },
  { name: 'Cheese', price: 5.19 },
  { name: 'Apples', price: 1.99 },
  { name: 'Bananas', price: 0.69 }
];
// #endregion

const server = http.createServer((request, response) => {
  // #region parse
  console.log(request.method + ' ' + request.url);

  const parsedUrl = new URL(request.url, 'http://' + request.headers.host);

  let pathname = parsedUrl.pathname;

  if (pathname === '/') {
    pathname = 'index.html';
  }
  // #endregion

  // #region search
  if (pathname === '/search') {
    const searchResponse = { results: [] };

    // query is read but not used: only maxPrice narrows the results here.
    const query = parsedUrl.searchParams.get('query');
    const maxPrice = Number(parsedUrl.searchParams.get('maxPrice'));

    for (const product of products) {
      if (product.price <= maxPrice) {
        searchResponse.results.push(product.name);
      }
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(searchResponse));
  // #endregion
  // #region files
  } else if (request.method === 'GET') {
    const filePath = path.join(__dirname, 'search-page', pathname);

    fs.readFile(filePath, (error, content) => {
      if (error) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
      } else {
        // search-page holds a single HTML file, so the content type is fixed.
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content);
      }
    });
  } else {
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Method not allowed');
  }
  // #endregion
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
