// A member directory API backed by a lowdb database. The database setup and
// the web server are already written for you.
//
// The problem: the GET /users route currently sends EVERY field of every
// user, including passwordHash and recoveryCode. Those fields must never
// leave the server. Your work is marked with TODO comments.

import http from 'http';
import fs from 'fs/promises';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const PORT = process.env.PORT || 3000;

// The database is already set up for you. The passwordHash and recoveryCode
// values below are made up, but real apps store fields like these, and they
// are exactly the kind of data that must stay private.
const adapter = new JSONFile('db.json');
const defaultData = {
  users: [
    {
      id: 1,
      email: 'ada@example.com',
      passwordHash: '$2a$10$wq0hPZ7kFakeHashValueOnly1',
      recoveryCode: 'ADA-4419'
    },
    {
      id: 2,
      email: 'grace@example.com',
      passwordHash: '$2a$10$mm3kXb2rFakeHashValueOnly2',
      recoveryCode: 'GRACE-8807'
    },
    {
      id: 3,
      email: 'alan@example.com',
      passwordHash: '$2a$10$pr9sLt5vFakeHashValueOnly3',
      recoveryCode: 'ALAN-2038'
    }
  ]
};
const db = new Low(adapter, defaultData);
await db.read();

// SOLUTION: return a new object holding only the fields safe to share
function publicAccount(user) {
  return { id: user.id, email: user.email };
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

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // SOLUTION: map every user through publicAccount so private fields stay on the server
    res.end(JSON.stringify(db.data.users.map(publicAccount)));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
