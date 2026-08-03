# Demo servers

One runnable server per reading in this module, some with a page of their
own. Each listens on port 3000, so run **one at a time**: stop the current
one with Ctrl+C before starting the next, or you will see `EADDRINUSE`.

Open a terminal (Terminal > New Terminal), move into this folder, and run the
one you want:

    cd "demo-server"
    node simple-server.js

Then visit <http://localhost:3000>.

| File | Reading | What it does |
| --- | --- | --- |
| `simple-server.js` | Creating a Simple Web Server | Answers every request with the same text |
| `routing-server.js` | Handling Requests and Responses | Answers `/`, `/about`, and anything else differently |
| `static-server.js` | Serving Static Files | Sends the files in `sample-static-page/` |
| `counter-server.js` | Handling Server-Side Data | Counts visits and keeps the count in a file |
| `methods-server.js` | Understanding HTTP Methods | Logs every request's method and routes `/users` on it |
| `form-server.js` | GET vs POST Requests | Receives a form submission and reads its streamed body |
| `search-server.js` | Handling Query Parameters | Answers `/search` using the query string's parameters |
| `score-server.js` | Server-Sent Events | Pushes a changing score to every open browser |

`sample-static-page/` holds the page `static-server.js` serves: an
`index.html` that links a stylesheet and a script, so one request from you
turns into three requests to the server.

`counter-page/` holds the page `counter-server.js` serves. Running that server
creates a `hit-count.txt` next to it; delete the file to reset the count.

`methods-page/` holds the page `methods-server.js` serves, plus
`something.txt`, the file its buttons request with four different methods.

`form-page/` holds the form `form-server.js` serves. Submitting the form is
what sends the `POST`.

`search-page/` holds the search page `search-server.js` serves. Its Search
button never navigates anywhere: it calls `fetch` with a query string.

`score-page/` holds the page `score-server.js` serves. Open it in two windows
at once to see both update at the same moment.
