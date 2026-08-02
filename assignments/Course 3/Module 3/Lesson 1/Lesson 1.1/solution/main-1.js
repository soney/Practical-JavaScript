// The counter and its buttons are provided for you. Your job is to make the
// count persist across page reloads using localStorage.

const countDisplay = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');
const resetBtn = document.querySelector('#reset');

// SOLUTION: load the saved count on start; save it on every update (below)
// Read the saved count from localStorage, or start at 0 if nothing is saved yet.
let count = Number(localStorage.getItem('count')) || 0;

function updateDisplay() {
  countDisplay.textContent = count;

  // Save the current count so it survives a page reload.
  localStorage.setItem('count', count);
}

incrementBtn.addEventListener('click', () => {
  count = count + 1;
  updateDisplay();
});

decrementBtn.addEventListener('click', () => {
  count = count - 1;
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

updateDisplay();
