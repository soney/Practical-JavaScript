// 1. Select the Elements
const messageInput = document.querySelector('#message-input');
const charCount = document.querySelector('#char-count');

// 2. Create the updateCount Function
function updateCount(event) {
  // Access the length of the text currently in the textarea
  const currentLength = event.target.value.length;

  // Update the UI
  charCount.textContent = currentLength;
}

// 3. Add Event Listener
// We use 'input' instead of 'keydown' because 'input' catches
// deletions, pastes, and all text changes accurately.
messageInput.addEventListener('input', updateCount);
