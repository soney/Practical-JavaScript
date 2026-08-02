# Problem 2: DOM Text Updates for a Profile Card

Edit `Problem 2/main-2.js`:

- Note 1: For this problem, you will **only** edit the JavaScript file, `Problem 2/main-2.js`. **Do not modify the HTML file**, `Problem 2/index.html`.

Complete the existing `updateProfile` function so it updates the profile card on the page.

1. Use the existing function named `updateProfile`.
   - It should take two string parameters: `userName` and `userBio`.
2. Select the profile name element:
   - Use `document.querySelector('#profile-name')`.
   - Set its `textContent` to `userName`.
3. Select the profile bio element:
   - Use `document.querySelector('#profile-bio')`.
   - Set its `textContent` to `userBio`.
4. Select the profile card:
   - Use `document.querySelector('.profile-card')`.
   - Add the class `updated` with `classList.add('updated')`.
5. Return `true` after the profile has been updated.

For example, calling `updateProfile('Jane Doe', 'Software Developer')` should show `Jane Doe`, show `Software Developer`, and add the `updated` class to the profile card.

After calling `updateProfile('Jane Doe', 'Software Developer')`, the page should look similar to this image:

![Expected output: profile card with an updated name and short bio](layout.png)

---

Course 2, Module 1 - graded assignment: [Module 1 Graded Assignment](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/V9HKL/module-1-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
