// This file is provided for you. It toggles the "spinner" class on the loading
// element and updates the button text on each click. You do not need to change
// it - your job is to write the @keyframes animation in index.html.

const loadingElement = document.querySelector('#loadingElement');
const toggleBtn = document.querySelector('#toggleBtn');

toggleBtn.addEventListener('click', () => {
  const isActive = loadingElement.classList.toggle('spinner');

  toggleBtn.textContent = isActive
    ? 'Stop Spinner'
    : 'Start Spinner';
});
