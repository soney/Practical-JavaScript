const http = require("http"); // http module (create a web server)
const fs = require("fs"); // filesystem module (read files)
const path = require("path"); // path module (work with paths)
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
// req.method; // HTTP method (e.g., GET, POST, PUT, etc.)
    let url = req.url;
    if(url === "/") { url = "index.html"; }

    if(req.method === "GET") {
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

const wss = new WebSocket.Server( { server } );
wss.on("connection", (socket) => {
    socket.addEventListener("message", (event) => {
        const data = event.data;
        for(const client of wss.clients) {
            if(client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        }
    });
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