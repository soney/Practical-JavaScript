# Problem 1: React Props for Profile Cards

Edit `Lesson 2.1/main-1.jsx`:

Create a reusable `ProfileCard` component that receives its data through props.

Within the file:

1. Update `ProfileCard` so it accepts the props `name`, `role`, and `status`
2. Render the `name` prop inside the card heading
3. Render the `role` prop inside the paragraph
4. Render the `status` prop inside the status pill
5. In `App`, render three `ProfileCard` components with these values:
   - `Ada`, `Frontend engineer`, `Active`
   - `Grace`, `Accessibility reviewer`, `Reviewing`
   - `Linus`, `Release coordinator`, `Waiting`

Props should be treated as read-only inputs, like the properties lesson describes.

The resulting page should look similar to this image:

![Expected output: three project team profile cards rendered from props](layout.png)

---

Course 4, Module 1 - practice assignment (ungraded): [Practice: Creating React Components](https://www.coursera.org/learn/building-applications-with-react/programming/xUESM/practice-creating-react-components) - `Lesson 2.1`

The files here are the starter you get in the course. [`solution/main-1.jsx`](solution/main-1.jsx) is the finished `main-1.jsx`; copy it over the starter to run the completed assignment.
