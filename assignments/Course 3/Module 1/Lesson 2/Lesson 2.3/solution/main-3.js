// The page loads the "marked" library (https://marked.js.org) from a CDN <script>
// tag before this file runs, so a global `marked` object is available here.
// marked.parse() takes a Markdown string and returns a string of HTML. In a
// project with a bundler you would import it instead:
//   import { marked } from "marked";
// There is no build step here (marked is pre-packaged from a CDN), so we use the
// global.

const markdown = `# Meeting Notes

Please review the following before Friday:

- Finish the **budget** report
- Visit the [UMSI](https://www.si.umich.edu) site
- Schedule the next meeting

Thanks!`;

const output = document.querySelector('#output');

// SOLUTION: convert the Markdown to HTML with marked, then show it in #output
// Convert the Markdown into HTML with the library, then show it on the page.
output.innerHTML = marked.parse(markdown);
