// 1. Select the Elements
const usdInput = document.querySelector('#usd-input');
const convertedDisplay = document.querySelector('#converted-amount');
const currencySelector = document.querySelector('#currency-selector');

// 2. Define the Logic
usdInput.addEventListener('input', () => {
  const amount = parseFloat(usdInput.value) || 0;

  let rate;
  const selectedCurrency = currencySelector.value;

  if (selectedCurrency === "EUR") {
    rate = 0.92;
  } else if (selectedCurrency === "GBP") {
    rate = 0.79;
  }

  // Calling a hoisted function
  const result = calculateConversion(amount, rate);
  convertedDisplay.textContent = result;
});

// --- HOISTED FUNCTIONS ---
// This function declaration is hoisted to the top of the current scope
// by the JS engine, making it callable above where it is defined.
function calculateConversion(val, exchangeRate) {
  const total = val * exchangeRate;
  return total.toFixed(2); // Rounds to 2 decimal places
}
