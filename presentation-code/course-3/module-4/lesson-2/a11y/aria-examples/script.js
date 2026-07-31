document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. ARIA Live Region Example
  // ==========================================
  let cartCount = 0;
  const addCartBtn = document.getElementById("addCartBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const cartStatus = document.getElementById("cartStatus");

  addCartBtn.addEventListener("click", () => {
    cartCount++;
    cartStatus.textContent = `${cartCount} item${cartCount > 1 ? "s" : ""} in your cart.`;
  });

  clearCartBtn.addEventListener("click", () => {
    cartCount = 0;
    cartStatus.textContent = "Your cart is empty.";
  });

  // ==========================================
  // 2. Custom ARIA Role Example (Div as Button)
  // ==========================================
  const customButton = document.getElementById("customButton");
  const statusAlert = document.getElementById("statusAlert");

  function toggleFakeButton() {
    const isPressed = customButton.getAttribute("aria-pressed") === "true";
    customButton.setAttribute("aria-pressed", !isPressed);

    statusAlert.classList.remove("hidden");
    statusAlert.textContent = `Status successfully toggled to ${!isPressed ? "ON" : "OFF"}!`;

    // Hide alert after 3 seconds
    setTimeout(() => {
      statusAlert.classList.add("hidden");
    }, 3000);
  }

  // Handle mouse click
  customButton.addEventListener("click", toggleFakeButton);

  // KEYBOARD ACCESSIBILITY: A real <button> responds to Enter/Space.
  // A <div role="button"> must have this JS added manually:
  customButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent scrolling on Space
      toggleFakeButton();
    }
  });

  // ==========================================
  // 3. Custom ARIA Slider (Scrollbar) Example
  // ==========================================
  const slider = document.getElementById("customSlider");
  const thumb = document.getElementById("sliderThumb");
  const fill = document.getElementById("sliderFill");
  const valueDisplay = document.getElementById("volumeValue");

  let isDragging = false;

  function updateSliderValue(percentage) {
    // Clamp between 0 and 100
    percentage = Math.max(0, Math.min(100, Math.round(percentage)));

    // Update visual DOM
    thumb.style.left = `${percentage}%`;
    fill.style.width = `${percentage}%`;
    valueDisplay.textContent = percentage;

    // **CRITICAL FOR A11Y**: Update the aria-valuenow attribute
    slider.setAttribute("aria-valuenow", percentage);
  }

  function handleDrag(e) {
    if (!isDragging) return;

    const rect = slider.getBoundingClientRect();
    // Calculate click position relative to track width
    let x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
    let percentage = ((x - rect.left) / rect.width) * 100;

    updateSliderValue(percentage);
  }

  // Mouse events
  slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.focus(); // Ensure it gets keyboard focus
    handleDrag(e);
  });

  document.addEventListener("mousemove", handleDrag);

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // KEYBOARD EVENT HANDLING FOR ARIA SLIDER
  slider.addEventListener("keydown", (e) => {
    let currentValue = parseInt(slider.getAttribute("aria-valuenow"));
    let step = 5; // How much to jump per key press

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        updateSliderValue(currentValue + step);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        updateSliderValue(currentValue - step);
        break;
      case "Home":
        e.preventDefault();
        updateSliderValue(0);
        break;
      case "End":
        e.preventDefault();
        updateSliderValue(100);
        break;
      case "PageUp":
        e.preventDefault();
        updateSliderValue(currentValue + 20); // Larger step
        break;
      case "PageDown":
        e.preventDefault();
        updateSliderValue(currentValue - 20);
        break;
    }
  });
});
