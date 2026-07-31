
// Define a function that sets the x position of element
function setX(x) {
    const element = document.querySelector('#block'); // get the element
    if(x) { // if x was specified, use it as the new left position
        element.style.setProperty('left', `${x}px`);
    } else {
        element.style.removeProperty('left');
    }
}