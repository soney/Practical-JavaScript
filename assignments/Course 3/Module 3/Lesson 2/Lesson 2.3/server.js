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

// TODO: (1) Define a function named publicAccount that takes one user object
// and returns a NEW object containing ONLY the fields that are safe to
// share: the member's id and email. List those public fields explicitly and
// copy them onto a fresh object, so a private field like passwordHash is
// never included by accident. (Do not delete fields off the original user.)

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
    // TODO: (2) This response leaks passwordHash and recoveryCode to anyone
    // who asks. Change the res.end(...) line below so that, instead of the
    // raw db.data.users array, it sends an array in which every user has
    // been run through your publicAccount function. (Which array method
    // gives you back a new array of transformed elements?)
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.data.users));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
