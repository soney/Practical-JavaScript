const http = require("http"); // http module (create a web server)
const fs = require("fs"); // filesystem module (read files)
const path = require("path"); // path module (work with paths)

const products = [
    { name: "Milk", price: 3.49 },
    { name: "Eggs", price: 2.99 },
    { name: "Orange Juice", price: 4.29 },
    { name: "Bread", price: 2.49 },
    { name: "Butter", price: 3.79 },
    { name: "Cheese", price: 5.19 },
    { name: "Apples", price: 1.99 },
    { name: "Bananas", price: 0.69 }
];

const server = http.createServer((req, res) => {
    const parsedURL = new URL(req.url, `http://${req.headers.host}`);

    let pathname = parsedURL.pathname;
    if(pathname === "/") { pathname = "index.html"; }

    if(pathname === "/search") {
        const response = { 'results': [] };
        const query = parsedURL.searchParams.get('query');
        const maxPrice = Number(parsedURL.searchParams.get('maxPrice'));

        for(const product of products) {
            if(product.price <= maxPrice) {
                response.results.push(product.name);
            }
        }

        res.writeHead(200, { "Content-Type": "application/json"});
        res.end(JSON.stringify(response));
    } else if(req.method === "GET") {
        const filePath = path.join(__dirname, 'sample-static-page', pathname);

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