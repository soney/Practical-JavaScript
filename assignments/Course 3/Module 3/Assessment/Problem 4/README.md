# Problem 4: WebSockets for a Live Poll

Edit `Problem 4/server.js` and `Problem 4/client.js`:

Build a real-time poll where every connected browser shows the same vote counts. The page uses a plain `http` server plus the `ws` WebSocket package. Most of the WebSocket wiring is already written for you on both the server and the client - you fill in the two pieces that make a vote count and show up.

**Setup:** the `ws` package is already installed in the course lab. If you are working on your own computer, run `npm install ws` in the `Problem 4` folder first, then start the server with `node server.js`.

The poll state lives in memory on the server and starts like this:

```javascript
{
  question: "What is your favorite programming language?",
  options: [
    { label: "JavaScript", votes: 0 },
    { label: "Python", votes: 0 },
    { label: "Rust", votes: 0 }
  ]
}
```

## Already written for you

`server.js` already:

- serves `index.html` and `client.js` over HTTP (and returns `404` for anything else),
- creates the WebSocket server with `new WebSocket.Server({ server })`,
- provides a `broadcast(message)` helper that sends `message` to every open client,
- sends the current poll to each browser as soon as it connects,
- parses every incoming WebSocket message with `JSON.parse(rawData.toString())`.

`client.js` already:

- opens the WebSocket connection, building its address from the page's own address so it works whether the page was served over `http://` or `https://` (a page on `https://` must use `wss://`, the secure form of `ws://`),
- provides a `messageText(event)` helper, because a WebSocket message can arrive as text or as binary data and some networks forward text as binary,
- listens for messages, keeps only the `state` messages, stores `message.poll` in `pollData`, and calls `renderPoll()`.

## Your job

In `server.js`, inside the `socket.on('message', ...)` handler, handle a vote:

1. If `message.type` is not `'vote'`, ignore the message.
2. Look up `poll.options[message.index]`. If there is no option at that index, ignore the message.
3. Add `1` to that option's `votes`.
4. Call `broadcast({ type: 'state', poll })` so every open browser gets the new counts.

Because `poll` stays in memory while the server runs, a page reload will show the latest counts automatically - you do not need to write anything extra for that.

In `client.js`:

1. Finish `renderPoll()`:
   - put `pollData.question` into the `#question` element,
   - empty `#poll-results`, then add one `.option` row for each option in `pollData.options`,
   - each row must show the option label (`JavaScript`, `Python`, or `Rust`), a vote-count `<span>` whose id is `votes-0`, `votes-1`, or `votes-2`, and a `Vote` button.
2. Define a regular function named `vote(index)` that sends `JSON.stringify({ type: 'vote', index })` through the socket. The `Vote` buttons call this function when they are clicked.

---

Course 3, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/FRlxO/module-3-graded-assignment) - `Problem 4`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
