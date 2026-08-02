# Problem 2: ES Module Imports and Exports - Temperature Report

Edit `Problem 2/converters.js`, `Problem 2/formatter.js`, and `Problem 2/main-2.js`:

Each JavaScript module has its own file-level scope. A name is only visible to another file when you `export` it, and another file can only use that name when it `import`s it. In this problem you split a temperature report across three module files and connect them with the three import forms.

The page `index.html` loads `main-2.js` as a module (with `<script src="main-2.js" type="module">`). It contains two empty paragraphs, one with ID `fahrenheit` and one with ID `celsius`. Your imports and exports make `main-2.js` fill both paragraphs.

1. Add two named exports in `converters.js`
    - Add the `export` keyword in front of the `function cToF(c)` declaration and return the Celsius value converted to Fahrenheit with the formula `c * 9 / 5 + 32`.
    - Add the `export` keyword in front of the `function fToC(f)` declaration and return the Fahrenheit value converted to Celsius with the formula `(f - 32) * 5 / 9`.

2. Add a default export in `formatter.js`
    - Make `formatTemperature` the module's `default` export.
    - Return the `value` followed by the degree character `°` and the `unit` letter, so that `formatTemperature(212, 'F')` returns the string `212°F`. You can build this with `value + '°' + unit`. The degree character `°` is hard to type on most keyboards, so copy and paste it from this description into your code.

3. Add the three import forms in `main-2.js`
    - Add a named import of `cToF` from `./converters.js`, written as `import { cToF } from './converters.js';`.
    - Add a namespace import of the whole converters module, written as `import * as converters from './converters.js';`. This binds every named export of `converters.js` as a property of `converters`, such as `converters.fToC`.
    - Add the default import from `./formatter.js`, written as `import formatTemperature from './formatter.js';`. A `default` export is imported without curly braces, and you choose the name it is bound to.

4. Fill both paragraphs in `main-2.js`
    - Set the `textContent` of the element with ID `fahrenheit` to `formatTemperature(cToF(100), 'F')`, using the named import `cToF`.
    - Set the `textContent` of the element with ID `celsius` to `formatTemperature(converters.fToC(32), 'C')`, using the namespace import `converters`.

---

Course 3, Module 1 - graded assignment: [Module 1 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/YdV3u/module-1-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
