// This file is provided for you. It toggles the box color between blue and red
// on each click. You do not need to change it - your job is to add the CSS
// transition in index.html so the color change animates smoothly.

// Select the box element using its ID
const box = document.querySelector('#colorBox');

// Create a variable to track the current color state
let isBlue = true;

// Toggle the color on each click
box.addEventListener('click', function() {
    if (isBlue) {
        box.style.backgroundColor = 'red';
        isBlue = false;
    } else {
        box.style.backgroundColor = 'blue';
        isBlue = true;
    }
});
