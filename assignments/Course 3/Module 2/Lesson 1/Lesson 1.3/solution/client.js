// This file runs in the browser.
// Fetch the current view count from the server and show it on the page.
fetch('/hits')
  .then((response) => response.text())
  .then((count) => {
    document.querySelector('#hit-count').textContent = count;
  });
