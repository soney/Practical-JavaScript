// These references, the setBoxPosition helper, and the easing functions are provided for you.
const box = document.querySelector('#box');
const linearBtn = document.querySelector('#linearBtn');
const easeInBtn = document.querySelector('#easeInBtn');
const easeOutBtn = document.querySelector('#easeOutBtn');

// Moves the box to a horizontal position x (in pixels).
const setBoxPosition = (x) => {
  box.style.transform = `translateX(${x}px)`;
};

// Easing functions. Each takes a progress value t (from 0 to 1) and returns an
// adjusted progress value (also from 0 to 1).
const easings = {
  linear: (t) => t,          // constant speed
  easeIn: (t) => t * t,      // starts slow, speeds up
  easeOut: (t) => t * (2 - t), // starts fast, slows down
};

// TODO: fill in runAnimation so it animates the box to horizontal position toX
// over the given duration (in milliseconds), passing the progress through easing.
const runAnimation = (duration, toX, easing) => {
  // Write your code here.
};

// Each button animates the box to x = 450 over 2 seconds with a different easing.
linearBtn.addEventListener('click', () => runAnimation(2000, 450, easings.linear));
easeInBtn.addEventListener('click', () => runAnimation(2000, 450, easings.easeIn));
easeOutBtn.addEventListener('click', () => runAnimation(2000, 450, easings.easeOut));
