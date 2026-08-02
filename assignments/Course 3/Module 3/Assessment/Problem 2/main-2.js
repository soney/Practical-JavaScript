// Problem 2: Remember the visitor's dark mode preference with localStorage.
// You implement setupDarkMode() below. The DOMContentLoaded call at the
// bottom already runs setupDarkMode() for you - leave it as is.

function setupDarkMode() {
    const toggleButton = document.querySelector('#toggle-button');

    // TODO: (1) Read the saved theme from localStorage using the key 'theme'.
    //           If the saved value is the string 'dark', add the 'dark' class
    //           to document.body so the page opens in dark mode.

    // TODO: (2) Add a 'click' listener to toggleButton. When it is clicked:
    //           - toggle the 'dark' class on document.body
    //           - check whether document.body now has the 'dark' class
    //           - save 'dark' to localStorage under the key 'theme' when dark
    //             mode is on, or 'light' when it is off
    void toggleButton;
}

document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
});
