// WebRTC demo, stage 1: one client's side of the WebRTC handshake.
// Reading: "Peer-to-peer Connections with WebRTC"
//
// Both browser windows run this same code. Click Connect in ONE window: it
// sends an offer through the signaling server, the other window answers,
// and each side ends up holding a description of itself and a description
// of the other. Watch the console in both windows while it happens.

// #region setup
// The signaling channel: a WebSocket to whatever host served this page,
// secure if the page itself arrived over https://.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(wsProtocol + '//' + location.host + location.pathname);

ws.binaryType = 'arraybuffer';

const connectButton = document.querySelector('#connect-button');

// A STUN server helps a browser discover how it can be reached from
// outside its own network. Google runs a public one.
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

let peerConnection = null;
// #endregion

// #region enable
// No signaling channel, no handshake: the button stays disabled until the
// WebSocket to the signaling server is open.
ws.addEventListener('open', () => {
  connectButton.removeAttribute('disabled');
});
// #endregion

// #region offer
// Clicking Connect makes this side the caller.
connectButton.addEventListener('click', async () => {
  connectButton.setAttribute('disabled', 'true');

  createPeerConnection();

  const offer = await peerConnection.createOffer();

  await peerConnection.setLocalDescription(offer);

  console.log('Sending an offer to the signaling server');
  ws.send(JSON.stringify({ type: 'offer', offer: offer }));
});
// #endregion

// #region handle-messages
// Everything the signaling server forwards arrives here: offers, answers,
// and ICE candidates, each labeled with a type.
ws.addEventListener('message', async (messageEvent) => {
  const message = JSON.parse(typeof messageEvent.data === 'string'
    ? messageEvent.data
    : new TextDecoder().decode(messageEvent.data));

  if (message.type === 'offer') {
    console.log('Received an offer; sending an answer back');

    if (!peerConnection) {
      createPeerConnection();
    }

    await peerConnection.setRemoteDescription(message.offer);

    const answer = await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(answer);

    ws.send(JSON.stringify({ type: 'answer', answer: answer }));
  } else if (message.type === 'answer') {
    console.log('Received an answer to our offer');

    await peerConnection.setRemoteDescription(message.answer);
  } else if (message.type === 'candidate') {
    console.log('Received an ICE candidate');

    await peerConnection.addIceCandidate(message.candidate);
  }
});
// #endregion

// #region create-peer-connection
// Each side builds its own RTCPeerConnection, pointed at the STUN server.
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  // The browser produces ICE candidates as it discovers routes to itself.
  // Forward each one through the signaling server to the other side.
  peerConnection.addEventListener('icecandidate', (iceEvent) => {
    if (iceEvent.candidate) {
      console.log('Sending an ICE candidate');
      ws.send(JSON.stringify({ type: 'candidate', candidate: iceEvent.candidate }));
    }
  });
}
// #endregion
