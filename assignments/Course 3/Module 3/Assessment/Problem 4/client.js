// The address is built from the page's own address, so the connection works
// whether the page was served over http:// or https://. A page on https://
// must use wss://, the secure form of ws://.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new WebSocket(`${wsProtocol}//${location.host}${location.pathname}`);
let pollData = null;

// A WebSocket message can arrive as text or as binary data, and some networks
// forward text as binary, so decode it back to text either way.
socket.binaryType = 'arraybuffer';

function messageText(event) {
  return typeof event.data === 'string'
    ? event.data
    : new TextDecoder().decode(event.data);
}

// Already written for you: whenever the server sends new poll state, save it
// and re-render. You do not need to change this listener.
socket.addEventListener('message', (event) => {
  const message = JSON.parse(messageText(event));
  if (message.type !== 'state') return;

  pollData = message.poll;
  renderPoll();
});

function renderPoll() {
  // TODO: (1) Put pollData.question into the #question element.
  // TODO: (2) Empty #poll-results, then add one .option row for each entry in
  //           pollData.options. Each row needs:
  //             - the option label (JavaScript, Python, or Rust),
  //             - a <span> whose id is `votes-0`, `votes-1`, or `votes-2`
  //               showing that option's vote count,
  //             - a Vote button that calls vote(index).
}

// TODO: Define a regular function named vote(index) that sends
//       JSON.stringify({ type: 'vote', index }) through the socket.
