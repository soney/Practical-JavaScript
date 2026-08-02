// Select the input field and the character count display
const inputField = document.querySelector('#username-field');
const display = document.querySelector('#char-count');

// Read the maxlength attribute (comes back as a string, e.g. "20") and convert it to a number
const maxChars = parseInt(inputField.getAttribute('maxlength'));

// Called every time the input changes: recalculate and show the remaining count
function updateRemainingCharacters() {
  const remaining = maxChars - inputField.value.length;
  display.textContent = `Remaining characters: ${remaining}`;
}

// Call updateRemainingCharacters whenever the user types in the input
inputField.addEventListener('input', updateRemainingCharacters);
