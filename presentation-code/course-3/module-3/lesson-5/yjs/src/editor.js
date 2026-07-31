import Quill from "quill";
import * as Y from "yjs";
import {WebrtcProvider } from "y-webrtc"
import { QuillBinding } from "y-quill";

const quill = new Quill('#editor', {
    theme: 'snow'
  });

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("my-yjs-quill-room", ydoc);

const ytext = ydoc.getText("quill");

new QuillBinding(ytext, quill);