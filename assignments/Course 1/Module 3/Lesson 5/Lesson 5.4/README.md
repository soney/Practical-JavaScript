# Problem 4: Early Returns for Withdrawals

Edit `Lesson 5.4/main-4.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 5.4/main-4.js`. **Do not modify the HTML file**, `Lesson 5.4/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Define a function named `withdrawMoney` with two parameters:
- `balance`
- `amount`

Inside `withdrawMoney`:

1. Use an `if` statement to check whether `amount` is greater than `balance`.
2. If `amount` is greater than `balance`, immediately return the exact string `"Insufficient balance"`.
3. If there is enough money, return the remaining balance after subtracting `amount` from `balance`.

After the function definition:

1. Call `withdrawMoney(1000, 400)` and store the returned value in a variable named `validWithdrawal`.
2. Call `withdrawMoney(500, 800)` and store the returned value in a variable named `invalidWithdrawal`.
3. Log `validWithdrawal` to the console.
4. Log `invalidWithdrawal` to the console.

With the starter values, the page should show this table:

| Variable | Value |
| --- | --- |
| `withdrawMoney(1000, 400)` | `600` |
| `withdrawMoney(500, 800)` | `"Insufficient balance"` |
| `validWithdrawal` | `600` |
| `invalidWithdrawal` | `"Insufficient balance"` |

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Functions](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/ILrIX/practice-functions) - `Lesson 5.4`

The files here are the starter you get in the course. The finished `main-4.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%201/Module%203/Lesson%205/Lesson%205.4/solution); in the course codespace that folder is hidden so you can work the problem first.
