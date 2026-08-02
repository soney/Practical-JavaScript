// Edit this file.
//
// In Node, files can share code with the same import / export keywords you used
// in the browser. This project turns them on with "type": "module" in
// package.json.
//   - import name from './file.js' loads another file's default export.
//   - export default value makes a value available to other files.
//
// The provided file greeting.js (same directory) exports a greeting(name)
// function that returns 'Hello, NAME!'.

// TODO: (1) import the greeting function from greeting.js. Name it greeting so the
// existing makeWelcome function can call it.

// makeWelcome builds a longer welcome message from a name. It calls greeting()
// and adds a sentence after it.
function makeWelcome(name) {
  return greeting(name) + ' Welcome to Node.';
}

// TODO: (2) export makeWelcome as the default export so server.js can load it.
