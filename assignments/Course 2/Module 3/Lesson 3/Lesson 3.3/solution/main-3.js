const status = document.querySelector('#status');

// Provided for you.
function loadProfile() {
  return new Promise((resolve) => setTimeout(() => resolve('Ada'), 1000));
}
function loadMessages() {
  return new Promise((resolve) => setTimeout(() => resolve(5), 1000));
}

// SOLUTION: the learner writes loadDashboard below (the loaders are provided above)
async function loadDashboard() {
  status.textContent = 'Loading profile...';
  const name = await loadProfile();
  status.textContent = 'Welcome, ' + name + '! Loading messages...';
  const count = await loadMessages();
  status.textContent = 'Welcome, ' + name + '! You have ' + count + ' new messages.';
}

loadDashboard();
