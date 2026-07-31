import Quill from "quill";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import { WebrtcProvider } from "y-webrtc";

const quill = new Quill(document.querySelector("#editor"), {
  modules: {
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  placeholder: "Start collaborating...",
  theme: "snow", // 'bubble' is also great
});

// A Yjs document holds the shared data
const ydoc = new Y.Doc();

// Connect to a common room over WebRTC
const provider = new WebrtcProvider("my-yjs-quill-room", ydoc);

// Define a shared text type on the document
const ytext = ydoc.getText("quill");

// Bind the quill editor to the Yjs text type
new QuillBinding(ytext, quill);
