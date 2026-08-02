// Capture the timestamp when the page loads
const pageLoadTime = Date.now();

// Update the timer to show how many whole seconds have passed
function updateDisplay() {
    // Calculate elapsed time in milliseconds
    const timePassed = Date.now() - pageLoadTime;

    // Convert to seconds and round to the nearest integer
    const secondsPassed = Math.round(timePassed / 1000);

    // Update the timer element with the new value
    const timerElement = document.querySelector('#timer');
    if (timerElement) {
        timerElement.textContent = secondsPassed;
    }
}

// Show 0 right away, then update once per second with setInterval
updateDisplay();
setInterval(updateDisplay, 1000);
