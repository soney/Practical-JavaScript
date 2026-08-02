// The DOM references and three helper functions are provided for you.
// You will write the Promise parts (fetchQuote and loadQuote) and wire up the button.

const button = document.querySelector('#getQuoteButton');
const quoteText = document.querySelector('#quoteText');
const quoteAuthor = document.querySelector('#quoteAuthor');
const loadingMessage = document.querySelector('#loadingMessage');
const quoteContainer = document.querySelector('#quoteContainer');

// Displays a quote object (its text and author) on the page.
function displayQuote(quote) {
  quoteText.textContent = quote.text;
  quoteAuthor.textContent = 'Author: ' + quote.author;
  quoteContainer.classList.add('show');
  loadingMessage.textContent = '';
}

// Shows the loading state.
function showLoading() {
  loadingMessage.textContent = 'Loading quote...';
  quoteContainer.classList.remove('show');
  quoteText.textContent = '';
  quoteAuthor.textContent = '';
}

// Shows an error message if the fetch fails.
function handleError(error) {
  quoteText.textContent = 'Failed to load quote. Please try again.';
  quoteAuthor.textContent = '';
  quoteContainer.classList.add('show');
  loadingMessage.textContent = '';
  console.log(error);
}

// TODO: write fetchQuote() and loadQuote() here, then wire the button (button.addEventListener('click', loadQuote)) and call loadQuote() once.
