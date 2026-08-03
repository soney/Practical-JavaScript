// auth-demo, stage 2: user login
// Reading: "Implementing User Login"
//
// Changed since stage 1 (../01-registration/):
//   - a new POST /login endpoint checks an email and password against the
//     database and answers 200 or 401
//   - both failures (unknown email, wrong password) get the same vague
//     "Invalid credentials" message, so nobody can probe which emails have
//     accounts here
//   - the email comparisons in /login and /register are now case-insensitive
//   - static/login.html is new; it posts the form to /login
//
// The passwords are still compared and stored in plain text; the TODOs mark
// it, and stage 3 fixes it.
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 02-login/server.js
// Then visit http://localhost:3000, register, and log in

// #region setup
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
            // const email = data.email;
            // const password = data.password;
            const { email, password } = data;

            await db.read();

            const foundUser = db.data.users.find((user) => {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (foundUser) {
                // TODO: fix. Do not compare plain text passwords!
                if (foundUser.password === password) {
                    res.writeHead(200);
                    res.end('Login successful!');
                } else {
                    // Deliberately the same message as below: saying
                    // "incorrect password" would confirm the email exists.
                    res.writeHead(401); // unauthorized
                    res.end('Invalid credentials');
                }
            } else {
                res.writeHead(401); // unauthorized
                res.end('Invalid credentials');
            }
        });
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

            const newUser = {
                created: Date.now(),
                email,
                password: data.password // TODO: fix. Storing passwords in plain text is BAD!
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
