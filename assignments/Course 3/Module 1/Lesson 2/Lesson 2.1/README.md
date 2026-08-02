# Problem 1: Load an External Library from a CDN with `defer`

Edit `Lesson 2.1/index.html`:

The provided file `main-1.js` uses the third-party library Lodash. It reads the Lodash global `_` and writes to the page:

```javascript
const heading = document.querySelector('#result');
heading.textContent = _.upperFirst('hello from lodash');
```

For this code to run, two things must be true when `main-1.js` executes: the Lodash global `_` must already exist, and the element with ID `result` must already be in the DOM. You will load Lodash from a CDN and control the load order so both conditions hold.

Do not edit `main-1.js`. Add two `<script>` tags inside the existing `<head>` element of `index.html`, in this order:

1. Load Lodash, pinned to version `4.17.21`, from the jsDelivr CDN:

   ```html
   <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js" defer></script>
   ```

2. Load the provided support file:

   ```html
   <script src="main-1.js" defer></script>
   ```

Both tags must include the `defer` attribute.

## Why `defer`

A plain `<script>` in the `<head>` runs the moment the browser reaches it, before the `<body>` is parsed. At that point the element with ID `result` does not exist yet, and if you loaded `main-1.js` before Lodash, the `_` global would not exist either.

The `defer` attribute changes this. The browser keeps parsing the HTML and downloads the deferred scripts in the background. Deferred scripts run after the whole document has been parsed, and they run in the order they appear in the HTML. Because Lodash appears before `main-1.js`, `_` is defined by the time `main-1.js` runs, and because both wait until parsing finishes, the element with ID `result` exists as well.

When both scripts are added correctly, the page loads Lodash from the CDN, `main-1.js` runs, and the `<h1 id="result">` element displays:

`Hello from lodash`

Before your edit, no scripts are loaded, so `_` is never defined and the heading stays empty.

## Library documentation

- lodash 4.17.21: [documentation](https://lodash.com/docs/4.17.21), [npm package](https://www.npmjs.com/package/lodash/v/4.17.21), [github (tag 4.17.21)](https://github.com/lodash/lodash/tree/4.17.21)

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: External Libraries](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/Q6bA8/practice-external-libraries) - `Lesson 2.1`

The files here are the starter you get in the course. [`solution/index.html`](solution/index.html) is the finished `index.html`; copy it over the starter to run the completed assignment.
