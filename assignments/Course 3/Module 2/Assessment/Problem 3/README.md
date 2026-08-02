# Problem 3: Broadcast Messages with WebSockets

Build the server for a real-time "shared notepad": when one person types, everyone else connected sees the same text appear instantly. The browser page and most of the server are already written. The one missing piece is the server's job of relaying messages between the connected clients.

Edit `Problem 3/main.js`. The `index.html` page is already written and connects to your server for you, so you only edit `main.js`. Do not edit `index.html`.

The starter `main.js` already:

- creates an HTTP server that serves `index.html` (the notepad page), and
- creates a WebSocket server named `wss` and attaches it to that HTTP server.

Each connected browser tab becomes one of `wss`'s clients, available as `wss.clients`. Your job is to make `wss` listen for messages and broadcast them. Add code so the server does all of the following:

1. Listen for the WebSocket `connection` event on `wss`. It fires once for every client that connects and gives you that client's `socket`.
2. Inside that handler, listen for the `message` event on `socket`.
3. Each message arrives as a Buffer, so convert it to a string with `rawData.toString()`.
4. Broadcast that text to every other connected client: loop over `wss.clients` with a `for...of` loop, and call `client.send(text)` only when the client is not the sender (`client !== socket`) and its connection is open (`client.readyState === WebSocket.OPEN`).

The person who typed keeps the text they entered, and every other connected client receives the broadcast and updates their notepad to match.

Keep the existing `PORT` setup and `server.listen(...)` call in place so the tests can choose the server port.

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node main.js` (the `ws` package is already installed in the lab). Then open a browser preview inside the Coursera lab and go to `localhost:3000`. Open the same address in a second preview tab, and type in one tab: the text should appear in the other. Use the preview inside Coursera rather than a browser on your own computer, because inside the lab `localhost` refers to the lab machine where your server is running.

---

Course 3, Module 2 - graded assignment: [Module 2 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/oCIOE/module-2-graded-assignment) - `Problem 3`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
