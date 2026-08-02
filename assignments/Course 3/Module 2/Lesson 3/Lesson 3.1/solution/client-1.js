// Connect to the WebSocket server that is already running for you (server.js).
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

// SOLUTION Part 1: send the typed message to the server on submit.
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // keep the page (and the WebSocket connection) alive

    const message = messageInput.value;

    // Send now if the connection is open; otherwise send once it opens.
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        ws.addEventListener('open', () => ws.send(message), { once: true });
    }

    messageInput.value = ''; // clear the input for the next message
});

// SOLUTION Part 2: display each message the server sends back.
ws.addEventListener('message', (event) => {
    const li = document.createElement('li');
    li.textContent = messageText(event);
    chatBox.appendChild(li);

    chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll to the newest message
});
