//http module
const http = require("http");
const fs = require("fs"); // filesystem module
const path = require("path");

function getHitCount() {
    return new Promise((resolve) => {
        fs.readFile('hit-count.txt', 'utf8', (err, content) => {
            if(err) {
                resolve(0);
            } else {
                resolve(parseInt(content));
            }
        });
    });
}
function setHitCount(count) {
    fs.writeFile('hit-count.txt', String(count), () => {});
    // writes the file named "hit-count.txt" with contents "count"
}

const server = http.createServer(async (req, res) => {
    let url = req.url;

    if(url === '/gethitcount') {
        res.writeHead(200, {'Content-Type': "text/plain"});
        res.end(String(await getHitCount())); // reply with the current hit count
        return;
    }

    if(url === "/") {
        url = "index.html";
        setHitCount(await getHitCount() + 1);
    }
    // __dirname: full directory path that the current file is in
    const filePath = path.join(__dirname, 'sample-static-page', url);

    fs.readFile(filePath, (err, content) => {
        if(err) {
            res.writeHead(404);
            res.end('404 (Not Found)');
        } else {
            res.writeHead(200, {'Content-Type': getContentType(filePath)});
            res.end(content);
        }
    }); // read as plaintext
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