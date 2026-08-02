# Problem 2: Accessibility for a Live Counter

Edit `Problem 2/index.html`:

Improve the "Available Seats" widget so it works better for keyboard and screen reader users. You only need to edit the markup in `index.html`. The page styles are provided in `style.css`, and the `updateSeats()` behavior is provided in `main-2.js`. Do not edit `style.css` or `main-2.js`.

Make these markup changes inside the `<body>` of `index.html`:

1. Wrap the widget content in a `<main>` element.
2. Use an `<h1>` heading that contains the text `Flight 712`.
3. Keep a seat count element with `id="seat-count"`, and keep its text `15 seats remaining`.
4. Add `aria-live="polite"` to `#seat-count`.
5. Add `aria-atomic="true"` to `#seat-count`.
6. Use a real `<button>` element for the update control.
7. Give the button `id="refresh-btn"`.
8. Keep the button attributes `type="button"` and `onclick="updateSeats()"`.
9. Give the button `aria-label="Refresh live seat availability"`.
10. Keep the visible button text `Check for Updates`.

The provided `updateSeats()` function decreases the count by `1` each time the button is clicked, for example from `15 seats remaining` to `14 seats remaining`. Because `#seat-count` has `aria-live="polite"`, screen readers announce the new count automatically each time it changes.

---

Course 3, Module 4 - graded assignment: [Module 4 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/X8xWS/module-4-graded-assignment) - `Problem 2`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
