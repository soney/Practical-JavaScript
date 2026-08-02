// A helper is provided for you: splitIntoWords(text) takes a string and returns
// an array of the words in it. It trims the text and splits on any run of
// whitespace (spaces, tabs, or new lines), so "a  b\nc" becomes ["a", "b", "c"].
function splitIntoWords(text) {
    return text.trim().split(/\s+/);
}

// SOLUTION: learner writes countBookWords below the provided helper
// Fetches the book text and shows how many words it contains.
function countBookWords() {
    return fetch('book.txt')
        .then((response) => {
            // Read the response body as plain text (not JSON).
            return response.text();
        })
        .then((text) => {
            // Use the provided helper to split the text into words, then count them.
            const words = splitIntoWords(text);
            const count = words.length;

            const result = document.querySelector('#result');
            result.textContent = `This book has ${count} words.`;
            return count;
        })
        .catch((error) => {
            // Handle a failed request.
            console.error('Failed to load the book');
            const result = document.querySelector('#result');
            if (result) {
                result.textContent = 'Failed to load the book.';
            }
        });
}
