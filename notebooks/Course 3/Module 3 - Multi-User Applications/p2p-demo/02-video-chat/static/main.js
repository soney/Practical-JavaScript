// WebRTC demo, stage 2: the connection from stage 1, now carrying a video
// call.
// Reading: "Peer-to-Peer Video Chat with WebRTC"
//
// Both windows run this code. The page asks for the camera and microphone
// as soon as it loads, so you can see yourself before any call starts.
// Click Start Call in ONE window; the other side answers on its own.

// #region setup
// The signaling channel, secure if the page itself arrived over https://.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(wsProtocol + '//' + location.host + location.pathname);

ws.binaryType = 'arraybuffer';

const startButton = document.querySelector('#start-button');
const localVideo = document.querySelector('#local-video');
const remoteVideo = document.querySelector('#remote-video');

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

let localStream = null;
let peerConnection = null;
// #endregion

// #region get-media
// Ask the user for the camera and microphone. Asking can fail for
// ordinary reasons (the user clicks Don't Allow, there is no camera, some
// other program has it), which is what the try/catch is for.
async function getMedia() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    localVideo.srcObject = localStream;
  } catch (error) {
    console.log('Could not access the camera or microphone: ' + error);
  }
}
// #endregion

// #region enable
ws.addEventListener('open', () => {
  startButton.removeAttribute('disabled');
});
// #endregion

// #region handle-messages
// The handshake from stage 1, unchanged. Adding video did not change it.
ws.addEventListener('message', async (messageEvent) => {
  const message = JSON.parse(typeof messageEvent.data === 'string'
    ? messageEvent.data
    : new TextDecoder().decode(messageEvent.data));

  if (message.type === 'offer') {
    console.log('Received an offer; sending an answer back');

    if (!peerConnection) {
      await createPeerConnection();
    }

    await peerConnection.setRemoteDescription(message.offer);

    const answer = await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(answer);

    ws.send(JSON.stringify({ type: 'answer', answer: answer }));
  } else if (message.type === 'answer') {
    console.log('Received an answer to our offer');

    await peerConnection.setRemoteDescription(message.answer);
  } else if (message.type === 'candidate') {
    await peerConnection.addIceCandidate(message.candidate);
  }
});
// #endregion

// #region start-call
// Clicking Start Call makes this side the caller, exactly as clicking
// Connect did in stage 1.
startButton.addEventListener('click', async () => {
  startButton.setAttribute('disabled', 'true');

  await createPeerConnection();

  const offer = await peerConnection.createOffer();

  await peerConnection.setLocalDescription(offer);

  console.log('Sending an offer to the signaling server');
  ws.send(JSON.stringify({ type: 'offer', offer: offer }));
});
// #endregion

// #region create-peer-connection
async function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  peerConnection.addEventListener('icecandidate', (iceEvent) => {
    if (iceEvent.candidate) {
      ws.send(JSON.stringify({ type: 'candidate', candidate: iceEvent.candidate }));
    }
  });

  // #region receive-tracks
  // Media arriving from the other side: point the second video at it.
  peerConnection.addEventListener('track', (trackEvent) => {
    remoteVideo.srcObject = trackEvent.streams[0];
  });
  // #endregion

  // #region send-tracks
  // Send our own camera and microphone. If this window is the one being
  // called, the user may not have answered the permission prompt yet, so
  // ask again and wait here.
  if (!localStream) {
    await getMedia();
  }

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }
  // #endregion
}
// #endregion

// #region on-load
// Runs when the page loads: the permission prompt appears right away, and
// you can see yourself before calling anybody.
getMedia();
// #endregion
