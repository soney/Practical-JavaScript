# Problem 2: ES Module Import Forms - Render Three Calculations

Edit `Lesson 3.2/main-2.js`:

The file `math-utils.js` is provided for you. It has three named exports: `add`, `subtract`, and `multiply`. Each takes two numbers and returns a number.

In `main-2.js`, bring these functions in using all three import forms, then write their results into the page.

1. Named import
    - Import `add` from `./math-utils.js` with a named import:
      `import { add } from './math-utils.js';`

2. Renamed import
    - Import `subtract` from `./math-utils.js`, renaming it to `minus` with `as`:
      `import { subtract as minus } from './math-utils.js';`

3. Namespace import
    - Import everything from `./math-utils.js` as a namespace named `math`:
      `import * as math from './math-utils.js';`

4. Render the results
    - Set the `textContent` of the element with ID `sum` to `add(2, 3)`, which is `5`.
    - Set the `textContent` of the element with ID `difference` to `minus(10, 4)`, which is `6`.
    - Set the `textContent` of the element with ID `product` to `math.multiply(3, 3)`, which is `9`.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Modules](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/BtcXQ/practice-modules) - `Lesson 3.2`

The files here are the starter you get in the course. The finished `main-2.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%201/Lesson%203/Lesson%203.2/solution); in the course codespace that folder is hidden so you can work the problem first.
