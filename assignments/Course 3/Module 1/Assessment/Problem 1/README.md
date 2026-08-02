# Problem 1: Load Lodash from a CDN with `defer` and Summarize Transactions

Edit `Problem 1/index.html` and `Problem 1/main-1.js`:

The page contains an empty element with ID `summary`:

```html
<div id="summary"></div>
```

You will load the third-party library Lodash from a CDN, then use it to compute three numbers from a list of transactions and display them inside the `summary` element.

## Part 1: Load the library in `index.html`

Add two `<script>` tags inside the existing `<head>` element of `index.html`, in this order:

1. Load Lodash, pinned to version `4.17.21`, from the jsDelivr CDN:

   ```html
   <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js" defer></script>
   ```

2. Load your data file:

   ```html
   <script src="main-1.js" defer></script>
   ```

Both tags must include the `defer` attribute. The `defer` attribute tells the browser to finish parsing the whole document before running these scripts, and to run them in the order they appear. Because Lodash appears before `main-1.js`, the Lodash global `_` is defined by the time `main-1.js` runs, and because both wait for parsing to finish, the element with ID `summary` already exists.

## Part 2: Summarize the data in `main-1.js`

The file `main-1.js` already defines this array:

```javascript
const transactions = [
    { category: 'Food',      amount: 12 },
    { category: 'Transport', amount: 8  },
    { category: 'Food',      amount: 20 },
    { category: 'Utilities', amount: 40 },
];
```

Using the Lodash global `_`, compute three values:

- `total`: the sum of every `amount`. Use `_.sumBy(transactions, 'amount')`.
- `average`: the mean of every `amount`. Use `_.meanBy(transactions, 'amount')`.
- `largest`: the highest `amount`. Use `_.maxBy(transactions, 'amount')`, then read its `amount` property.

Then select the element with ID `summary` and render the values with this exact line:

```javascript
summary.innerHTML = `<p>Total: ${total}</p><p>Average: ${average}</p><p>Largest: ${largest}</p>`;
```

When both files are correct, the page loads Lodash from the CDN, runs `main-1.js`, and the `summary` element displays:

```
Total: 80
Average: 20
Largest: 40
```

Before your edit, no scripts are loaded, so `main-1.js` never runs and the `summary` element stays empty.

---

Course 3, Module 1 - graded assignment: [Module 1 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/YdV3u/module-1-graded-assignment) - `Problem 1`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
