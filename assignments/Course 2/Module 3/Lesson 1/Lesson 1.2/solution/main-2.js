// The #display element reference is provided for you.
const display = document.querySelector("#display");

// SOLUTION: learner writes the code below the provided #display reference
// Returns a Promise that resolves to `value` after `ms` milliseconds.
function resolveAfter(value, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
}

// Usage: resolve to a message after 2 seconds, then show it.
resolveAfter("Data loaded!", 2000).then((value) => {
    display.textContent = value;
});
