// The counter and its buttons are provided for you. Your job is to make the
// count persist across page reloads using localStorage.

const countDisplay = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');
const resetBtn = document.querySelector('#reset');

// The current count.
let count = 0;

// TODO: (1) When the page loads, read the saved count from localStorage (use the
// key "count") and use it as the starting value. If nothing is saved yet, keep 0.

function updateDisplay() {
  countDisplay.textContent = count;

  // TODO: (2) Save the current count to localStorage (key "count") so it survives a reload.
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
