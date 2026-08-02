# Problem 3: Reverse Loops for Letter Strings

Edit `Lesson 4.3/main-3.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 4.3/main-3.js`. **Do not modify the HTML file**, `Lesson 4.3/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

This assignment practices looping through an array from the end back to the beginning.

1. Create an array named `letters` with these exact values:

   ```js
   ['A', 'B', 'C', 'D']
   ```

2. Create a variable named `reversedString` and start it as an empty string:

   ```js
   ''
   ```

3. Use a `for` loop to move through the `letters` array from right to left.
   - Array indexes start at `0`.
   - The last index in the array is `letters.length - 1`.
   - Start your loop at `letters.length - 1`.
   - Keep looping while the index is greater than or equal to `0`.
   - Subtract `1` from the index after each loop.

4. Inside the loop, add the current letter to `reversedString`.
   - Use `letters[index]` to get the current letter.
   - Update `reversedString` by setting it equal to its current value plus the current letter:

     ```js
     reversedString = reversedString + letters[index];
     ```

   - This keeps the letters already stored in `reversedString` and adds one more letter to the end.

5. After the loop finishes, log `reversedString` to the console.

With the starter values, the page should show this table:

| Variable | Value |
| --- | --- |
| `letters` | `["A","B","C","D"]` |
| `reversedString` | `"DCBA"` |

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Sequences and Iteration](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/hW2XZ/practice-sequences-and-iteration) - `Lesson 4.3`

The files here are the starter you get in the course. [`solution/main-3.js`](solution/main-3.js) is the finished `main-3.js`; copy it over the starter to run the completed assignment.
