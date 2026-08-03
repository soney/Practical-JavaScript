# ShareDB demos

Five runnable projects, one per reading in this lesson. Each is the project
from its video, one step further along than the one before it:

| Folder | Reading | What it does |
| --- | --- | --- |
| `01-server/` | Setting Up an OT Server with ShareDB | Opens a ShareDB connection and logs it; nothing shared yet |
| `02-docs/` | Creating ShareDB Docs | A counter every open browser shares |
| `03-ot-types/` | ShareDB OT Types | The counter, logging each operation as it happens |
| `04-todo/` | Synchronizing JSON Data | A to-do list every open browser shares |
| `05-richtext/` | Synchronizing Text Editors | A Google Docs-style collaborative text editor |

## Setup, once

The projects share one `package.json`, so one install covers all five. Open a
terminal (Terminal > New Terminal), move into this folder, and run:

    cd "sharedb-demo"
    npm install

## Running a project

Each project's browser code has to be bundled before the first run, because
`client.js` imports libraries. From inside the project's folder, `npx webpack`
builds it into `dist/`, and `node server.js` serves it:

    cd "01-server"
    npx webpack
    node server.js

Then visit <http://localhost:8000> **in two browser windows side by side**.
Watching both windows change at the same moment is the whole point; one window
cannot show you synchronization.

Every server listens on port 8000, so run **one at a time**: stop the current
one with Ctrl+C before starting the next, or you will see `EADDRINUSE`.
(`node server.js` also works from this folder as `node 01-server/server.js`;
`npx webpack` has to run inside the project folder.)

You only need `npx webpack` again after editing something under `src/`. While
experimenting, `npx webpack --watch` in a second terminal rebuilds on every
save, which is what the videos do.

Two things to know:

- ShareDB is keeping the shared documents **in memory**, so stopping a server
  wipes them. Refreshing a browser does not.
- `05-richtext/` loads the Quill editor from a CDN, so that page needs a
  network connection. The other four run entirely locally.
