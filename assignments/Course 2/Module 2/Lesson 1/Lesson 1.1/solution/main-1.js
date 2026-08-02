// Get references to DOM elements
const button = document.querySelector('#startButton');
const display = document.querySelector('#timerDisplay');
const feedback = document.querySelector('#timerFeedback');

// Create the startTimer function
function startTimer() {
  // Set the timer display text
  display.textContent = 'Timer started! Wait 5 seconds...';

  // Clear any previous feedback
  feedback.textContent = '';

  // Disable the button
  button.disabled = true;

  // Create the onTimerComplete callback function
  function onTimerComplete() {
    // Update the display
    display.textContent = "Time's up!";

    // Set the feedback message
    feedback.textContent = 'The 5-second countdown is complete!';

    // Re-enable the button
    button.disabled = false;
  }

  // Use setTimeout to call onTimerComplete after 5000 milliseconds
  setTimeout(onTimerComplete, 5000);
}

// Add event listener to the button
button.addEventListener('click', startTimer);
