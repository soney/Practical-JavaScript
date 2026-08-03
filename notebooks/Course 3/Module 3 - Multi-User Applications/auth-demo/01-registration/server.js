// auth-demo, stage 1: user registration
// Reading: "Implementing User Registration"
//
// The starting point is the static file server from Module 2, with two
// changes made before any new features: the require() calls became import
// statements (lowdb can only be loaded with import), and a lowdb database
// holds the accounts, exactly as in the Lesson 2 readings.
//
// New in this stage: the POST /register endpoint below, and the
// static/register.html page that calls it. The password is stored in plain
// text, which is bad on purpose: the TODO marks it, and stage 3 fixes it.
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 01-registration/server.js
// Then visit http://localhost:3000

// #region setup
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// import statements do not come with __filename and __dirname the way
// require() did, so an ESM file that wants them defines them itself.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// #endregion

// #region database
// users.json sits next to this server.js, whichever folder you start it from.
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

    // #region register
    if (req.method === 'POST' && url === '/register') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const email = data.email;

            // Re-read first, so the duplicate check below runs against the
            // latest copy of the database.
            await db.read();

            const userExists = db.data.users.find((user) => {
                return user.email === email;
            });

            if (userExists) {
                res.writeHead(409); // conflict
                return res.end('User already exists');
            }

            console.log(data);
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
    // #region static-files
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
    // #endregion
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});

// #region content-type
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
// #endregion
