# Problem 1: ClassList for Background Color Buttons

Edit `Lesson 1.1/index.html`:

Create an interaction that updates the page's background color based on the user's action.

1. Select each button from the DOM:
   - Create a variable called `redButton` and assign it to the button with the id `'red-btn'` using `document.querySelector`.
   - Create a variable called `blueButton` and assign it to the button with the id `'blue-btn'`.

2. Create two functions:
   - `setRedBackground`:
      - calls `document.body.classList.remove('blue')` to remove the `blue` class
      - calls `document.body.classList.add('red')` to add the `red` class to `<body>`.
   - `setBlueBackground`:
      - calls `document.body.classList.remove('red')` to remove the `red` class
      - calls `document.body.classList.add('blue')` to add the `blue` class to `<body>`.

After you define both functions, add these exact lines:

```js
redButton.addEventListener('click', setRedBackground);
blueButton.addEventListener('click', setBlueBackground);
```

These lines connect each button to the function that should run when the button is clicked. They must come below where you declared `redButton` and `blueButton`, since the button variables need to exist before you can add a listener to them. The function names do not have parentheses here because the browser should call the function later, when the click happens.

After the `blue` button is clicked, the page should look similar to this image:

![Expected output: Choose a background color rendered page](layout.png)

---

Course 2, Module 1 - practice assignment (ungraded): [Practice: Accessing the DOM from JavaScript](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/aL5cv/practice-accessing-the-dom-from-javascript) - `Lesson 1.1`

The files here are the starter you get in the course. [`solution/index.html`](solution/index.html) is the finished `index.html`; copy it over the starter to run the completed assignment.
