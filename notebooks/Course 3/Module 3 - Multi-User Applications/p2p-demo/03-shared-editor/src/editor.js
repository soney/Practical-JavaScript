// Yjs demo: a collaborative editor with no server-side application code.
// Reading: "Conflict-Free Replicated Data Types (CRDTs) and Yjs"
//
// Five pieces: a Quill editor, a Yjs document, a provider that connects
// the document to every peer in the same room over WebRTC, a shared text
// inside the document, and a binding that ties the text to the editor.

// #region imports
import Quill from 'quill';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';
// #endregion

// #region editor
// The editor, from Quill's own quick-start code.
const quill = new Quill('#editor', {
  theme: 'snow'
});
// #endregion

// #region ydoc
// The shared document. Every peer holds its own full copy.
const ydoc = new Y.Doc();

// Anyone who uses the same room name shares the document. This one line
// does the whole WebRTC arrangement from the last two readings.
const provider = new WebrtcProvider('my-yjs-quill-room', ydoc);
// #endregion

// #region binding
// A shared text inside the document, stored under the name 'quill'.
const ytext = ydoc.getText('quill');

// Tie the shared text to the editor, in both directions.
new QuillBinding(ytext, quill);
// #endregion
