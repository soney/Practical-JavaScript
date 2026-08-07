# Problem 3: A Page View Counter

Edit `Lesson 1.3/main.js` and `Lesson 1.3/client.js`:

Build a page view counter. The server keeps track of how many times the count has been requested, and the page in the browser fetches that number and displays it.

You will edit two files. Do not edit `index.html`.

## Part A - Server side (`main.js`)

The server already serves the HTML page and the browser JavaScript file. You only need to finish the `/hits` route.

Inside the `if (req.url === '/hits')` block:

1. Add `1` to the `hits` variable.
2. Send a `200` status code with `res.writeHead(200, { 'Content-Type': 'text/plain' })`.
3. Send the new count back as text with `res.end(String(hits))`.

## Part B - Client side (`client.js`)

This file runs in the browser. Make it ask the server for the count and show it on the page.

1. Call `fetch('/hits')` to request the count from the server.
2. Read the response as text using `response.text()`.
3. Put the returned number into the element with `id="hit-count"` by setting its `textContent`.

## Expected behavior

- Visiting `/hits` directly returns the current count as plain text.
- When you open the page, the `...` placeholder in `This page has been viewed ... time(s).` is replaced with a number.
- Each time you reload the page, the displayed number goes up by one.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js`. Then open a browser preview **inside the Coursera lab** and go to `localhost:3000`. Use the preview inside Coursera rather than a browser on your own computer: inside the lab, `localhost` refers to the lab machine where your server is running, but on your own computer `localhost` refers to your own machine, where the server is not running.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Creating Web Servers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/89334/practice-creating-web-servers) - `Lesson 1.3`

The files here are the starter you get in the course. The finished `client.js` and `main.js` are in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%201/Lesson%201.3/solution); in the course codespace that folder is hidden so you can work the problem first.
