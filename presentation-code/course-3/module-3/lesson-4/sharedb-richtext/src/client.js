// ... imports remain the same
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';
import richText from 'rich-text';

sharedb.types.register(richText.type);

// open websocket connection
const socket = new ReconnectingWebSocket('ws://' + window.location.host);
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'richtext');

doc.subscribe((err) => {
    if(err) throw err;

    quill.setContents(doc.data);
    quill.enable();

    doc.on('op', (op, source) => {
        if(source === quill) { // local change
            return;
        } else {
            quill.updateContents(op);
        }
    });
})

quill.on('text-change', (delta, oldDelta, source) => {
    if(source === 'user') {
        doc.submitOp(delta, {source: quill});
    }
});