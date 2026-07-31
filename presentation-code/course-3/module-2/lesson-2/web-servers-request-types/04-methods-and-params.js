const http = require('http');
const { URL } = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (method === 'GET') {
    // Handle GET request
    if (pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>GET Request</h1>
        <p>Try adding query parameters like <a href="/?name=Alice&age=25">/?name=Alice&age=25</a></p>
        <form method="POST" action="/submit">
            <input type="text" name="data" placeholder="Enter some data">
            <button type="submit">Send POST</button>
        </form>
      `);
    } else {
      // Display query parameters
      const params = Object.fromEntries(parsedUrl.searchParams);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'GET request received', path: pathname, query: params }));
    }
  } else if (method === 'POST' && pathname === '/submit') {
    // Handle POST request
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'POST request received', body: body }));
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
