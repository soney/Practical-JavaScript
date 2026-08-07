# Problem 2: WebSocket Broadcasts for Safe Chat

Edit `Lesson 3.2/server.js` and `Lesson 3.2/client-2.js`:

- `Lesson 3.2/server.js`: broadcast each incoming WebSocket message to every connected client.
- `Lesson 3.2/client-2.js`: send form messages and render incoming messages safely.

**Setup:** the server uses the `ws` package. It is preinstalled in the course lab; if you are working on your own computer, run `npm install ws` in the `Lesson 3.2` folder first, then start the server with `node server.js`.

A chat server takes a message from one client and relays it to everyone connected. Messages received from clients may arrive as `Buffer` objects or `Blob` data instead of plain text, so the server converts each message to a string and caps its length before broadcasting it.

Finish the server-side `message` handler so it broadcasts each message, and make sure the browser displays each message safely.

1. Convert Incoming Data (provided for you)
    - The starter `server.js` already converts the incoming event data into a plain string and limits it to its first 200 characters, storing the result in a `message` variable. You do not need to change this part.

2. Broadcast the Message
    - Iterate through the connected clients and send `message` to every client whose `readyState` is open, including the original sender, so the sender sees their own message appear in the chat.

3. Render Messages Safely
    - In `client-2.js`, send the form value through the existing WebSocket when `#chat-form` is submitted.
    - Prevent the form from refreshing the page.
    - Clear `#message-input` after submitting.
    - When a message arrives, create an `<li>`, set its `textContent` to `messageText(event)`, and append it to `#chat-box`. The provided `messageText()` helper returns the text whether the message arrived as text or as binary data.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Real-Time Communication](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/nF7pb/practice-real-time-communication) - `Lesson 3.2`

The files here are the starter you get in the course. The finished `client-2.js` and `server.js` are in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%203/Lesson%203.2/solution); in the course codespace that folder is hidden so you can work the problem first.
