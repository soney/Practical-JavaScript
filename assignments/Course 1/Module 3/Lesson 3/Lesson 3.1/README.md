# Problem 1: Boolean Logic for Ingredient Checks

Edit `Lesson 3.1/main-1.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Lesson 3.1/main-1.js`. **Do not modify the HTML file**, `Lesson 3.1/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

The starter file already defines `flour`, `egg`, and `sugar` by calling helper functions. Do not change those three lines.

These three variables are **booleans** that describe which ingredients are available:
- `flour` is `true` when flour is available, and `false` when it is not.
- `egg` is `true` when an egg is available, and `false` when it is not.
- `sugar` is `true` when sugar is available, and `false` when it is not.

Use the values stored in `flour`, `egg`, and `sugar` in your conditionals. Do not call the helper functions again.

1. Create these variables and set each initial value to `false`:
    - `canMakeBread`
    - `canMakePasta`
    - `canMakeCake`

2. Write conditionals for each recipe. Use a separate `if` statement for each recipe so extra available ingredients do not prevent another recipe from being possible.

**Bread**

If `flour` is `true`, the ingredients for bread are available.
Set `canMakeBread` to `true`.
Log `"Can make bread!"` to the console.

**Pasta**

If `flour` and `egg` are both `true`, the ingredients for pasta are available.
Set `canMakePasta` to `true`.
Log `"Can make pasta!"` to the console.

**Cake**

If `flour`, `egg`, and `sugar` are all `true`, the ingredients for cake are available.
Set `canMakeCake` to `true`.
Log `"Can make cake!"` to the console.

**No recipe is possible**

After checking the three recipes, check whether `canMakeBread`, `canMakePasta`, and `canMakeCake` are all still `false`.
Log `"Cannot make anything!"` to the console.

---

Course 1, Module 3 - practice assignment (ungraded): [Practice: Booleans and Conditionals](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/Os3rG/practice-booleans-and-conditionals) - `Lesson 3.1`

The files here are the starter you get in the course. [`solution/main-1.js`](solution/main-1.js) is the finished `main-1.js`; copy it over the starter to run the completed assignment.
