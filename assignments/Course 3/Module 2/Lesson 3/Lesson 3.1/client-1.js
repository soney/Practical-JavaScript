// Connect to the WebSocket server that is already running for you.
// (You do not edit or start the server yourself; it lives in server.js.)
// The address is built from the page's own address, so the connection works
// whether the page was served over http:// or https://. A page on https://
// must use wss://, the secure form of ws://.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${wsProtocol}//${location.host}${location.pathname}`);

// A WebSocket message can arrive as text or as binary data, and some networks
// forward text as binary. messageText() hands you the text either way, so read
// a message through it instead of using event.data directly.
ws.binaryType = 'arraybuffer';

function messageText(event) {
    return typeof event.data === 'string'
        ? event.data
        : new TextDecoder().decode(event.data);
}

const chatForm = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const chatBox = document.querySelector('#chat-box');

// PART 1: Send messages TO the server.
// Steps 1 and 2 are already written for you (preventDefault + reading the input).
// TODO: finish the listener:
//   3. Send `message` to the server with ws.send(...).
//   4. Clear messageInput.
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 1. Stop the refresh that would close the WebSocket connection.
    const message = messageInput.value; // 2. Read what the user typed.

    // WRITE YOUR CODE HERE
});

// PART 2: Receive messages FROM the server.
// The server broadcasts every chat message back to all connected clients.
// TODO: When a 'message' event arrives on ws:
//   1. Read the message text with messageText(event).
//   2. Create a new <li> element.
//   3. Set its textContent to the message text.
//   4. Append it to chatBox.
ws.addEventListener('message', (event) => {
    // WRITE YOUR CODE HERE
});
