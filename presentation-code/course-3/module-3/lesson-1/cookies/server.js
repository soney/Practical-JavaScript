const http = require("http"); // http module (create a web server)
const fs = require("fs"); // filesystem module (read files)
const path = require("path"); // path module (work with paths)

const server = http.createServer((req, res) => {
// req.method; // HTTP method (e.g., GET, POST, PUT, etc.)
    let url = req.url;
    if(url === "/") { url = "index.html"; }

    if(req.method === "GET") {
        const filePath = path.join(__dirname, 'static', url);
        console.log(req.headers.cookie);

        fs.readFile(filePath, (err, content) => {
            if(err) {
                res.writeHead(404);
                res.end('404 (Not Found)');
            } else {
                res.writeHead(200, {
                    'Content-Type': getContentType(filePath),
                    'Set-Cookie': 'example_cookie=hello_world; Path=/; Max-Age=0'
                });
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