// ShareDB demo, stage 5: the client connects the Quill editor to a shared
// rich-text document. Changes travel both ways, and each direction ignores
// its own echo.

// #region imports
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import richText from 'rich-text';
// #endregion

// #region register
// The client registers the rich-text type too: it has to apply and
// transform the same operations the server does.
sharedb.types.register(richText.type);
// #endregion

// `quill` is a global here, created by the script tag in index.html.
// (If Quill were bundled instead of loaded from the CDN, this file would
// `import Quill from 'quill'` and create the editor itself.)

// #region connect
// Connect to whatever host served this page, not to localhost, and over the
// secure wss:// scheme if the page itself arrived over https://.
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socket = new ReconnectingWebSocket(
  wsProtocol + '//' + window.location.host + window.location.pathname
);
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'richtext');
// #endregion

// #region subscribe
doc.subscribe((error) => {
  if (error) {
    throw error;
  }

  quill.setContents(doc.data);
  quill.enable();

  // #region incoming
  doc.on('op', (op, source) => {
    if (source === quill) {
      // A local change; the editor already shows it.
      return;
    }

    quill.updateContents(op);
  });
  // #endregion
});
// #endregion

// #region outgoing
quill.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user') {
    doc.submitOp(delta, { source: quill });
  }
});
// #endregion
