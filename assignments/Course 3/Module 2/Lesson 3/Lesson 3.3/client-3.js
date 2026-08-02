// Connect to the WebSocket server (already set up for you). The address is
// built from the page's own address, so the connection works whether the page
// was served over http:// or https://. A page on https:// must use wss://,
// the secure form of ws://.
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
const userCount = document.querySelector('#user-count');

// The submit handler below is already written for you: it sends the message
// text through the WebSocket and clears the input (the same pattern you built
// in the previous problem). You do not need to change it.
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ws.send(messageInput.value);
    messageInput.value = '';
});

/**
 * TODO: Render everything the server broadcasts.
 * 1. Parse messageText(event) with JSON.parse().
 * 2. If the message's type is 'count', set userCount's textContent to
 *    'Users online: ' followed by the count.
 * 3. If the message's type is 'chat', create an 'li', set its textContent to
 *    the message's text, and append it to chatBox.
 */
ws.addEventListener('message', (event) => {
    // WRITE YOUR CODE HERE
});
