// A post board API that keeps its posts in a lowdb database (db.json),
// so the posts are still there after the server restarts.
//
// The web server below is already written for you. Your work is the
// database code, marked with TODO comments.

import http from 'http';
import fs from 'fs/promises';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const PORT = process.env.PORT || 3000;

// TODO: (1) Set up the database. Replace the line below with three lines:
//   1. Create an adapter that stores data in db.json:
//      const adapter = new JSONFile('db.json');
//   2. Create the data the database starts with when db.json does not exist yet:
//      const defaultData = { posts: [] };
//   3. Create the database object:
//      const db = new Low(adapter, defaultData);
const db = null;

// TODO: (2) Load the saved data from db.json into db.data before the server
// starts handling requests. Add this line right here:
//   await db.read();

// readBody collects a request's body and parses it as JSON.
// It is already written for you.
function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // These two routes serve the provided page. Leave them as they are.
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const html = await fs.readFile(new URL('./index.html', import.meta.url), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }
  if (req.method === 'GET' && req.url === '/client.js') {
    const script = await fs.readFile(new URL('./client.js', import.meta.url), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(script);
    return;
  }

  if (req.method === 'GET' && req.url === '/posts') {
    // TODO: (3) Respond with every saved post. Replace the two lines below with:
    //   res.writeHead(200, { 'Content-Type': 'application/json' });
    //   res.end(JSON.stringify(db.data.posts));
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET /posts is not implemented yet' }));
    return;
  }

  if (req.method === 'POST' && req.url === '/posts') {
    const body = await readBody(req);
    // TODO: (4) Save the new post, then confirm it. Replace the two lines below with:
    //   1. Add the post text to the array in memory:
    //      db.data.posts.push(body.text);
    //   2. Write the change to db.json:
    //      await db.write();
    //   3. Respond with a 201 status:
    //      res.writeHead(201, { 'Content-Type': 'application/json' });
    //      res.end(JSON.stringify({ message: 'Post saved' }));
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'POST /posts is not implemented yet' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
