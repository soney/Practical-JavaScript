// 1. Select the elements
const button = document.querySelector('#start-log-btn');
const tickList = document.querySelector('#tick-list');

// 2. Create the startLogging function
function startLogging() {
  // Disable the button while the timer runs
  button.disabled = true;

  let count = 0;

  // Every second, append a new tick to the list
  const intervalId = setInterval(function() {
    count = count + 1;

    const item = document.createElement('li');
    item.textContent = 'Tick ' + count;
    tickList.append(item);

    // After 5 ticks, stop the interval and re-enable the button
    if (count === 5) {
      clearInterval(intervalId);
      button.disabled = false;
    }
  }, 1000);
}

// 3. Run startLogging when the button is clicked
button.addEventListener('click', startLogging);
