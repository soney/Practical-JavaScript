# Problem 2: Arrays and Strings for a Shopping List

Edit `Lesson 2.2/main-2.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 2.2/main-2.js`. **Do not modify the HTML file**, `Lesson 2.2/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.
- Note 3: The tests check your variable names and values, not whether you use `let` or `const`. None of these variables need to be reassigned, so `const` is a good choice. `let` is also accepted if the final values are correct.
- Note 4: When a step says to log a value **to the console**, do it by calling `console.log(...)`. For example, `console.log(updatedList);` prints `updatedList` to the console.

1. Create a variable called `shoppingList` and assign it to the array: `['apples', 'bread', 'milk']`
2. Create a variable called `newItem` and assign it to the string `'eggs'`
3. Create a variable called `updatedList` and assign it to `shoppingList` with `newItem` added at the end
    - There are multiple ways to write an expression whose value is `shoppingList` with `newItem` added at the end, including:
      - The "spread" syntax: `[...shoppingList, newItem]`
      - The `concat()` method: `shoppingList.concat(newItem)`
    - You can use one of these approaches (either is fine) and assign the result to `updatedList`. Do not modify `shoppingList` directly (e.g. by using `push()`) because we want to keep `shoppingList` unchanged.
4. Log `updatedList` to the console

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Types and Expressions](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/vNxVP/practice-types-and-expressions) - `Lesson 2.2`

The files here are the starter you get in the course. The finished `main-2.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%201/Module%203/Lesson%202/Lesson%202.2/solution); in the course codespace that folder is hidden so you can work the problem first.
