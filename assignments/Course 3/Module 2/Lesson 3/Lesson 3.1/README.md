# Problem 1: Sending and Receiving WebSocket Messages

Edit `Lesson 3.1/client-1.js`:

**Setup:** the WebSocket server is already written and running for you in `server.js`; you only edit `client-1.js`. If you are working on your own computer, run `npm install ws` in the `Lesson 3.1` folder once, then start the server with `node server.js` and open the address it prints.

A WebSocket keeps a two-way connection open between the browser and the server, so either side can send a message at any time. In this problem you talk to an existing chat server: you send the messages a user types, and you display the messages the server sends back. The server broadcasts every message it receives to all connected clients, so your own messages come back to you too.

The connection is already created for you at the top of `client-1.js`:

```js
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${wsProtocol}//${location.host}${location.pathname}`);
```

The address is built from the page's own address so the connection works no matter how the page was served. A page loaded over `http://` connects with `ws://`; a page loaded over `https://` has to connect with `wss://`, the secure form, because a secure page is not allowed to open an insecure connection.

A `messageText()` helper is also provided for you:

```js
function messageText(event) {
    return typeof event.data === 'string'
        ? event.data
        : new TextDecoder().decode(event.data);
}
```

A WebSocket message can arrive as text or as binary data, and some networks forward text as binary. `messageText(event)` gives you the text either way, so use it instead of reading `event.data` directly.

## Part 1: Send messages to the server

The `submit` event listener on the form with the ID `chat-form` is started for you, and steps 1 and 2 are already written. Finish steps 3 and 4:

1. (Provided) Prevents the browser's default form submission, so the page does not refresh. A refresh would close the WebSocket connection.
2. (Provided) Reads the value of the input with the ID `message-input` into a `message` variable.
3. Send `message` to the server with `ws.send(...)`.
4. Clear the `message-input` field.

## Part 2: Receive messages from the server

Handle the `message` event on `ws`. Each time a message arrives:

1. Read the message text with `messageText(event)`.
2. Create a new `<li>` element.
3. Set its `textContent` to the message text.
4. Append it to the list with the ID `chat-box`.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Real-Time Communication](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/nF7pb/practice-real-time-communication) - `Lesson 3.1`

The files here are the starter you get in the course. The finished `client-1.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%203/Lesson%203.1/solution); in the course codespace that folder is hidden so you can work the problem first.
