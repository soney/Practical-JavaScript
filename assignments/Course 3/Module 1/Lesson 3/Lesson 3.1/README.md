# Problem 1: Named Exports in an ES Module - Temperature Conversion

Edit `Lesson 3.1/temperature-utils.js`:

Each JavaScript module has its own file-level scope. A name defined in one module file is not visible to another module unless you mark it with the `export` keyword. Only `export`ed names can be brought into another file with an `import` statement.

The page `index.html` loads `main-1.js` as a module (with `<script src="main-1.js" type="module">`). The file `main-1.js` imports one function from your module and uses it to fill in the result:

```js
import { celsiusToFahrenheit } from './temperature-utils.js';

document.querySelector('#result').textContent = celsiusToFahrenheit(100);
```

The file `temperature-utils.js` defines two functions, but neither is currently exported, so the `import` in `main-1.js` cannot find `celsiusToFahrenheit`.

Your task is to turn both functions into named exports and fill in their bodies.

1. Export `celsiusToFahrenheit`
    - Add the `export` keyword in front of the `function celsiusToFahrenheit(celsius)` declaration.
    - Return the Celsius value converted to Fahrenheit using the formula `celsius * 9 / 5 + 32`.

2. Export `fahrenheitToCelsius`
    - Add the `export` keyword in front of the `function fahrenheitToCelsius(fahrenheit)` declaration.
    - Return the Fahrenheit value converted to Celsius using the formula `(fahrenheit - 32) * 5 / 9`.

Export both functions even though the page only calls `celsiusToFahrenheit`. A named export makes a function available to any module that imports it, and `fahrenheitToCelsius` must be exported so importers can use it too.

---

Course 3, Module 1 - practice assignment (ungraded): [Practice: Modules](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/BtcXQ/practice-modules) - `Lesson 3.1`

The files here are the starter you get in the course. [`solution/temperature-utils.js`](solution/temperature-utils.js) is the finished `temperature-utils.js`; copy it over the starter to run the completed assignment.
