# Problem 1: Saving a Display Name with localStorage

Edit `Problem 1/main-1.js`:

Build a small dashboard that remembers the visitor's name using `localStorage`, so the greeting stays personalized after the page reloads. The page in `index.html` already has the heading, input, button, and greeting area with the needed ids, so do not edit `index.html`.

`localStorage` is the browser's built-in key-value store. It keeps string values even after the page is reloaded or closed. The two methods you need are:

- `localStorage.setItem('display_name', name)` saves a value under a key.
- `localStorage.getItem('display_name')` reads the value back, or returns `null` if nothing is saved yet.

The starter already selects `#name-input`, `#save-button`, and `#greeting` for you. Add code that does all of the following:

1. Read the saved name from `localStorage` using the key `display_name`.
2. If a saved name exists:
   - Set the text of `#greeting` to `Welcome back, <name>!`, where `<name>` is the saved value.
   - Set the value of `#name-input` to the saved name.
3. If no name is saved yet, set the text of `#greeting` to the exact text `Welcome! Enter your name to get started.`
4. Add a `click` event listener to `#save-button`. When it is clicked:
   - Read the current value of `#name-input`.
   - Save that value to `localStorage` under the key `display_name`.
   - Set the text of `#greeting` to `Welcome back, <name>!`, where `<name>` is the value the visitor typed.

For example, after a visitor types `Ada` and clicks `Save`, the greeting should read `Welcome back, Ada!`. Reloading the page should keep that greeting and refill the input with `Ada`.

---

Course 3, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/FRlxO/module-3-graded-assignment) - `Problem 1`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
