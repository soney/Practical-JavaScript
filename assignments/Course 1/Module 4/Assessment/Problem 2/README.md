# Problem 2: Event Listeners for a Status Button

Edit `Problem 2/main-2.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Problem 2/main-2.js`. **Do not modify the HTML file**, `Problem 2/index.html`.
- Note 2: `main-2.js` already ends with a testing/export block that is boilerplate for the grader. Write your code **above** that block. You do not need to write any export code yourself. Leave the block as it is; the tests use it to access your function.

You will make a button print a message to the console each time it is clicked. To do that, you define a function and then connect it to the button's `click` event with `addEventListener` (the same method from the event-listener lesson).

The page already has a button in `index.html`:

```html
<button id="statusBtn">Get Status</button>
```

1. Define a function named `statusReport`.
   - The function should not take any arguments.
   - The function should not return anything.
   - Inside the function, call `console.log("Status is clear!")`. Use the exact message `Status is clear!`.

2. Connect the button to your function so it runs on each click.
   - First, get the button element. Select it with `document.querySelector("#statusBtn")` and store it in a variable.
   - Then call `.addEventListener()` on that button. It takes two arguments: the event name as a string (here, `"click"`), and the function to run when the event happens (here, `statusReport`).
   - Pass `statusReport` **by name**. Do not write `statusReport()` with parentheses. The parentheses would run the function once immediately, while passing only the name lets the browser call it on each click.

Each time the `Get Status` button is clicked, the console should log `Status is clear!`.

---

Course 1, Module 4 - graded assignment: [Module 4 Graded Assignment](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/Itkd1/module-4-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
