// ShareDB demo, stage 1: the client opens a connection and stops there.
// webpack bundles this file, plus the libraries it imports, into dist/main.js.

// #region imports
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
// #endregion

// #region connect
// Open a websocket connection back to whatever host served this page, using
// the secure wss:// scheme if the page itself arrived over https://.
const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new ReconnectingWebSocket(wsProtocol + '//' + location.host + location.pathname);
const connection = new sharedb.Connection(socket);

console.log(connection);
// #endregion
