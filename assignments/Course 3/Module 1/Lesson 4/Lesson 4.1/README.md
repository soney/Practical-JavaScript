# Problem 1: Relative Paths in an `import` Statement

Edit `Lesson 4.1/main.js`:

A path tells Node where to find a file. A relative path describes where a file is compared to the file you are working in. In Node (with ES modules enabled), you load another file with an `import` statement and a relative path:

- A file in the same directory starts with `./`, such as `import x from './mascot.js'`.
- A file inside a subdirectory adds the folder name, such as `import x from './data/subfile.js'`.
- To go up to the parent directory, a path starts with `../`.
- The path must include the `.js` file extension.

Two modules are already provided for you. Do not edit them:

- `mascot.js` is in the same directory as `main.js`. It exports (as its default export) a function `describeMascot(school, mascot)`.
- `data/university.js` is inside the `data` subdirectory. It exports (as its default export) an object with a `name` and a `mascot`.

The provided file `server.js` loads `main.js` and sends whatever `main.js` exports back to the browser. Do not edit `server.js`. (A `package.json` with `"type": "module"` is also provided so Node treats these files as ES modules.)

Your task in `main.js`:

1. Use an `import` statement with the correct relative path to load `describeMascot` from `mascot.js`. Because `mascot.js` is in the same directory, the path starts with `./`.
2. Use an `import` statement with the correct relative path to load the university object from `data/university.js`. Because that file is in the `data` subdirectory, the path includes the folder name.
3. Replace the placeholder `export default` line so it exports the result of calling `describeMascot(university.name, university.mascot)`.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Package Managers and the Console](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/VQ8LZ/practice-package-managers-and-the-console) - `Lesson 4.1`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%201/Lesson%204/Lesson%204.1/solution); in the course codespace that folder is hidden so you can work the problem first.
