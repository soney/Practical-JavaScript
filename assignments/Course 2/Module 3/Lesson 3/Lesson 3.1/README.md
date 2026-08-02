# Problem 1: Convert a .then() Chain to async/await

Edit `Lesson 3.1/main-1.js`:

The file already has a working `loadUsers` function. It fetches `users.json` and
shows how many users are in the file, using `.then()`. Your task is to rewrite
`loadUsers` so it does the same thing using `async` and `await` instead.

To convert the function:

1. Mark the function as `async` (write `async function loadUsers()`).
2. Replace the `.then()` chain with `await`. Use one `await` to get the response from `fetch('users.json')`, and another `await` to read the data from `response.json()`.
3. Set `result.textContent` the same way it was set before, so the behavior does not change.

The `.then()` version you are starting from looks like this:

```js
function loadUsers() {
  fetch('users.json')
    .then(r => r.json())
    .then(data => {
      result.textContent = 'This file lists ' + data.length + ' users.';
    });
}
```

After the page loads and `loadUsers` finishes and shows the count, the page should look similar to this image:

![Expected output: page showing how many users the file lists](layout.png)

---

Course 2, Module 3 - practice assignment (ungraded): [Practice: Promises and async/await](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/sB6hS/practice-promises-and-async-await) - `Lesson 3.1`

The files here are the starter you get in the course. [`solution/main-1.js`](solution/main-1.js) is the finished `main-1.js`; copy it over the starter to run the completed assignment.
