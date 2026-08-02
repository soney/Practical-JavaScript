// These references and the setBoxPosition function are provided for you.
const startBtn = document.querySelector('#startBtn');
const box = document.querySelector('#box');

// Moves the box to a horizontal position x (in pixels).
const setBoxPosition = (x) => {
  box.style.transform = `translateX(${x}px)`;
};

// TODO: fill in runAnimation so it animates the box to horizontal position
// toX over the given duration (in milliseconds).
const runAnimation = (duration, toX) => {
  // Write your code here.
};

// Provided for you: move the box to x = 450 over 2 seconds when the button is clicked.
startBtn.addEventListener('click', () => {
  runAnimation(2000, 450);
});
