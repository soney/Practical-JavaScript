# Problem 4: Linking an External CSS Stylesheet

Edit `Lesson 1.4/index.html` and `Lesson 1.4/style.css`:

So far you have written CSS inside a `<style>` element (internal CSS) and inside a `style` attribute (inline CSS). In this problem you will work with an *external stylesheet* (CSS kept in its own separate file) and connect it to your HTML page with a `<link>` element. Keeping CSS in its own file separates the page's structure (the HTML) from its presentation (the CSS), which keeps a site organized as it grows.

You will work with two files:

- `style.css`: a stylesheet that is **already provided** in the `Lesson 1.4` folder with one starter rule. You will add one more rule to it.
- `index.html`: add one `<link>` element that connects the page to `style.css`. Do not change the existing `<body>` content.

## Step 1: Add a rule to the CSS file

Open `style.css`. It already contains a rule that makes the `<h1>` blue:

```css
h1 {
    color: blue;
}
```

Below that rule, **add a second rule for the `p` selector** that sets the following properties:

- Set the `background-color` property to `red`.
- Set the `color` property to `white`.
- Set the `padding` property to `10px`.


## Step 2: Link the stylesheet from your HTML

In `index.html`, add a `<link>` element inside the `<head>` element:

```html
<link rel="stylesheet" href="style.css">
```

This `<link>` element connects your HTML page to the external stylesheet:

- `rel="stylesheet"` tells the browser that the linked file is a stylesheet.
- `href="style.css"` is the path to your CSS file. Because `style.css` is in the same folder as `index.html`, you refer to it by its filename alone.

Do not add a `<style>` element and do not use inline `style` attributes. All of your CSS should live in `style.css`.

When the page loads, the browser reads the `<link>`, loads `style.css`, and applies the rules: the heading turns blue and the paragraph gets a red background.

The resulting page should look similar to this image:

![Expected output: a blue "Welcome to My Webpage" heading above a paragraph with white text on a padded red background](layout.png)

---

Course 1, Module 2 - practice assignment (ungraded): [Practice: Adding CSS](https://www.coursera.org/learn/web-development-fundamentals-html-css-javascript/programming/OzFCf/practice-adding-css) - `Lesson 1.4`

The files here are the starter you get in the course. [`solution/index.html`](solution/index.html) and [`solution/style.css`](solution/style.css) are the finished `index.html` and `style.css`; copy them over the starter to run the completed assignment.
