# Problem 2: Hoisting and Scope for Currency Conversion

Edit `Lesson 3.2/main-2.js`:

This code allows a user to enter a price in USD and toggle between different currency displays.

1. Use `document.querySelector` to get references to these elements and store each in a variable:
    - The `<input>` element with the id `usd-input`, stored in a variable named `usdInput`.
    - The `<span>` element with the id `converted-amount`, stored in a variable named `convertedDisplay`.
    - The `<select>` element with the id `currency-selector`, stored in a variable named `currencySelector`.

2. Add an `input` event listener to `usdInput`. Inside the callback:

    - Get the amount the user typed with `parseFloat(usdInput.value) || 0`.
    - Declare a `let rate` variable. Use `let` because `rate` is assigned a value later inside the `if/else`.
    - Use an `if/else` statement based on `currencySelector.value`:
        - If `"EUR"`, set `rate` to `0.92`.
        - If `"GBP"`, set `rate` to `0.79`.
    - Call a function `calculateConversion(amount, rate)`.
    - Set `convertedDisplay`'s `textContent` to the returned result.

3. Define the function `calculateConversion` at the very bottom of your script. This function should:
    - Take two parameters.
    - Return their product rounded to two decimal places.

When the page loads and `100` is typed while `EUR` is selected, the page should look similar to this image:

![Expected output: Lesson 3 - Multi-Currency Cart rendered page](layout.png)

---

Course 2, Module 2 - practice assignment (ungraded): [Practice: Scope and Functions](https://www.coursera.org/learn/building-interactive-web-applications-with-javascript/programming/urR98/practice-scope-and-functions) - `Lesson 3.2`

The files here are the starter you get in the course. The finished `main-2.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%202/Module%202/Lesson%203/Lesson%203.2/solution); in the course codespace that folder is hidden so you can work the problem first.
