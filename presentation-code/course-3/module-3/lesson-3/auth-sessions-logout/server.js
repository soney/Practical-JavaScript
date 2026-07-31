import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = new Low(new JSONFile('users.json'), { users: [] });

await db.read();
if(!db.data) { // database does not exist
    db.data = { users: [] };
}
if(!db.data.users) {
    db.data.users = [];
}

const sessions = {};

const server = http.createServer((req, res) => {
// req.method; // HTTP method (e.g., GET, POST, PUT, etc.)
    let url = req.url;
    if(url === "/") { url = "index.html"; }

    if(req.method === "POST" && url == "/login") {
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

            if(foundUser) {
                const match = await bcrypt.compare(password, foundUser.password);
                if(match) {
                    const sessionId = crypto.randomUUID();
                    // session ID is random and impossible to guess
                    const session = {
                        email: foundUser.email
                    };
                    sessions[sessionId] = session;
                    res.writeHeader(200, {
                        'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Max-Age=3600` // 1 hour
                    });
                    res.end("Login successful!");
                } else {
                    res.writeHead(401); // unauthorized
                    res.end("Invalid credentials");
                }
            } else {
                res.writeHead(401); // unauthorized
                res.end("Invalid credentials");
            }
        });
    } else if(req.method === "POST" && url == "/register") {
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

            if(userExists) {
                res.writeHead(409); // conflict
                return res.end("User already exists");
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const newUser = {
                created: Date.now(),
                email,
                password: hashedPassword 
            };
            db.data.users.push(newUser);
            await db.write();

            res.writeHead(201);
            res.end('User registered successfully');
        });
    } else if(req.method === "POST" && url === "/logout") {
        const cookies = parseCookies(req);
        const sessionId = cookies.sessionId;
        if(sessionId && sessions[sessionId]) {
            delete sessions[sessionId];
        }
        res.writeHead(200, {
            'Set-Cookie': "sessionId=;HttpOnly;Max-Age=0" // expire immediately
        });
        res.end("Logged out");
    } else if(req.method === "GET" && url === "/me") {
        const cookies = parseCookies(req);
        const sessionId = cookies.sessionId;
        if(sessionId && sessions[sessionId]) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(sessions[sessionId]));
        } else {
            res.writeHead(401);
            res.end("Unauthorized");
        }
    } else if(req.method === "GET") {
        const filePath = path.join(__dirname, 'static', url);

        fs.readFile(filePath, (err, content) => {
            if(err) {
                res.writeHead(404);
                res.end('404 (Not Found)');
            } else {
                res.writeHead(200, {'Content-Type': getContentType(filePath)});
                res.end(content);
            }
        });
    } else {
        res.writeHead(405);
        res.end("Method not allowed!");
    }
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});

function parseCookies(req) {
    const cookieObject = {};
    const cookiesHeader = req.headers.cookie;
    if(!cookiesHeader) { return cookieObject; }

    const pairs = cookiesHeader.split(';');

    for(const pair of pairs) { // pair: "sessionId=..."
        const splitpair = pair.split("="); // splitpair: ["sessionId", "..."]
        if(splitpair.length <= 1) { continue; }
        const name = splitpair[0];
        const value = splitpair.slice(1).join('='); // the rest of the items in the array splitpair (excluding the first item) and re-join
        cookieObject[name] = value;
    }
    return cookieObject;
}

function getContentType(filePath) {
    const ext = path.extname(filePath); // extension (.html, .css, .js, .jpg, etc)

    let contentType = 'text/html';
    if(ext === '.css') {
        contentType = 'text/css';
    } else if(ext === '.js') {
        contentType = 'text/javascript';
    } else if(ext === '.jpg') {
        contentType = 'image/jpg';
    }
    return contentType;
}