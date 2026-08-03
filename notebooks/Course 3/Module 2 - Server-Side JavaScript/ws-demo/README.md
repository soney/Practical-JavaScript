# WebSocket demos

Three runnable WebSocket servers, one per reading in the second half of
this lesson. They all use the `ws` library, which is not part of Node, so
install it once before the first run:

    cd "ws-demo"
    npm install

That creates a `node_modules` folder here; you only need to do it once.

Each server listens on port 3000, so run **one at a time**: stop the
current one with Ctrl+C before starting the next, or you will see
`EADDRINUSE`. (The servers in `demo-server/` use port 3000 too.)

Open a terminal (Terminal > New Terminal), move into this folder, and run
the one you want:

    cd "ws-demo"
    node connect-server.js

Then visit <http://localhost:3000>.

| File | Reading | What it does |
| --- | --- | --- |
| `connect-server.js` | Introduction to WebSockets | Upgrades the connection and each side sends one greeting |
| `echo-server.js` | Sending Data with WebSockets | Answers every message with `got message` plus what it heard |
| `chat-server.js` | Handling Multiple WebSockets | Forwards every message to every open connection |

`connect-page/`, `echo-page/`, and `chat-page/` hold the page each server
serves. Open the chat page in two or more windows at once to watch one
message land everywhere.
