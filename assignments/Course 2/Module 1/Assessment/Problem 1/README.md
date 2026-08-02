# Problem 1: DOM Creation for Blog Comments

Edit `Problem 1/main-1.js`:

- For this problem, you will **only** edit the JavaScript file, `Problem 1/main-1.js`. **Do not modify the HTML file**, `Problem 1/index.html`.

Create a function that adds a new comment to the existing comments section on the blog post.

1. Define a function named `addComment` with one string parameter named `commentText`.
2. Inside `addComment`, select the comments container:
   - Use `document.querySelector('#comments-container')`.
3. Create a new `<div>` element:
   - Use `document.createElement('div')`.
4. Set the new `<div>` element's class to `comment`.
   - Use `classList.add('comment')`.
5. Set the new `<div>` element's `textContent` to `commentText`.
6. Append the new comment element to `#comments-container`.
   - Use `.append()`.

For example, calling `addComment('This article was very helpful!')` should add a new `<div class="comment">` with the text `This article was very helpful!`.

After calling `addComment('This article was very helpful!')`, the page should look similar to this image:

![Expected output: blog post page with comments section](layout.png)

---

Course 2, Module 1 - graded assignment: [Module 1 Graded Assignment](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/V9HKL/module-1-graded-assignment) - `Problem 1`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
