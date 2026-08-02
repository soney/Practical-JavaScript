# Problem 2: Server Routes for a Cinema Site

Edit `Problem 2/main.js`:

Build a Node.js server for the Starlight Cinema page. The server should respond differently depending on which route the browser requests. The page in `index.html` is already written and calls the server routes for you, so you only edit `main.js`. Do not edit `index.html`.

The starter file already imports the `http`, `fs`, and `path` modules, defines the `movies` and `hoursText` data, and includes the branch that serves the page. Leave those parts in place. Your work is the `/movies` route, the `/hours` route, and the response for unknown routes.

The starter reads the requested path for you:

```js
const pathname = req.url;
```

Your server must handle these routes:

| Request | What it should do |
| --- | --- |
| `GET /` or `GET /index.html` | Serve `index.html` with `Content-Type: text/html`. (Already written in the starter.) |
| `GET /movies` | Return the `movies` array as JSON. |
| `GET /hours` | Return the `hoursText` string as plain text. |
| Any other route | Return status `404`. |

For `/movies`:

1. Check that `pathname` is `/movies`.
2. Respond with status `200` and `Content-Type: application/json`.
3. Send the `movies` array as JSON using `JSON.stringify(movies)`.

For `/hours`:

1. Check that `pathname` is `/hours`.
2. Respond with status `200` and `Content-Type: text/plain`.
3. Send the `hoursText` string.

For any other route:

1. Respond with status `404` and `Content-Type: text/plain`.
2. Send the text `Not found`.

Use `res.writeHead(status, headers)` to set the status code and the headers, and `res.end(body)` to send the response body. Add each route as an `else if` branch after the branch that serves the page, and put the `404` response in the final `else` branch.

Keep the existing `PORT` setup so the tests can choose the server port.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js`. Then open a browser preview inside the Coursera lab and go to `localhost:3000`. Click **Show Movies** and **Show Hours** to check the `/movies` and `/hours` routes, and visit a made-up address like `localhost:3000/nope` to confirm unknown routes return `404`. Use the preview inside Coursera rather than a browser on your own computer, because inside the lab `localhost` refers to the lab machine where your server is running.

---

Course 3, Module 2 - graded assignment: [Module 2 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/oCIOE/module-2-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
