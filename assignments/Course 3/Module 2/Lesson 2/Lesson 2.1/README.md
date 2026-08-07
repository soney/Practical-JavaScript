# Problem 1: HTTP Methods for REST Routes

Edit `Lesson 2.1/main.js`:

Build a Node.js server that responds differently based on the HTTP method used in the request. This exercise introduces the core behavior behind RESTful APIs.

You can tell which HTTP method a request used by reading `req.method` on the request object. It is a string such as `'GET'`, `'POST'`, or `'PUT'`, so you can compare it to decide how to respond, for example `if (req.method === 'GET') { ... }`.

Reminder on how to respond: set the status code with `res.statusCode`, then send the body and finish the response with `res.end(...)`. For example, to reply with a `200 OK` status and some text:

```js
res.statusCode = 200;
res.end('Fetching data...');
```

Create a server that listens on **port 3000**.

**Requirements:**

**`GET` request:**
- If the request method is `GET`, respond with `Fetching data...`

**`POST` request:**

- If the request method is `POST`, respond with `Creating new resource...`

**Other HTTP methods:**

- For all other methods (`PUT`, `DELETE`, etc.), respond with `Method not supported`

**Additional requirement:**

- Ensure every response returns a `200 OK` status code.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Request Types](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/2qUuv/practice-request-types) - `Lesson 2.1`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%202/Lesson%202.1/solution); in the course codespace that folder is hidden so you can work the problem first.
