# Problem 2: Sharing Code with `import` and `export`

Edit `Lesson 4.2/main.js`:

Node can share code between files with the same `import` and `export` keywords you used in the browser. This project turns them on with `"type": "module"` in `package.json`.

- `import name from './file.js'` loads another file's default export and gives it a name.
- `export default value` makes a value available to other files that import this file.

The provided file `greeting.js` is an ES module in the same directory. It exports (as its default export) a function `greeting(name)` that returns `Hello, NAME!`. Do not edit `greeting.js`.

The provided file `server.js` loads `main.js` and calls the exported function with the name `Ada`. Do not edit `server.js`.

The file `main.js` already defines a function `makeWelcome(name)` that calls `greeting(name)` and adds ` Welcome to Node.` after it. Right now `main.js` does not import the greeting function and does not export `makeWelcome`, so `server.js` cannot use it.

Your task in `main.js`:

1. At the top of the file, use `import greeting from './greeting.js'` to load the greeting function. Name it `greeting` so the existing `makeWelcome` function can call it.
2. At the bottom of the file, use `export default` to export the `makeWelcome` function.

Do not change the body of `makeWelcome`. You only need to add the `import` line and the `export default` line.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Package Managers and the Console](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/VQ8LZ/practice-package-managers-and-the-console) - `Lesson 4.2`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%201/Lesson%204/Lesson%204.2/solution); in the course codespace that folder is hidden so you can work the problem first.
