// auth-demo, stage 4: sessions
// Reading: "Managing User Sessions"
//
// Changed since stage 3 (../03-hashing/):
//   - a sessions object maps random session IDs to logged-in users
//   - a successful /login now invents a session ID (crypto.randomUUID) and
//     sends it to the browser as a cookie
//   - parseCookies, at the bottom, reads the Cookie header back apart
//   - a new GET /me endpoint answers "who am I?" from the session cookie
//   - static/index.html now calls /me and greets a logged-in user, and
//     static/login.html goes back to the home page after a successful login
//
// Sessions live in this object, in memory: restart the server and everyone
// is logged out, even though their browsers still hold cookies.
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 04-sessions/server.js
// Then visit http://localhost:3000, register, and log in

// #region setup
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// #endregion

// #region sessions
// sessionId -> information about the logged-in user. Lives in memory, so a
// server restart empties it.
const sessions = {};
// #endregion

// #region database
const db = new Low(new JSONFile(path.join(__dirname, 'users.json')), { users: [] });

await db.read();
if (!db.data) { // the database file does not exist yet
    db.data = { users: [] };
}
if (!db.data.users) { // ...or an older file is missing the users field
    db.data.users = [];
}
// #endregion

const server = http.createServer((req, res) => {
    let url = req.url;
    if (url === '/') { url = 'index.html'; }

    // #region login
    if (req.method === 'POST' && url === '/login') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const { email, password } = data;

            await db.read();

            const foundUser = db.data.users.find((user) => {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (foundUser) {
                const match = await bcrypt.compare(password, foundUser.password);
                if (match) {
                    // The session ID is random and impossible to guess.
                    const sessionId = crypto.randomUUID();
                    sessions[sessionId] = { email: foundUser.email };

                    res.writeHead(200, {
                        'Set-Cookie': `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Max-Age=3600` // 1 hour
                    });
                    res.end('Login successful!');
                } else {
                    res.writeHead(401); // unauthorized
                    res.end('Invalid credentials');
                }
            } else {
                res.writeHead(401); // unauthorized
                res.end('Invalid credentials');
            }
        });
    // #endregion
    // #region me
    } else if (req.method === 'GET' && url === '/me') {
        const cookies = parseCookies(req);
        const sessionId = cookies.sessionId;
        if (sessionId && sessions[sessionId]) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sessions[sessionId]));
        } else {
            res.writeHead(401);
            res.end('Unauthorized');
        }
    // #endregion
    // #region register
    } else if (req.method === 'POST' && url === '/register') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const email = data.email;

            await db.read();

            const userExists = db.data.users.find((user) => {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (userExists) {
                res.writeHead(409); // conflict
                return res.end('User already exists');
            }

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const newUser = {
                created: Date.now(),
                email,
                password: hashedPassword
            };
            db.data.users.push(newUser);
            await db.write();

            res.writeHead(201); // created
            res.end('User registered successfully');
        });
    // #endregion
    } else if (req.method === 'GET') {
        const filePath = path.join(__dirname, 'static', url);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('404 (Not Found)');
            } else {
                res.writeHead(200, { 'Content-Type': getContentType(filePath) });
                res.end(content);
            }
        });
    } else {
        res.writeHead(405);
        res.end('Method not allowed!');
    }
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});

function getContentType(filePath) {
    const ext = path.extname(filePath); // extension (.html, .css, .js, .jpg, etc)

    let contentType = 'text/html';
    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    } else if (ext === '.jpg') {
        contentType = 'image/jpg';
    }
    return contentType;
}

// #region parse-cookies
function parseCookies(req) {
    const list = {};
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) { return list; }

    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
        // each piece is "name=value" (or occasionally a bare "name")
        let [name, ...rest] = cookie.split('=');

        if (name) { name = name.trim(); } // "  sessionId" => "sessionId"
        else { continue; }
        const value = rest.join('=').trim();
        if (!value) { continue; }
        list[name] = value;
    }
    return list;
}
// #endregion
