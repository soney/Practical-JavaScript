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

// SOLUTION: render count and chat broadcasts
ws.addEventListener('message', (event) => {
    const message = JSON.parse(messageText(event));

    if (message.type === 'count') {
        userCount.textContent = 'Users online: ' + message.count;
    } else if (message.type === 'chat') {
        const item = document.createElement('li');
        item.textContent = message.text;
        chatBox.append(item);
    }
});
