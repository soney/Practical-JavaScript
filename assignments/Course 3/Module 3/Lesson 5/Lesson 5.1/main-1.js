// Practice the first steps of a WebRTC call: create an offer, save it as
// the local description, and send it to the signaling server.
//
// A real RTCPeerConnection needs another browser to talk to, so this page
// provides a mock connection and a mock signaling server that behave the
// same way. Your startCall function would look identical with the real
// thing.

// The mock peer connection. Already written: createOffer() returns a
// Promise for an offer object { type, sdp }, and setLocalDescription(...)
// stores what you pass it, like the real API.
function createMockPeerConnection() {
  return {
    localDescription: null,
    async createOffer() {
      return { type: 'offer', sdp: 'mock-sdp-' + Math.random().toString(36).slice(2, 8) };
    },
    async setLocalDescription(description) {
      this.localDescription = description;
    }
  };
}

const peerConnection = createMockPeerConnection();

// The mock signaling server. Already written: signaling.send(message)
// records the message in the list on the page. In a real app this would
// send the message over a WebSocket.
const signalLog = document.querySelector('#signal-log');
const signaling = {
  send(message) {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(message);
    signalLog.append(li);
  }
};

// setStatus shows progress text on the page. Already written.
const callStatus = document.querySelector('#call-status');
function setStatus(text) {
  callStatus.textContent = text;
}

// TODO: Complete startCall. It must, in order:
//   1. Show progress: setStatus('Creating offer...');
//   2. Create the offer (createOffer returns a Promise, so await it):
//      const offer = await peerConnection.createOffer();
//   3. Save it as this side's local description:
//      await peerConnection.setLocalDescription(offer);
//   4. Send it to the other person through the signaling server:
//      signaling.send({ type: 'offer', sdp: offer.sdp });
//   5. Show the result: setStatus('Offer sent. Waiting for an answer...');
async function startCall() {

}

// Provided wiring. After startCall finishes, this shows the connection's
// local description so you can check your work.
const localDescDisplay = document.querySelector('#local-desc');
document.querySelector('#start-call-btn').addEventListener('click', async () => {
  await startCall();
  localDescDisplay.textContent = peerConnection.localDescription
    ? JSON.stringify(peerConnection.localDescription)
    : '(no local description set)';
});

setStatus('Ready to call.');
localDescDisplay.textContent = '(no local description set)';
