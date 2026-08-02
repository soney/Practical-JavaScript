# Problem 1: For Loops for a Team Roster

Edit `Problem 1/main-1.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Problem 1/main-1.js`. **Do not modify the HTML file**, `Problem 1/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Define a function called `createRoster` that accepts one argument, `players`, an array of player names as strings.

The function should create a numbered team roster. For example, `['Maya', 'Luis']` should become `['1. Maya', '2. Luis']`.

Inside the function:

1. Create a new empty array called `rosterLines`.
2. Use a regular `for` loop to move through the `players` array from the first item to the last item.
   - Start the index at `0`.
   - Keep looping while the index is less than `players.length`.
   - Add `1` to the index after each loop.
3. For each player, build a string in the format `"[number]. [name]"`, for example, `"1. Maya"`.
   - The number is `index + 1` (the loop index starts at `0`, but roster numbers start at `1`).
   - The name is `players[index]`.
   - Join them with the `+` operator, with `". "` (a period and a space) in between:

     ```js
     const line = (index + 1) + '. ' + players[index];
     ```
4. Add each roster string to `rosterLines`.
5. Return `rosterLines`.

Do not change the original `players` array. If the input array is empty, return an empty array.

---

Course 1, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/qSQ7a/module-3-graded-assignment) - `Problem 1`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
