// 1. Select elements
const thumbnails = document.querySelectorAll('.thumb');
const mainView = document.querySelector('#main-view');

// 2. Loop through the thumbnails and add click listeners
for (const thumbnail of thumbnails) {
  thumbnail.addEventListener('click', function() {
    // 3. Update the main image to the clicked thumbnail's source
    const newSrc = thumbnail.getAttribute('src');
    mainView.setAttribute('src', newSrc);
  });
}
