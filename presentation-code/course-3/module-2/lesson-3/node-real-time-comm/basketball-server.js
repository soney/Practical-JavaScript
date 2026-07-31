const http = require("http"); // http module (create a web server)
const fs = require("fs"); // filesystem module (read files)
const path = require("path"); // path module (work with paths)

const callbacks = [];
function startListening(callback) {
    callbacks.push(callback);
}
function stopListening(callback) {
    const index = callbacks.indexOf(callback);
    if(index !== -1) { // indexOf returns -1 if it's not in the list
        callbacks.splice(index, 1);
    }
}

const score = {
    home: 0, away: 0
};

function updateScore() {
    if(Math.random() > 0.5) {
        score.home++;
    } else {
        score.away++;
    }
    for(const callback of callbacks) {
        callback(score);
    }
    setTimeout(updateScore, 3000+2000*Math.random());
    // update the score somewhere between 3 and 5 seconds from now
}
updateScore();

const server = http.createServer((req, res) => {
// req.method; // HTTP method (e.g., GET, POST, PUT, etc.)
    let url = req.url;
    if(url === "/") { url = "index.html"; }

    if(url === "/score") {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const onScoreChange = () => {
            res.write("data: " + JSON.stringify(score) + "\n\n");
        }
        startListening(onScoreChange);

        req.on("close", () => {
            stopListening(onScoreChange);
            res.end();
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