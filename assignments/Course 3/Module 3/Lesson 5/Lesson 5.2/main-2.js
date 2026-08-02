// Practice turning on the camera for a video chat: request the camera and
// microphone with getUserMedia, show the stream in the video element, and
// handle the request being rejected.
//
// The grading environment has no camera, so the provided code below
// replaces navigator.mediaDevices.getUserMedia with a fake version that
// behaves like the real one: it returns a Promise for a stream. The real
// getUserMedia can still reject (for example, when the user denies
// permission), so your startCamera code has to handle that too. Your
// startCamera code would look identical with a real camera.

const localVideo = document.querySelector('#local-video');
const cameraStatus = document.querySelector('#camera-status');
const constraintsDisplay = document.querySelector('#constraints-display');

// setStatus shows progress text on the page. Already written.
function setStatus(text) {
  cameraStatus.textContent = text;
}

// ---------------------------------------------------------------------------
// Provided fake camera. Do not change this block.
// ---------------------------------------------------------------------------
const fakeCanvas = document.createElement('canvas');
fakeCanvas.width = 320;
fakeCanvas.height = 240;
const fakeContext = fakeCanvas.getContext('2d');
const fakeFrame = new Image();
fakeFrame.src = 'sample-webcam-out.png';
setInterval(() => {
  if (fakeFrame.complete && fakeFrame.naturalWidth > 0) {
    fakeContext.drawImage(fakeFrame, 0, 0, fakeCanvas.width, fakeCanvas.height);
  } else {
    fakeContext.fillStyle = '#222';
    fakeContext.fillRect(0, 0, fakeCanvas.width, fakeCanvas.height);
  }
}, 200);

navigator.mediaDevices.getUserMedia = async (constraints) => {
  constraintsDisplay.textContent = JSON.stringify(constraints);
  return fakeCanvas.captureStream(10);
};
// ---------------------------------------------------------------------------

// TODO: Complete startCamera. It must:
//   1. Show progress: setStatus('Requesting camera...');
//   2. In a try block:
//      - Ask for the camera and microphone (getUserMedia returns a
//        Promise, so await it):
//        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//      - Show the stream in the provided video element:
//        localVideo.srcObject = stream;
//      - Report success: setStatus('Camera on');
//   3. In the catch block (the user said no, or there is no camera):
//      - Report the failure: setStatus('Could not access the camera');
async function startCamera() {

}

// Provided wiring. Already written.
document.querySelector('#start-camera-btn').addEventListener('click', () => {
  startCamera();
});

setStatus('Camera off');
constraintsDisplay.textContent = '(getUserMedia has not been called yet)';
