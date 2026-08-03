const button = document.querySelector('#greet');
const output = document.querySelector('#output');

button.addEventListener('click', () => {
  output.innerText = 'Hello from script.js, which the server sent as text/javascript.';
});
