# Problem 2: Serving a File

Edit `Lesson 1.2/main.js`:

Instead of responding with text typed directly into your code, make your server read an HTML file from disk and send its contents to the browser.

The folder already contains a file named `page.html`. Do not edit `page.html`. The starter code sets up the server and defines `filePath`, the full path to `page.html`. You only need to fill in the request handler.

Inside the `http.createServer` callback in `main.js`:

1. Use `fs.readFile(filePath, (err, data) => { ... })` to read the file. The callback gives you two values: `err` and `data`. When the read succeeds, `err` is `null` and `data` holds the file contents. When it fails (for example, if the file is missing), `err` is an error object instead.
2. Handle the error case first. Check `if (err) { ... }` (an error object is truthy, so that is how you know something went wrong). Inside, send a `500` status code with `res.writeHead(500, { 'Content-Type': 'text/plain' })`, end the response with a short message like `res.end('Error loading page.')`, and `return` so the success code below does not also run.
3. If there is no error, send a `200` status code with `res.writeHead(200, { 'Content-Type': 'text/html' })`.
4. Send the file contents with `res.end(data)`.

When you visit the server, the response should:

- Return the status code `200`.
- Include the contents of `page.html` (for example, the text `Welcome to my website!`).

Leave the existing `PORT` constant, `filePath` constant, and `server.listen(...)` call in place.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js`. Then open a browser preview **inside the Coursera lab** and go to `localhost:3000`. Use the preview inside Coursera rather than a browser on your own computer: inside the lab, `localhost` refers to the lab machine where your server is running, but on your own computer `localhost` refers to your own machine, where the server is not running.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Creating Web Servers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/89334/practice-creating-web-servers) - `Lesson 1.2`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%201/Lesson%201.2/solution); in the course codespace that folder is hidden so you can work the problem first.
