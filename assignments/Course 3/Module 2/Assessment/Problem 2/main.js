const http = require('http');
const fs = require('fs/promises');
const path = require('path');

// EDIT THIS FILE.
// Your job: make the server respond differently depending on the route.
// Add the /movies route, the /hours route, and a 404 for anything else.

// This data is already set up for you. You do not need to change it.
const movies = [
    { title: 'The Quiet Horizon', time: '6:30 PM' },
    { title: 'Robots in Love', time: '8:00 PM' },
    { title: 'The Last Lighthouse', time: '9:15 PM' }
];

const hoursText = 'Box office hours: 10:00 AM to 10:00 PM, every day.';

const server = http.createServer((req, res) => {
    // req.url is the path the browser asked for, such as '/' or '/movies'.
    const pathname = req.url;

    // Serving the page (already set up for you):
    // A request for '/' or '/index.html' responds with the index.html file.
    if (pathname === '/' || pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8')
            .then((html) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            })
            .catch(() => {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not found');
            });
    }

    // TASK 1: THE MOVIES ROUTE
    // TODO: replace 'false' with a check that pathname is '/movies'.
    else if (false) {
        // TODO: Respond with status 200 and 'Content-Type' set to 'application/json'.
        // TODO: Send the movies array as JSON with JSON.stringify(movies).
    }

    // TASK 2: THE HOURS ROUTE
    // TODO: replace 'false' with a check that pathname is '/hours'.
    else if (false) {
        // TODO: Respond with status 200 and 'Content-Type' set to 'text/plain'.
        // TODO: Send the hoursText string.
    }

    // TASK 3: EVERY OTHER ROUTE
    else {
        // TODO: Respond with status 404 and 'Content-Type' set to 'text/plain'.
        // TODO: Send the text 'Not found'.
    }
});

// Keep this PORT setup so the tests can choose the server port.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Try these routes in your browser:');
    console.log(`  http://localhost:${PORT}/`);
    console.log(`  http://localhost:${PORT}/movies`);
    console.log(`  http://localhost:${PORT}/hours`);
});
