# WebRTC and Yjs demos

Three runnable projects, one per reading in this lesson. Each is the project
from its video:

| Folder | Reading | What it does |
| --- | --- | --- |
| `01-connection/` | Peer-to-peer Connections with WebRTC | Two browsers arrange a direct connection through a signaling server |
| `02-video-chat/` | Peer-to-Peer Video Chat with WebRTC | A live video call between two browser windows |
| `03-shared-editor/` | Conflict-Free Replicated Data Types (CRDTs) and Yjs | A collaborative editor with no server-side application code |

## Setup, once

The projects share one `package.json`, so one install covers all three. Open
a terminal (Terminal > New Terminal), move into this folder, and run:

    cd "p2p-demo"
    npm install

## Running the WebRTC projects

Start the signaling server and open the page **in two browser windows side
by side**. One window cannot show you a connection between two peers:

    node 01-connection/server.js

Then visit <http://localhost:3000> in both windows, open the browser console
in both (right-click > Inspect > Console), and click **Connect** in ONE of
them. The consoles show the offer, the answer, and any ICE candidates
crossing; whichever window you click is the caller, and the other answers on
its own.

`02-video-chat/` runs the same way:

    node 02-video-chat/server.js

Each window asks for **camera and microphone permission** as soon as it
loads; allow it in both. Click **Start Call** in ONE window and both videos
appear in both windows. Your own video is muted on purpose, so your
microphone does not feed back through your speakers. If the second window
cannot open the camera (some systems give it to one program at a time), use
a different browser for one of the windows.

## Running the shared editor

`03-shared-editor/` bundles its libraries with webpack, as in the video. The
built page is already in `dist/`, so it runs immediately; run `npx webpack`
(inside `03-shared-editor/`) again only after editing something under
`src/`:

    cd "03-shared-editor"
    node server.js

Then visit <http://localhost:3000> in two windows and type. Once both pages
have loaded you can even stop the server with Ctrl+C and keep typing: the
document lives in the browsers, not on the server.

Every server listens on port 3000, so run **one at a time**: stop the
current one with Ctrl+C before starting the next, or you will see
`EADDRINUSE`.

Three network notes:

- `01-connection/` and `02-video-chat/` name Google's public STUN server, so
  a browser can learn how to reach it from outside. Two windows on the same
  computer can usually connect even without it.
- `03-shared-editor/` loads Quill's stylesheet from a CDN and finds peers
  through the Yjs project's public signaling servers, so it expects a
  network connection. Two windows on the same computer find each other even
  when those servers are unreachable.
- Nothing you type or send travels through `server.js` in any of the three:
  after setup, the traffic is browser to browser.
