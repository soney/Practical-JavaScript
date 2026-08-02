// A quiz score API backed by a lowdb database (db.json). The database setup
// and the web server are already written for you. Your work is the two data
// routes, marked with TODO comments.

import http from 'http';
import fs from 'fs/promises';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const PORT = process.env.PORT || 3000;

// The database is already set up for you. When db.json does not exist yet,
// it starts with these three players.
const adapter = new JSONFile('db.json');
const defaultData = {
  players: [
    { name: 'Aisha', score: 0 },
    { name: 'Ben', score: 0 },
    { name: 'Chen', score: 0 }
  ]
};
const db = new Low(adapter, defaultData);
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

  if (req.method === 'GET' && req.url === '/players') {
    // TODO: (1) Respond with every player. Replace the two lines below with:
    //   res.writeHead(200, { 'Content-Type': 'application/json' });
    //   res.end(JSON.stringify(db.data.players));
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET /players is not implemented yet' }));
    return;
  }

  if (req.method === 'POST' && req.url === '/score') {
    const body = await readBody(req);
    // TODO: (2) Add one point to the player named body.name.
    // Replace the two lines below with these steps:
    //   1. Find the player record:
    //      const player = db.data.players.find((p) => p.name === body.name);
    //   2. If there is no matching player, respond and stop:
    //      res.writeHead(404, { 'Content-Type': 'application/json' });
    //      res.end(JSON.stringify({ message: 'Player not found' }));
    //      return;
    //   3. Update the record: player.score = player.score + 1;
    //   4. Save the change to db.json: await db.write();
    //   5. Respond with the new score:
    //      res.writeHead(200, { 'Content-Type': 'application/json' });
    //      res.end(JSON.stringify({ message: 'Score updated', score: player.score }));
    res.writeHead(501, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'POST /score is not implemented yet' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
