// Set the secret word
const secretWord = 'javascript';

// Get references to DOM elements
const input = document.querySelector('#guessInput');
const button = document.querySelector('#guessButton');
const feedback = document.querySelector('#feedback');
const body = document.body;

// Add click event listener to the button
button.addEventListener('click', function() {
  // Get the user's guess and convert to lowercase
  const guess = input.value.toLowerCase();

  // Check if the guess is correct
  if (guess === secretWord) {
    // Correct guess
    feedback.textContent = 'Correct! You guessed it!';
    body.classList.add('correct');
    input.setAttribute('disabled', 'true');
    button.setAttribute('disabled', 'true');
  } else {
    // Incorrect guess
    feedback.textContent = 'Try again!';
    input.value = '';
    input.focus();
  }
});
