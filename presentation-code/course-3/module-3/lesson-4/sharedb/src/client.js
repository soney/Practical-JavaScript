// ... imports remain the same
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';

// open websocket connection
const socket = new ReconnectingWebSocket('ws://localhost:8000');
const connection = new sharedb.Connection(socket);

const doc = connection.get('examples', 'todo-list');

doc.subscribe((err) => {
    if (err) throw err;
});

doc.on('op', (ops) => {
});