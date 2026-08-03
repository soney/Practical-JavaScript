// ShareDB demo, stage 3: the counter client again, now logging every
// operation that is applied to the document. Watch the browser console
// while you click.

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
// #endregion

// #region ops
doc.on('before op', (ops) => {
  // 'before op' fires before doc.data is updated, so this logs the
  // value the operation is about to change.
  console.log('before op: numClicks is ' + doc.data.numClicks);
});

doc.on('op', (ops) => {
  // By the time 'op' fires, doc.data already holds the new value.
  console.log(ops);
  console.log('op: numClicks is ' + doc.data.numClicks);

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
