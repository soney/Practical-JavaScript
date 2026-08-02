// 1. Get reference to the element
const infoCard = document.querySelector('#info-card');

// 2. Function for when mouse enters
function highlightCard() {
  infoCard.classList.add("highlight");
  infoCard.textContent = "You are hovering!";
}

// 3. Function for when mouse leaves
function removeHighlight() {
  infoCard.classList.remove("highlight");
  infoCard.textContent = "Hover over me!";
}

// 4. Add event listeners
infoCard.addEventListener('mouseover', highlightCard);
infoCard.addEventListener('mouseout', removeHighlight);
