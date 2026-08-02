const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // TODO: Respond to every request with a 200 status code and the exact
    // message: Welcome to my server!
    // Use res.writeHead(...) to send the status code, then res.end(...) to
    // send the response body.
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
