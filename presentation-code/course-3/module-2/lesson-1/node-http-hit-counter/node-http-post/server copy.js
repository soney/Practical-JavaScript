const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let url = req.url;

    if (url === "/") {
        url = "index.html";
    }

    // Serve files from the 'sample-static-page' directory
    const filePath = path.join(__dirname, 'sample-static-page', url);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 (Not Found)');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(content);
        }
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});

function getContentType(filePath) {
    const ext = path.extname(filePath);
    
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
