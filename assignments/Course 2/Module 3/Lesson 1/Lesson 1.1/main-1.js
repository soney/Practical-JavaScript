// A helper is provided for you: splitIntoWords(text) takes a string and returns
// an array of the words in it. It trims the text and splits on any run of
// whitespace (spaces, tabs, or new lines), so "a  b\nc" becomes ["a", "b", "c"].
function splitIntoWords(text) {
    return text.trim().split(/\s+/);
}

// Define a function called countBookWords that:
//   1. Fetches the text file "book.txt" with fetch().
//   2. Reads the response as text with response.text().
//   3. Uses splitIntoWords(text) to get the words, then shows how many
//      there are (the array's .length) in #result.
//
// The page already calls countBookWords() for you once it loads.
//
// TODO: write countBookWords() here -- fetch "book.txt", read response.text(), then show splitIntoWords(text).length in #result.
