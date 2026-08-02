// ===== YOUR TASK =====
// Two loaders are provided below: loadProfile() returns a Promise for the user's
// name, and loadMessages() returns a Promise for a message count (each after a
// short delay). Write an async function loadDashboard() that loads them one
// stage at a time, updating #status as it goes, then call it.
// =====================

const status = document.querySelector('#status');

// Provided for you.
function loadProfile() {
  return new Promise((resolve) => setTimeout(() => resolve('Ada'), 1000));
}
function loadMessages() {
  return new Promise((resolve) => setTimeout(() => resolve(5), 1000));
}

// TODO: write an async function loadDashboard() that:
//   - sets status.textContent to 'Loading profile...'
//   - awaits loadProfile() and stores the returned name
//   - sets status.textContent to 'Welcome, ' + name + '! Loading messages...'
//   - awaits loadMessages() and stores the returned count
//   - sets status.textContent to 'Welcome, ' + name + '! You have ' + count + ' new messages.'
// Then call loadDashboard() so it runs when the page loads.
