// Get DOM references
const button = document.querySelector('#getQuoteButton');
const quoteText = document.querySelector('#quoteText');
const quoteAuthor = document.querySelector('#quoteAuthor');
const loadingMessage = document.querySelector('#loadingMessage');
const quoteContainer = document.querySelector('#quoteContainer');

// SOLUTION: learner writes fetchQuote, loadQuote, and the button wiring
//           (the DOM refs and displayQuote/showLoading/handleError are provided)
// Fetches the quotes and returns a Promise that resolves to a random quote object
function fetchQuote() {
  return fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
      // data is an array of quote objects; pick and return one object { text, author }
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    });
}

// Displays a quote object (its text and author) on the page
function displayQuote(quote) {
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = 'Author: ' + quote.author;
  quoteContainer.classList.add('show');
  loadingMessage.textContent = '';
}

// Shows the loading state
function showLoading() {
  loadingMessage.textContent = 'Loading quote...';
  quoteContainer.classList.remove('show');
  quoteText.textContent = '';
  quoteAuthor.textContent = '';
}

// Shows an error message if the fetch fails
function handleError(error) {
  quoteText.textContent = 'Failed to load quote. Please try again.';
  quoteAuthor.textContent = '';
  quoteContainer.classList.add('show');
  loadingMessage.textContent = '';
  console.log(error);
}

// Loads and shows a quote
function loadQuote() {
  showLoading();
  fetchQuote()
    .then(displayQuote)
    .catch(handleError);
}

// Show a new quote whenever the button is clicked
button.addEventListener('click', loadQuote);

// Load an initial quote when the page opens
loadQuote();
