# Problem 3: Using an Installed npm Package

Edit `Lesson 4.3/main.js`:

npm is a package manager that installs and manages the code your project depends on. Running `npm install lodash` does two things:

- It adds `lodash` to the `dependencies` field in `package.json`, recorded as `"lodash": "^4.17.21"`. The `^` means any version compatible with `4.17.21`.
- It downloads the `lodash` library into a `node_modules` folder so your code can load it.

The `lodash` package has already been installed for you, and the `package.json` in this folder already lists it as a dependency. Do not edit `package.json`.

To use an installed package, you `import` it by name, with no `./` in front:

```js
import _ from 'lodash';
```

This is different from loading your own files. Your own files use a relative path, such as `import result from './main.js'`. A plain name like `'lodash'` tells Node to look in `node_modules` instead.

The provided file `server.js` loads `main.js` and sends whatever `main.js` exports back to the tests. Do not edit `server.js`.

Your task in `main.js`:

1. At the top of the file, import the `lodash` package by name and store it in a constant named `_`.
2. Replace the empty `capitalizedNames` array. Set `capitalizedNames` to `_.map(names, _.capitalize)`, which returns a new array with each name capitalized, such as `ada` becoming `Ada`.

Leave the `names` array and the `export default` line as they are.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Package Managers and the Console](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/VQ8LZ/practice-package-managers-and-the-console) - `Lesson 4.3`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%201/Lesson%204/Lesson%204.3/solution); in the course codespace that folder is hidden so you can work the problem first.
