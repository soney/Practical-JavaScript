# Problem 1: Your First Web Server

Edit `Lesson 1.1/main.js`:

Use Node's built-in `http` module to build a web server that always responds with the same greeting.

The starter code already creates the server and calls `server.listen(...)`. You only need to fill in the request handler so that the server replies to every request.

Inside the `http.createServer` callback in `main.js`:

1. Send a `200` status code using `res.writeHead(200, { 'Content-Type': 'text/plain' })`.
2. Send the response body using `res.end('Hello, World!')`.

When you visit the server in a browser (or the tests send a request), every response should:

- Return the status code `200`.
- Include the exact text `Hello, World!` in the body.

Leave the existing `PORT` constant and `server.listen(...)` call in place so the server keeps listening on the provided port.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js`. Then open a browser preview **inside the Coursera lab** and go to `localhost:3000`. Use the preview inside Coursera rather than a browser on your own computer: inside the lab, `localhost` refers to the lab machine where your server is running, but on your own computer `localhost` refers to your own machine, where the server is not running.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Creating Web Servers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/89334/practice-creating-web-servers) - `Lesson 1.1`

The files here are the starter you get in the course. [`solution/main.js`](solution/main.js) is the finished `main.js`; copy it over the starter to run the completed assignment.
