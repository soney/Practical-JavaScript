const http = require('http');

const server = http.createServer((req, res) => {
  // SOLUTION: parse req.url and handle /search?term=...
  // 1. Create a URL object
  // Since req.url only contains the path (e.g., /search?term=js), 
  // we provide a dummy base URL so the constructor can parse it correctly.
  const baseURL = `http://${req.headers.host}`;
  const parsedUrl = new URL(req.url, baseURL);

  // 2. Check if we are on the /search path
  if (parsedUrl.pathname === '/search') {
    
    // 3. Extract the 'term' parameter
    const searchTerm = parsedUrl.searchParams.get('term');

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (searchTerm) {
      // If the parameter exists
      res.end(`You searched for: ${searchTerm}`);
    } else {
      // If the parameter is missing (?term= was not provided)
      res.end('Please provide a search term');
    }

  } else {
    // Basic 404 for any other path
    res.writeHead(404);
    res.end('Path not found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Search server running at http://localhost:${PORT}/`);
});
