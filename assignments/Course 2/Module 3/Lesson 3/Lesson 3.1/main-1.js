// The loadUsers function below fetches users.json and shows how many users it
// contains, using .then(). Your task: rewrite loadUsers so it uses async and
// await instead of .then(). The behavior should stay exactly the same.

const result = document.querySelector('#result');

// TODO: rewrite loadUsers() below to use async/await (await fetch, await r.json()) instead of .then().
function loadUsers() {
  fetch('users.json')
    .then(r => r.json())
    .then(data => {
      result.textContent = 'This file lists ' + data.length + ' users.';
    });
}

loadUsers();
