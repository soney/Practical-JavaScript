# Problem 3: Loops for Email Addresses

Edit `Problem 3/main-3.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Problem 3/main-3.js`. **Do not modify the HTML file**, `Problem 3/index.html`.
- Note 2: The testing/export block at the bottom is boilerplate for the grader. Add your code above that block. Do not modify or remove the testing/export block; the tests use that block to access your variables and functions.

Define a function called `createEmails` that accepts two arguments:

1. `names`: an array of names as strings.
2. `domain`: a string for the email domain, such as `"@email.com"` or `"@school.edu"`.

The function should create one email address for each name by adding `domain` to the end of that name. For example, `createEmails(['maya', 'luis'], '@email.com')` should return `['maya@email.com', 'luis@email.com']`.

Inside the function:

1. Create a new empty array for the email addresses.
2. Loop through the `names` array.
3. For each name, add the `domain` argument to the end of the name.
   - Use the value passed into `domain`.
   - Do not hard-code `"@email.com"` inside the function.
4. Add each new email string to the email array.
5. Return the new email array.

Do not change the original `names` array. If the input array is empty, return an empty array.

---

Course 1, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/qSQ7a/module-3-graded-assignment) - `Problem 3`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
