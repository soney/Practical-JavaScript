// auth-demo, stage 3: hashed passwords
// Reading: "Securing User Data"
//
// Changed since stage 2 (../02-login/): the two TODOs are gone.
//   - bcrypt is imported at the top
//   - /register runs the password through bcrypt.hash and stores the hash
//   - /login checks the typed password against the stored hash with
//     bcrypt.compare instead of ===
//
// Everything else, including the static/ pages, is unchanged. Note that an
// account registered under stage 1 or 2 stored a plain text password, which
// bcrypt.compare will never match; each stage has its own users.json, so
// register again here.
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 03-hashing/server.js
// Then visit http://localhost:3000, register, and look at users.json

// #region setup
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';

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
            const { email, password } = data;

            await db.read();

            const foundUser = db.data.users.find((user) => {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (foundUser) {
                const match = await bcrypt.compare(password, foundUser.password);
                if (match) {
                    res.writeHead(200);
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
