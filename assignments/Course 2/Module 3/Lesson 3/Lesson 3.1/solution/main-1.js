// The loadUsers function below fetches users.json and shows how many users it
// contains, using .then(). Your task: rewrite loadUsers so it uses async and
// await instead of .then(). The behavior should stay exactly the same.

const result = document.querySelector('#result');

// SOLUTION: learner rewrites loadUsers using async/await (was .then())
async function loadUsers() {
  const response = await fetch('users.json');
  const data = await response.json();
  result.textContent = 'This file lists ' + data.length + ' users.';
}

loadUsers();
