# Problem 2: Text and Attribute Updates for a Profile Header

Edit `Lesson 2.2/main-2.js`:

In this task, you are building a dynamic profile header that changes based on a user's subscription status. You will need to manipulate text, update attributes, and manage CSS classes to give "Premium" users a distinct look.

Define a function called `updateProfile` that takes two arguments: `username` (a string) and `isPremium` (a boolean). Within the function, perform the following:

1. Select the elements. Use `document.querySelector()` to select each element below and store it in a variable:

   - the `<span>` with the ID `display-name`, stored in a variable named `displayName`
   - the `<img>` with the ID `profile-pic`, stored in a variable named `profilePic`
   - the `<div>` with the ID `profile-card`, stored in a variable named `profileCard`

2. Update text: Set `displayName`'s `textContent` to the `username` provided.

3. Modify attributes:

   - If `isPremium` is `true`, use `profilePic.setAttribute()` to change the `src` to `"gold-shield.png"`.
   - If `isPremium` is `false`, set the `src` to `"standard-user.png"`.

4. Manage classes:

   - If `isPremium` is `true`, add the class to `profileCard` with `profileCard.classList.add("vip-border")`.
   - If `isPremium` is `false`, remove the class from `profileCard` with `profileCard.classList.remove("vip-border")`.

After calling `updateProfile('Ada Lovelace', true)`, the page should look similar to this image:

![Expected output: Lesson 2.2 rendered page](layout.png)

---

Course 2, Module 1 - practice assignment (ungraded): [Practice: Modifying the Page](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/zGkKP/practice-modifying-the-page) - `Lesson 2.2`

The files here are the starter you get in the course. The finished `main-2.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%202/Module%201/Lesson%202/Lesson%202.2/solution); in the course codespace that folder is hidden so you can work the problem first.
