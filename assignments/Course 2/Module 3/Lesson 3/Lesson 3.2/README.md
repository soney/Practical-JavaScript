# Problem 2: Change a Message After Delays with async/await

Edit `Lesson 3.2/main-2.js`:

A helper function `delay(ms)` is provided for you. It returns a Promise that resolves after `ms` milliseconds, so `await delay(1000)` pauses an `async` function for one second.

Write an `async` function called `runSteps` that shows a series of messages in the `#message` element, pausing between them:

1. Set `message.textContent` to `'Step 1 of 3...'`.
2. `await delay(1000)`, then set `message.textContent` to `'Step 2 of 3...'`.
3. `await delay(1000)`, then set `message.textContent` to `'All steps complete!'`.

Then call `runSteps()` at the end so it runs when the page loads.

After all the steps finish, the page should look similar to this image:

![Expected output: All steps complete message](layout.png)

---

Course 2, Module 3 - practice assignment (ungraded): [Practice: Promises and async/await](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/sB6hS/practice-promises-and-async-await) - `Lesson 3.2`

The files here are the starter you get in the course. [`solution/main-2.js`](solution/main-2.js) is the finished `main-2.js`; copy it over the starter to run the completed assignment.
