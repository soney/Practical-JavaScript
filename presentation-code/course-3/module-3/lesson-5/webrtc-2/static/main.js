const signalingServerUrl = `ws://${window.location.host}`;
const ws = new WebSocket(signalingServerUrl);

const connectBtn = document.querySelector("#connectBtn");

// STUN servers help peers find their public IP addresses
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
  ],
};

ws.onopen = () => {
  connectBtn.removeAttribute("disabled");
};
ws.onmessage = async (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "offer") {
    if (!peerConnection) {
      await createPeerConnection();
    }
    await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));

    // Create an answer and send it back
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    ws.send(JSON.stringify({ type: "answer", answer: answer }));
  } else if (message.type === "answer") {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
  } else if (message.type === "candidate") {
    try {
      await peerConnection.addIceCandidate(message.candidate);
    } catch (e) {
      console.error("Error adding received ice candidate", e);
    }
  }
};

connectBtn.addEventListener("click", async () => {
  connectBtn.setAttribute("disabled", "true");
  await createPeerConnection();

  // Create an offer and send it
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("Sending offer to peer...");
  ws.send(JSON.stringify({ type: "offer", offer: offer }));
});

async function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);

  // Send any ICE candidates to the other peer via signaling server
  peerConnection.onicecandidate = (event) => {
    console.log("ICE candidate:", event.candidate);
    if (event.candidate) {
      console.log("Sending ICE candidate...");
      ws.send(
        JSON.stringify({ type: "candidate", candidate: event.candidate }),
      );
    }
  };
}