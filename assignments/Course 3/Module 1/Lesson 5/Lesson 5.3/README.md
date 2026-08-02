# Problem 3: Generate a Source Map

Edit `Lesson 5.3/webpack.config.js`:

When webpack bundles your source into one output file, an error in the browser points at a line in the generated bundle, not at your original source. A source map fixes this. It is a separate file that maps positions in the generated bundle back to your original source files, so the browser can show the real file name and line number when you debug.

You turn on source maps with the `devtool` option. Setting `devtool` to `'source-map'` tells webpack to write a `.map` file next to the bundle.

The provided app writes text into the element with ID `app`.

## What is already done

The starter `webpack.config.js` already has `entry`, `output`, and the `HtmlWebpackPlugin`. It has no `devtool` option, so the build writes only `dist/main.js` and no source map.

## Your task

Add a `devtool` property set to `'source-map'`. Replace the `TODO` comment with this exact line:

```js
devtool: 'source-map',
```

That is the only change you need to make.

With `devtool: 'source-map'`, the build writes both `dist/main.js` and `dist/main.js.map`. The `.map` file lets the browser map the bundled code back to `src/index.js` when you debug. When the page loads, the element with ID `app` shows the text `Source maps make debugging easier`.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Bundlers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/7EyOs/practice-bundlers) - `Lesson 5.3`

The files here are the starter you get in the course. [`solution/webpack.config.js`](solution/webpack.config.js) is the finished `webpack.config.js`; copy it over the starter to run the completed assignment.
