// This file is provided for you. It defines setProgress(percent), which the
// three buttons (50%, 75%, 100%) call when clicked. setProgress moves the
// progress bar to the given percent and updates the label. You do not need to
// change it - your job is to add the CSS transition to #progress-fill in
// index.html so the width change eases in and out smoothly when a button is
// clicked.

// Select the elements we need to update.
const progressFill = document.querySelector('#progress-fill');
const percentLabel = document.querySelector('#percent-label');

// Called by the buttons. Setting the width is what your CSS transition animates.
function setProgress(percent) {
  progressFill.style.width = percent + '%';
  percentLabel.textContent = percent + '%';
}
