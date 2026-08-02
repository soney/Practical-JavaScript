# Problem 1: For Loops for Number Totals

Edit `Lesson 4.1/main-1.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 4.1/main-1.js`. **Do not modify the HTML file**, `Lesson 4.1/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

This assignment practices using a `for` loop to add up every number in an array.

1. Create a variable called `numbers` and assign it to this array:

   ```js
   [5, 10, 15, 20]
   ```

2. Create a variable called `total` and assign it to `0`.

3. Create a `for` loop that loops over every item in `numbers`.
   - Start the loop index at `0`.
   - Keep looping while the index is less than `numbers.length`.
   - Add `1` to the index after each loop.

4. Inside the loop, add the current number to `total`.
   - Use `numbers[i]` to get the current number if your loop variable is named `i`.
   - Update `total` by setting it equal to its current value plus the current number.

5. After the loop finishes, log `total` to the console.

With the starter values, the page should show this table:

| Variable | Value |
| --- | --- |
| `numbers` | `[5,10,15,20]` |
| `total` | `50` |

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Sequences and Iteration](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/hW2XZ/practice-sequences-and-iteration) - `Lesson 4.1`

The files here are the starter you get in the course. [`solution/main-1.js`](solution/main-1.js) is the finished `main-1.js`; copy it over the starter to run the completed assignment.
