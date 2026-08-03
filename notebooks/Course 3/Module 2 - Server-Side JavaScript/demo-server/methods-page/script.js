// Client-side code for the "Understanding HTTP Methods" demo page.
//
// This file runs in the browser, not in Node: methods-server.js sends it
// to the browser like any other file, and the browser runs it.

const output = document.querySelector('#output');

// #region send
function send(url, options) {
  let status;

  fetch(url, options)
    .then((response) => {
      status = response.status;
      return response.text();
    })
    .then((text) => {
      output.textContent = status + ' ' + text;
    });
}
// #endregion

// #region method-clicks
document.querySelector('#get-btn').addEventListener('click', () => {
  send('/something.txt');
});

document.querySelector('#post-btn').addEventListener('click', () => {
  send('/something.txt', { method: 'POST' });
});

document.querySelector('#put-btn').addEventListener('click', () => {
  send('/something.txt', { method: 'PUT' });
});

document.querySelector('#delete-btn').addEventListener('click', () => {
  send('/something.txt', { method: 'DELETE' });
});
// #endregion

// #region users-clicks
document.querySelector('#get-users-btn').addEventListener('click', () => {
  send('/users');
});

document.querySelector('#post-users-btn').addEventListener('click', () => {
  send('/users', { method: 'POST' });
});
// #endregion
