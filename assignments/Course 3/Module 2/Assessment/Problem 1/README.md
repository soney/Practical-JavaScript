# Problem 1: A Basic Web Server

Edit `Problem 1/main.js`:

Use Node's built-in `http` module to build a web server that always responds with the same message.

The starter code already creates the server and calls `server.listen(...)`. You only need to fill in the request handler so the server replies to every request.

Inside the `http.createServer` callback in `main.js`, use two response methods:

- `res.writeHead(...)` to send back a `200` status code.
- `res.end(...)` to send the response body.

Every response the server sends should:

- Return the status code `200`.
- Include the exact text `Welcome to my server!` in the body.

Setting a `Content-Type` header on the response is optional and does not affect grading.

Leave the existing `PORT` constant and `server.listen(...)` call in place so the server keeps listening on the port the tests provide.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js`. Then open a browser preview inside the Coursera lab and go to `localhost:3000`. Use the preview inside Coursera rather than a browser on your own computer: inside the lab, `localhost` refers to the lab machine where your server is running, but on your own computer `localhost` refers to your own machine, where the server is not running.

---

Course 3, Module 2 - graded assignment: [Module 2 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/oCIOE/module-2-graded-assignment) - `Problem 1`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
