// PROVIDED CODE - you do not need to edit this file.
//
// updateSeats() is already written for you. It updates the live seat counter
// each time the refresh button is clicked. Your task is to make the markup in
// index.html accessible so this behavior is announced to screen reader users.

// The current seat count. It starts at 15 to match the initial markup.
let seatsRemaining = 15;

function updateSeats() {
    const seatDisplay = document.querySelector('#seat-count');

    // One more seat is taken, but never go below zero.
    if (seatsRemaining > 0) {
        seatsRemaining -= 1;
    }

    // Update the text. Because #seat-count is aria-live="polite",
    // screen readers announce the new count automatically.
    seatDisplay.textContent = `${seatsRemaining} seats remaining`;
}
