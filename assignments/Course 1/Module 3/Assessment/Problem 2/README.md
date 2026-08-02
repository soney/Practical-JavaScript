# Problem 2: Conditionals for Password Feedback

Edit `Problem 2/main-2.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Problem 2/main-2.js`. **Do not modify the HTML file**, `Problem 2/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Define a function called `getPasswordFeedback` that accepts two arguments, `password` and a boolean value `isCorrect` (i.e. `true` or `false`). Inside the function, use an `if` statement to return feedback about the `password`.

Build each message with a *template literal*, a string written in backticks. Inside a template literal, `${password}` is a **placeholder** that gets replaced with the actual value of the `password` argument; it is not the literal text `[password]`.

- If `isCorrect` is `false`, return:

  ```js
  `${password} is incorrect. Please try again.`
  ```

- If `isCorrect` is `true`, return:

  ```js
  `${password} is correct. Logging you in...`
  ```

For example, `getPasswordFeedback('abc123', true)` returns `'abc123 is correct. Logging you in...'`.

---

Course 1, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/qSQ7a/module-3-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
