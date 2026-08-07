# Problem 1: Function Definitions for Doubling Points

Edit `Lesson 5.1/main-1.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 5.1/main-1.js`. **Do not modify the HTML file**, `Lesson 5.1/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

A *function* is a reusable block of code that you define once and can call whenever you need it. In a game, a "double points" power-up doubles a player's score, and you will write a function for it.

Define a function named `doublePoints`. This function should take one number parameter named `points`.

Inside the function:

1. Create a variable named `doubled`.
2. Set `doubled` equal to `points` multiplied by `2`. Use the `*` operator:

   ```js
   const doubled = points * 2;
   ```

3. Log `doubled` to the console:

   ```js
   console.log(doubled);
   ```

4. Return `doubled` from the function.

For example, calling `doublePoints(50)` should log `100` to the console and return `100`.

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Functions](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/ILrIX/practice-functions) - `Lesson 5.1`

The files here are the starter you get in the course. The finished `main-1.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%201/Module%203/Lesson%205/Lesson%205.1/solution); in the course codespace that folder is hidden so you can work the problem first.
