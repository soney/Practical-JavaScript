import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
// const http = require("http"); // http module (create a web server)
// const fs = require("fs"); // filesystem module (read files)
// const path = require("path"); // path module (work with paths)

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

const server = http.createServer((req, res) => {
// req.method; // HTTP method (e.g., GET, POST, PUT, etc.)
    let url = req.url;
    if(url === "/") { url = "index.html"; }

    if(req.method === "POST" && url == "/register") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const data = JSON.parse(body);
            const email = data.email;

            const userExists = db.data.users.find((user) => {
                return user.email === email;
            });

            if(userExists) {
                res.writeHead(409); // conflict
                return res.end("User already exists");
            }

            console.log(data);
            const newUser = {
                created: Date.now(),
                email,
                password: data.password // TODO: fix. storing passwords in plaintext is BAD!
            };
            await db.read();
            db.data.users.push(newUser);
            await db.write();

            res.writeHead(201);
            res.end('User registered successfully');
        });
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