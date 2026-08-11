# In-codespace grading

This folder makes the Submit button work with no server anywhere: grading
runs inside the codespace, with the real course autograder.

- `grader-bundle.enc` - the course's grading engine, test specs, and maps
  (the exact bundle Coursera grades with), encrypted. `grader-bundle.json`
  records its version and hashes.
- `bundle-format.js` - the bundle's crypto format. The key is derived from
  constants in this public file, so the encryption is a courtesy curtain,
  not a vault: it keeps the test specs out of search results and casual
  browsing, the same way the practice solutions are kept out of the file
  tree. If you are a learner, reading the specs teaches you much less than
  making them pass - and Coursera grades its own copy either way.
- `setup-grader.js` - decrypts and installs the engine under
  `~/.pjs-grader` (run by post-create, re-checked by post-start).
- `grader-server.js` - a grading service on `127.0.0.1:8123` with the same
  API the course's hosted grader used; the companion extension submits to
  it (started by post-start).

If Submit reports the grader cannot be reached, run:

```
node .devcontainer/grader/setup-grader.js
nohup node .devcontainer/grader/grader-server.js >> ~/.pjs-grader/server.log 2>&1 &
```
