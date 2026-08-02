# Problem 3: Multi-Stage Loading with async/await

Edit `Lesson 3.3/main-3.js`:

Real apps often load one thing, then use it to load the next. Two loaders are provided for you: `loadProfile()` returns a Promise for the user's name, and `loadMessages()` returns a Promise for a message count. Each takes a moment to resolve.

Write an `async` function called `loadDashboard` that loads them one stage at a time, updating the `#status` element as it goes:

1. Set `status.textContent` to `'Loading profile...'`.
2. `await loadProfile()` and store the returned name.
3. Set `status.textContent` to `'Welcome, ' + name + '! Loading messages...'`.
4. `await loadMessages()` and store the returned count.
5. Set `status.textContent` to `'Welcome, ' + name + '! You have ' + count + ' new messages.'`.

Then call `loadDashboard()` at the end so it runs when the page loads.

Because you `await` the profile before loading the messages, the stages happen in order. After both finish, the page should look similar to this image:

![Expected output: welcome dashboard with message count](layout.png)

---

Course 2, Module 3 - practice assignment (ungraded): [Practice: Promises and async/await](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/sB6hS/practice-promises-and-async-await) - `Lesson 3.3`

The files here are the starter you get in the course. [`solution/main-3.js`](solution/main-3.js) is the finished `main-3.js`; copy it over the starter to run the completed assignment.
