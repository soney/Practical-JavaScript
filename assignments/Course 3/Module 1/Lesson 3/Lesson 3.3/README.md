# Problem 3: Default Exports - Format a Name

Edit `Lesson 3.3/formatter.js`:

A module can expose one primary value using a default export. Unlike a named export, a default export does not need a matching name when it is imported, so the importing module can give it any local name it wants.

The provided file `main-3.js` imports the default export from `formatter.js` and uses it to fill in the page:

```
import formatName from './formatter.js';

document.querySelector('#result').textContent = formatName('ada');
```

Right now `formatter.js` defines a `formatName` function whose body is empty, and the function is not exported as the default. Because `main-3.js` imports a default export that does not exist, the browser cannot resolve the import and the module fails to run, so the `<p>` with ID `result` stays empty.

Your task:

1. In `formatter.js`, fill in the function body so it returns the name with its first letter capitalized (the rest of the name stays the same). To capitalize the first letter, take the first character with `.charAt(0)`, uppercase it with `.toUpperCase()`, and add the rest of the string with `.slice(1)`:

    ```js
    return name.charAt(0).toUpperCase() + name.slice(1);
    ```

2. Make the function the module's default export.

For example, calling the function with `'ada'` must return the string `'Ada'`.

When your default export is in place, `main-3.js` runs `formatName('ada')` and the element with ID `result` shows the text `Ada`.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Modules](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/BtcXQ/practice-modules) - `Lesson 3.3`

The files here are the starter you get in the course. The finished `formatter.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%201/Lesson%203/Lesson%203.3/solution); in the course codespace that folder is hidden so you can work the problem first.
