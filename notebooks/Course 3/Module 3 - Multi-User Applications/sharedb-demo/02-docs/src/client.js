// ShareDB demo, stage 2: the client renders the shared counter and
// submits an operation when the button is pressed.

// #region imports
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
// #endregion

// #region refs
const incrementButton = document.querySelector('button#increment');
const clickCountEl = document.querySelector('#click-count');

clickCountEl.innerText = '...loading...';
// #endregion

// #region connect
// Open a websocket connection back to whatever host served this page.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new ReconnectingWebSocket(wsProtocol + '//' + location.host + location.pathname);
const connection = new sharedb.Connection(socket);
// #endregion

// #region doc
const doc = connection.get('examples', 'counter');

doc.subscribe((error) => {
  if (error) {
    throw error;
  }

  updateCounter();
});

doc.on('op', () => {
  updateCounter();
});
// #endregion

// #region render
function updateCounter() {
  clickCountEl.innerText = doc.data.numClicks;
}
// #endregion

// #region submit
incrementButton.addEventListener('click', () => {
  doc.submitOp([
    { p: ['numClicks'], na: 1 }
  ]);
});
// #endregion
