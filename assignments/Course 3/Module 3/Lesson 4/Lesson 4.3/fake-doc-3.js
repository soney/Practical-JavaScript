// A stand-in for a ShareDB document. This file is provided for you; you do
// not need to change it.
//
// In a real collaborative app, doc would be a ShareDB document: calling
// doc.on('op', callback) registers a listener, and ShareDB fires that "op"
// event whenever another user edits the shared data. createFakeDoc returns an
// object with the same data and on() shape, plus a receiveRemoteOps() method
// that the "Simulate another user" buttons in main-3.js call to mimic a
// remote edit arriving, so you can focus on handling the operations.
function createFakeDoc(startingData) {
  const listeners = {};
  return {
    data: startingData,
    // Registers a listener, like a ShareDB doc: doc.on('op', callback)
    on(eventName, callback) {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName].push(callback);
    },
    // Applies each op to doc.data, then emits the "op" event with the op
    // list, exactly as a remote edit would arrive over the network.
    receiveRemoteOps(ops) {
      for (const op of ops) {
        if (op.li !== undefined) {
          this.data[op.p[0]].splice(op.p[1], 0, op.li);
        } else if (op.ld !== undefined) {
          this.data[op.p[0]].splice(op.p[1], 1);
        }
      }
      for (const callback of listeners['op'] || []) {
        callback(ops);
      }
    }
  };
}
