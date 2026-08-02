# Problem 4: Conditionals for Game Score Messages

Edit `Lesson 3.4/main-4.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 3.4/main-4.js`. **Do not modify the HTML file**, `Lesson 3.4/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Create a score-checking system for a game.

The starter file already defines `score` and `bonusPoints` by calling helper functions (`someFunctionToGetScore()` and `someFunctionToGetBonusPoints()`). Do not change those two lines. The helpers supply the values, and with the starter values `score` is `75` and `bonusPoints` is `10`.

1. Create a variable named `message` and start it as an empty string.
2. Use an `if / else if` statement to update `message`:
   - Set `message` to `"High score!"` if `score` is greater than `80` **or** `bonusPoints` is greater than `5`.
   - Set `message` to `"Keep trying"` if `score` is less than or equal to `80` **and** `bonusPoints` is less than or equal to `5`.
3. Log `message` to the console.

With the starter values, the page should show this table:

| Variable | Value |
| --- | --- |
| `score` | `75` |
| `bonusPoints` | `10` |
| `message` | `"High score!"` |

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Booleans and Conditionals](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/Os3rG/practice-booleans-and-conditionals) - `Lesson 3.4`

The files here are the starter you get in the course. [`solution/main-4.js`](solution/main-4.js) is the finished `main-4.js`; copy it over the starter to run the completed assignment.
