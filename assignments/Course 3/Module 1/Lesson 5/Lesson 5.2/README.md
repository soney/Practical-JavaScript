# Problem 2: Build in Production Mode

Edit `Lesson 5.2/webpack.config.js`:

Webpack can build in different modes. In `'development'` mode it optimizes for fast builds and convenient debugging, so the bundle is large and readable. In `'production'` mode it optimizes the bundle for download by minifying it: it removes comments and whitespace and shortens names, which makes the output file much smaller.

The provided app writes text into the element with ID `app` and imports a stylesheet that colors that text.

## What is already done

The starter `webpack.config.js` already has `entry`, `output`, the `HtmlWebpackPlugin`, and a working CSS loader rule so `import './styles.css'` succeeds. Right now `mode` is set to `'development'`, so the build produces a large, unminified `dist/main.js`.

## Your task

Change the value of `mode` from `'development'` to `'production'`:

```js
mode: 'production',
```

That is the only change you need to make.

With `mode` set to `'production'`, webpack minifies `dist/main.js`, so the file becomes much smaller than the development build. When the page loads, the element with ID `app` still shows the text `Styled by an imported stylesheet`, colored `rgb(0, 128, 0)` by the imported stylesheet.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Bundlers](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/7EyOs/practice-bundlers) - `Lesson 5.2`

The files here are the starter you get in the course. [`solution/webpack.config.js`](solution/webpack.config.js) is the finished `webpack.config.js`; copy it over the starter to run the completed assignment.
