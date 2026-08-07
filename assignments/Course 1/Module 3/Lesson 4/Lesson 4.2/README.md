# Problem 2: While Loops for Fundraising Totals

Edit `Lesson 4.2/main-2.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 4.2/main-2.js`. **Do not modify the HTML file**, `Lesson 4.2/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

1. Create a set of variables you will use:
   - Create a variable called `dailyRevenue` and assign it to the array: `[52, 47, 105, 71]`
   - Create a variable called `daysPassed` and assign it to the value `0`
   - Create a variable called `newUniformsCost` and assign it to the value `270`
   - Create a variable called `fundsRaised` and assign it to the value `0`

2. Create a `while` loop that continues while `daysPassed` is less than the length of `dailyRevenue`.
   - In the `while` loop, add `dailyRevenue[daysPassed]` to `fundsRaised`, then increment `daysPassed` by 1.

3. Create an `if` statement that checks if `fundsRaised` is greater than `newUniformsCost`. If it is, log this exact message to the console, using `+` to join the text with `daysPassed`:

   ```js
   console.log("Raised enough funds for new uniforms after " + daysPassed + " days!");
   ```

   With the starter values `fundsRaised` is `275` and `daysPassed` is `4`, so this logs `Raised enough funds for new uniforms after 4 days!`.

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Sequences and Iteration](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/hW2XZ/practice-sequences-and-iteration) - `Lesson 4.2`

The files here are the starter you get in the course. The finished `main-2.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%201/Module%203/Lesson%204/Lesson%204.2/solution); in the course codespace that folder is hidden so you can work the problem first.
