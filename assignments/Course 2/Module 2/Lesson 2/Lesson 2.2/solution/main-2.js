// Select the elements
const card = document.querySelector('#card');
const detailsBtn = document.querySelector('#detailsBtn');

// Clicking the card selects the photo
card.addEventListener('click', function() {
  card.classList.add('selected');
});

// Clicking the Details button shows or hides the description
detailsBtn.addEventListener('click', function(event) {
  // Toggle the class. The stylesheet hides .details unless the card has it.
  card.classList.toggle('show-details');

  // The button is inside the card, so a normal click would also bubble up and
  // select the photo. Stop that, unless the Shift key is held (in which case we
  // let the click reach the card so the photo is selected too).
  if (!event.shiftKey) {
    event.stopPropagation();
  }
});
