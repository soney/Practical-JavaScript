# Problem 2: Use Lodash Utility Functions to Summarize an Array of Prices

Edit `Lesson 2.2/main-2.js`:

The provided file `index.html` loads the third-party library Lodash from a CDN and then loads `main-2.js`. Both scripts use the `defer` attribute, so Lodash and the page body are ready before `main-2.js` runs. Do not edit `index.html`.

Inside `main-2.js` there is an array of prices:

```javascript
const prices = [12, 5, 20, 8, 15];
```

The page body already contains three empty output elements:

```html
<span id="total"></span>
<span id="average"></span>
<span id="largest"></span>
```

Using the Lodash global `_`, compute three values from `prices` and show each one in its matching element. For each value, select the element with `document.querySelector(...)` and set its `textContent` to the number converted with `String(...)`.

1. Total
    - Compute the sum of `prices` with `_.sum(prices)`.
    - Update the `textContent` of the element with ID `total`.
    - Expected text: `60`

2. Average
    - Compute the mean of `prices` with `_.mean(prices)`.
    - Update the `textContent` of the element with ID `average`.
    - Expected text: `12`

3. Largest
    - Find the largest value in `prices` with `_.max(prices)`.
    - Update the `textContent` of the element with ID `largest`.
    - Expected text: `20`

For example, rendering the total looks like this:

```javascript
const total = _.sum(prices);
document.querySelector('#total').textContent = String(total);
```

When all three values are computed and rendered, the page shows `Total: 60`, `Average: 12`, and `Largest: 20`.

Before your edit, the three output elements are empty because no values are computed or written to them.

## Library documentation

- lodash 4.17.21: [documentation](https://lodash.com/docs/4.17.21), [npm package](https://www.npmjs.com/package/lodash/v/4.17.21), [github (tag 4.17.21)](https://github.com/lodash/lodash/tree/4.17.21)

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: External Libraries](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/Q6bA8/practice-external-libraries) - `Lesson 2.2`

The files here are the starter you get in the course. [`solution/main-2.js`](solution/main-2.js) is the finished `main-2.js`; copy it over the starter to run the completed assignment.
