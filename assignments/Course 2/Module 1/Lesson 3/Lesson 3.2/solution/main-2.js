const input = document.querySelector('#tag-input');
const btn = document.querySelector('#add-tag-btn');
const container = document.querySelector('#tag-container');

btn.addEventListener('click', function () {
  const text = input.value.trim();

  if (text !== '') {
    // Create the tag element
    const newTag = document.createElement('span');
    newTag.textContent = text;
    newTag.classList.add('tag-item');

    // Clicking the tag removes it
    newTag.addEventListener('click', function () {
      newTag.remove();
    });

    // Add it to the container and clear the input
    container.append(newTag);
    input.value = '';
  }
});
