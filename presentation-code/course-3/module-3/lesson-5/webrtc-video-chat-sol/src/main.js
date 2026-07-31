const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startButton = document.getElementById("startButton");

let localStream;
let peerConnection;

// Determine the domain we are currently hosted on
const hostname = window.location.hostname;
// Assuming the signaling server runs on port 8080 of the same machine
const signalingServerUrl = `wss://${hostname}:8080`;
const ws = new WebSocket(signalingServerUrl);

// STUN servers help peers find their public IP addresses
const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
  ],
};

ws.onopen = () => {
  console.log("Connected to signaling server");
  // Enable start button once we are connected to signaling
  startButton.disabled = false;
};

// Handle messages from the signaling server
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

startButton.onclick = async () => {
  console.log("Starting call...");
  startButton.disabled = true; // Prevent multiple clicks
  await createPeerConnection();

  // Create an offer and send it
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("Sending offer to peer...");
  ws.send(JSON.stringify({ type: "offer", offer: offer }));
};

async function getMedia() {
  try {
    // Request webcam and mic
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;
    console.log("Local stream acquired");
  } catch (err) {
    console.error("Error accessing media devices.", err);
    alert("Could not access camera/microphone");
  }
}

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

  // When remote stream arrives, show it in the remoteVideo element
  peerConnection.ontrack = (event) => {
    console.log("Received remote track");
    remoteVideo.srcObject = event.streams[0];
  };

  // Add our local stream tracks to the connection
  if (!localStream) {
    await getMedia();
  }

  localStream.getTracks().forEach((track) => {
    console.log(track);
    peerConnection.addTrack(track, localStream);
  });
}



// Start capturing video as soon as the page loads
getMedia();
