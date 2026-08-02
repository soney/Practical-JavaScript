// ===== YOUR TASK =====
// A delay(ms) helper is provided below: it returns a Promise that resolves after
// `ms` milliseconds, so `await delay(1000)` pauses an async function for one
// second. Write an async function runSteps() that shows a series of messages in
// #message, waiting between them with `await delay(...)`, then call it.
// =====================

const message = document.querySelector('#message');

// Provided for you: returns a Promise that resolves after `ms` milliseconds.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: write an async function runSteps() that:
//   - sets message.textContent to 'Step 1 of 3...'
//   - awaits delay(1000), then sets message.textContent to 'Step 2 of 3...'
//   - awaits delay(1000), then sets message.textContent to 'All steps complete!'
// Then call runSteps() so it runs when the page loads.
