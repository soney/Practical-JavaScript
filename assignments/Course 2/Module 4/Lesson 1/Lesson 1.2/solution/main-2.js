// These references and the setBoxPosition function are provided for you.
const startBtn = document.querySelector('#startBtn');
const box = document.querySelector('#box');

// Moves the box to a horizontal position x (in pixels).
const setBoxPosition = (x) => {
  box.style.transform = `translateX(${x}px)`;
};

// Animate the box to horizontal position toX over the given duration.
const runAnimation = (duration, toX) => {
  // SOLUTION: learner fills in the runAnimation body below
  const animationStarted = Date.now();

  const step = () => {
    // How far through the animation we are, from 0 to 1.
    const pct = (Date.now() - animationStarted) / duration;

    if (pct < 1) {
      setBoxPosition(pct * toX);
      requestAnimationFrame(step);
    } else {
      // Animation finished: snap to the final position.
      setBoxPosition(toX);
    }
  };

  requestAnimationFrame(step);
};

// Provided for you: move the box to x = 450 over 2 seconds when the button is clicked.
startBtn.addEventListener('click', () => {
  runAnimation(2000, 450);
});
