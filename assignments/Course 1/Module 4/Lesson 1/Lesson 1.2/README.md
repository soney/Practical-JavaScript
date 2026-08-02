# Problem 2: Event Listeners for a Go Blue Button

Edit `Lesson 1.2/index.html`:

Inside the existing `<script>` element, add the JavaScript for the button.

1. Define a function called `goBlueChant`.
   - The function should not take any arguments.
   - The function should not return anything.
   - Inside the function, call `console.log('Go Blue!')`.

2. Add a `click` event listener to the existing button with `id="blueChant"` using `addEventListener`.
   - Get a reference to the button, for example with `document.querySelector('#blueChant')`.
   - Call `.addEventListener('click', goBlueChant)` on that button. Pass `goBlueChant` without parentheses so the browser runs it on each click, rather than calling it right away.
   - Each click should log the exact text `Go Blue!` to the console.

---

Course 1, Module 4 - practice assignment (ungraded): [Practice: JavaScript Objects and Elements](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/EjTll/practice-javascript-objects-and-elements) - `Lesson 1.2`

The files here are the starter you get in the course. [`solution/index.html`](solution/index.html) is the finished `index.html`; copy it over the starter to run the completed assignment.
