# Problem 1: Set the Bundle Output Filename

Edit `Lesson 5.1/webpack.config.js`:

You are given a small source project in the `src/` folder:

- `src/index.js` imports a function from `src/greeting.js` and writes its return value into the element with ID `app`.
- `src/greeting.js` exports a `greeting()` function that returns the string `Hello from the bundle!`.
- `src/index.html` is an HTML template containing `<div id="app"></div>`.

Running `webpack --config webpack.config.js` reads the `entry` file, follows its imports, and writes one bundled JavaScript file into the `dist/` folder. The `output.filename` option controls the name of that file.

## What is already done

The starter `webpack.config.js` is almost complete. It already sets:

- `mode` to `'development'`.
- `entry` to `'./src/index.js'`, the file webpack reads first.
- `output.path` to the `dist/` folder, and `output.clean` to `true`.
- A `plugins` array with one `HtmlWebpackPlugin`. This generates `dist/index.html` and adds a `<script>` tag that loads whatever file your bundle produces.

## Your task

Inside the `output` object, add a `filename` property set to `'bundle.js'`. Replace the `TODO` comment with this exact line:

```js
filename: 'bundle.js',
```

The finished `output` object looks like this:

```js
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  clean: true,
},
```

With `output.filename` set to `'bundle.js'`, the build writes the bundle to `dist/bundle.js`. `HtmlWebpackPlugin` then adds a `<script>` tag that loads `bundle.js`, so the element with ID `app` shows the text `Hello from the bundle!` when the page loads.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Bundlers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/7EyOs/practice-bundlers) - `Lesson 5.1`

The files here are the starter you get in the course. [`solution/webpack.config.js`](solution/webpack.config.js) is the finished `webpack.config.js`; copy it over the starter to run the completed assignment.
