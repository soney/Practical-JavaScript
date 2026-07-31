import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';

const incrementButton = document.querySelector("button#increment");
const clickCountEl = document.querySelector("#click-count");

clickCountEl.innerText = "...loading...";

// open websocket connection
const socket = new ReconnectingWebSocket('ws://localhost:8000');
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'counter');
doc.subscribe((err) => {
    if(err) {
        throw err;
    }
    updateCounter();
});

doc.on('op', () => {
    updateCounter();
});

function updateCounter() {
    clickCountEl.innerText = doc.data.numClicks;
}
incrementButton.addEventListener("click", () => {
    doc.submitOp([
        { p: ["numClicks"], na: 1 }
    ]);
});