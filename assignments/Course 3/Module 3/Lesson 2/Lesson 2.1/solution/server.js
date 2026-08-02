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

// SOLUTION: set up the lowdb database backed by db.json
const adapter = new JSONFile('db.json');
const defaultData = { posts: [] };
const db = new Low(adapter, defaultData);

// SOLUTION: load the saved data from db.json into db.data before handling requests
await db.read();

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
    // SOLUTION: respond with every saved post as JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.data.posts));
    return;
  }

  if (req.method === 'POST' && req.url === '/posts') {
    const body = await readBody(req);
    // SOLUTION: add the post to db.data, write it to db.json, then confirm
    db.data.posts.push(body.text);
    await db.write();
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Post saved' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
