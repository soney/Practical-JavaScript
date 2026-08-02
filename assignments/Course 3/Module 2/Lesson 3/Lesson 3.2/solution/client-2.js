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

// SOLUTION: send on submit, and render each broadcast as a list item
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = messageInput.value;
    
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(val);
        messageInput.value = '';
    } else {
        ws.addEventListener('open', () => ws.send(val), { once: true });
        messageInput.value = '';
    }
});

ws.addEventListener('message', (event) => {
    const li = document.createElement('li');
    // Using textContent is another layer of sanitization (prevents HTML injection)
    li.textContent = messageText(event);
    chatBox.appendChild(li);
    chatBox.scrollTop = chatBox.scrollHeight;
});
