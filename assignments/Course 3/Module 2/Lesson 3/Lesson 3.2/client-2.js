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

/**
 * PART 1: The "Don't Refresh" UI Handler
 * TODO: 
 * 1. Add a 'submit' event listener to chatForm.
 * 2. Prevent the default form behavior.
 * 3. Extract the value from messageInput.
 * 4. Use ws.send() to transmit the message.
 * 5. Clear the input field.
 */
chatForm.addEventListener('submit', (e) => {
    // WRITE YOUR CODE HERE
});


/**
 * PART 2: The Dynamic List Builder
 * TODO:
 * 1. Listen for the 'message' event on the 'ws' object.
 * 2. Create a new 'li' element.
 * 3. Set the 'textContent' of the 'li' to messageText(event), the text the
 *    server sent.
 * 4. Append the 'li' to the chatBox.
 */
ws.addEventListener('message', (event) => {
    // WRITE YOUR CODE HERE
});