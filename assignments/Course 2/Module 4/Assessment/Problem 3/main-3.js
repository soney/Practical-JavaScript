// This file is provided for you. It toggles the "active" class on the box each
// time you click the Toggle button. You do not need to change it - your job is
// to add the CSS transition in index.html so the box animates smoothly between
// its two states.

// Select the box and the toggle button using their IDs
const box = document.querySelector('#box');
const toggleBtn = document.querySelector('#toggleBtn');

// Toggle the "active" class on the box each time the button is clicked
toggleBtn.addEventListener('click', function() {
    box.classList.toggle('active');
});
