const message = document.querySelector('#message');

// Provided for you: returns a Promise that resolves after `ms` milliseconds.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// SOLUTION: the learner writes runSteps below (delay is provided above)
async function runSteps() {
  message.textContent = 'Step 1 of 3...';
  await delay(1000);
  message.textContent = 'Step 2 of 3...';
  await delay(1000);
  message.textContent = 'All steps complete!';
}

runSteps();
