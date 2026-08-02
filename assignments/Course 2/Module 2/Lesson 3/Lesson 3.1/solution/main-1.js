// These element references are provided for you:
const seats = document.querySelectorAll('.seat');
const selectedCount = document.querySelector('#selectedCount');
const totalPrice = document.querySelector('#totalPrice');

// SOLUTION: learner writes the code below the provided element references
// Update the selected-seat count and the total price
function updateDisplay() {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  const count = selectedSeats.length;
  const price = count * 25;

  selectedCount.textContent = count;
  totalPrice.textContent = '$' + price;
}

// Select or deselect one seat, unless it is unavailable
function toggleSeat(seat) {
  if (seat.classList.contains('unavailable')) {
    return;
  }
  seat.classList.toggle('selected');
  updateDisplay();
}

// Give every seat a click listener
for (const seat of seats) {
  seat.addEventListener('click', function() {
    toggleSeat(seat);
  });
}

// Initialize the display
updateDisplay();
