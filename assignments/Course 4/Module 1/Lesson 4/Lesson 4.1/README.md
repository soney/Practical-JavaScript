# Problem 1: React State for a Counter

Edit `Lesson 4.1/main-1.jsx`:

Use React state to make the counter update when the buttons are clicked.

Within `Counter`:

1. Replace the local `count` variable with a state variable created by `React.useState(0)`
2. Make the `Add` button increase the count by 1
3. Make the `Subtract` button decrease the count by 1
4. Make the `Reset` button set the count back to 0
5. Render the current state value inside the element with class `counter-value`

Use the setter returned by `React.useState`. Updating a local variable will not tell React to render again.

The resulting page should look similar to this image:

![Expected output: practice counter with Add, Subtract, and Reset buttons](layout.png)

---

Course 4, Module 1 - practice assignment (ungraded): [Practice: Managing State in React Components](https://www.coursera.org/learn/building-applications-with-react/programming/HOBhG/practice-managing-state-in-react-components) - `Lesson 4.1`

The files here are the starter you get in the course. [`solution/main-1.jsx`](solution/main-1.jsx) is the finished `main-1.jsx`; copy it over the starter to run the completed assignment.
