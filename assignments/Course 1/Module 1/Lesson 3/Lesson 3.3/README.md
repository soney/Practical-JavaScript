# Problem 3: Semantic HTML for a Portfolio Page

Edit `Lesson 3.3/index.html`:

The starter HTML represents a portfolio page, but it uses only `<div>` elements, making the structure unclear. The `id` and `class` attributes are labels to help you identify what each `<div>` is trying to represent.

```html
<div id="page-header">
  <div class="page-title">My Portfolio</div>
</div>
<div id="page-content">
  <div class="about-section">
    <div class="section-heading">About Me</div>
    <div class="section-text">I am a web developer learning semantic HTML.</div>
  </div>
</div>
```

Change the existing `<div>`-only structure into semantic HTML:

1. Replace `<div id="page-header">` with a `<header>` element.
2. Replace `<div class="page-title">My Portfolio</div>` with an `<h1>` element that contains the text `My Portfolio`.
3. Replace `<div id="page-content">` with a `<main>` element.
4. Replace `<div class="about-section">` with a `<section>` element.
5. Replace `<div class="section-heading">About Me</div>` with an `<h2>` element that contains the text `About Me`.
6. Replace `<div class="section-text">I am a web developer learning semantic HTML.</div>` with a `<p>` element that contains the text `I am a web developer learning semantic HTML.`

When you are done, there should not be any `<div>` elements in the page structure. *Note: you should not change the text content of any elements, only the element types themselves. You can choose whether to keep the `id` and `class` attributes or remove them.*

The resulting page should look similar to this image:

![Expected output: the heading "My Portfolio" above an "About Me" section heading and a paragraph about learning semantic HTML](layout.png)

---

Course 1, Module 1 - practice assignment (ungraded): [Practice: Working with HTML Attributes](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/vNnYp/practice-working-with-html-attributes) - `Lesson 3.3`

The files here are the starter you get in the course. [`solution/index.html`](solution/index.html) is the finished `index.html`; copy it over the starter to run the completed assignment.
