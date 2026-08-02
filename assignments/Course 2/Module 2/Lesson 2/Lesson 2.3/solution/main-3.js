// Get element references
const signupForm = document.querySelector('#signupForm');
const username = document.querySelector('#username');
const formMessage = document.querySelector('#formMessage');

// Add submit event listener
signupForm.addEventListener('submit', (event) => {
  // Check if username is empty
  if (username.value === '') {
    // Prevent default form submission
    event.preventDefault();

    // Set error message
    formMessage.textContent = 'Username cannot be empty';
    formMessage.classList.remove('empty', 'success');
    formMessage.classList.add('error');
  } else {
    // Set success message
    formMessage.textContent = 'Form submitted successfully';
    formMessage.classList.remove('empty', 'error');
    formMessage.classList.add('success');

    // Optionally prevent default to keep on this page for testing
    event.preventDefault();
  }
});
