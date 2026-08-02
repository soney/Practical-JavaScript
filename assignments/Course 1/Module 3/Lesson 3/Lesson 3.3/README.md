# Problem 3: Comparison Operators for Age Checks

Edit `Lesson 3.3/main-3.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 3.3/main-3.js`. **Do not modify the HTML file**, `Lesson 3.3/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Create an age-checking system.

The starter file already defines `age` by calling a helper function (`someFunctionToGetAge()`). Do not change that line. The helper supplies the age, and with the starter values it is `18`.

1. Create a variable named `minAge` and set it to `21`.
2. Create a boolean variable named `canDrive`.
   - `canDrive` should be `true` when `age` is greater than or equal to `minAge`.
   - With the starter values, `canDrive` should be `false`.
3. Create a boolean variable named `isMinor`.
   - `isMinor` should be `true` when `age` is less than `minAge`.
   - With the starter values, `isMinor` should be `true`.
4. Log `canDrive` and `isMinor` to the console.

With the starter values, the page should show this table:

| Variable | Value |
| --- | --- |
| `age` | `18` |
| `minAge` | `21` |
| `canDrive` | `false` |
| `isMinor` | `true` |

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Booleans and Conditionals](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/Os3rG/practice-booleans-and-conditionals) - `Lesson 3.3`

The files here are the starter you get in the course. [`solution/main-3.js`](solution/main-3.js) is the finished `main-3.js`; copy it over the starter to run the completed assignment.
