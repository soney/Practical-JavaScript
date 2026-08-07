# Problem 3: Query Parameters for Search Routes

Edit `Lesson 2.3/main.js`:

Query parameters are the `?term=javascript` part of a URL. They are how search bars, filters, and sorting controls pass information to a server, the same mechanism behind search on sites like Amazon and Google. In this problem you will build a search route that reads a query parameter and responds based on its value.

## What to build

Create a server that listens on **port 3000** with a single `/search` route. It reads a query parameter named `term` and responds like this:

| Request | Status | Response body |
| --- | --- | --- |
| `/search?term=javascript` | `200` | `You searched for: javascript` |
| `/search` (no `term` given) | `200` | `Please provide a search term` |
| any other path (e.g. `/about`) | `404` | (none required) |

A few details:

- The response body is the bare text shown above. Do not include any quotation marks in the response.
- The `term` value is echoed back exactly, so `/search?term=react` responds with `You searched for: react`.
- Multi-word terms arrive URL-encoded (`/search?term=node%20js`), but you get the decoded value (`node js`) back automatically, so no special handling is needed.

## How to do it

**Parse the URL:**
- Parse `req.url` using the `URL` constructor. Because `req.url` only contains the path and query string (not the host), you must pass a base URL as the second argument so the constructor can build a complete URL:

```js
const parsedUrl = new URL(req.url, 'http://localhost');
```

**Get the pathname:**
- The parsed URL object has a `pathname` property that gives you just the path, with the query string stripped off. Use it to check which route was requested:

```js
// For the request /search?term=javascript, parsedUrl.pathname is "/search"
if (parsedUrl.pathname === '/search') {
  // handle the search route
}
```

**Get the search parameters:**
- The parsed URL object also has a `searchParams` property. Call `.get('name')` on it to read the value of a single query parameter by name:

```js
// For the request /search?term=javascript, this returns "javascript"
const term = parsedUrl.searchParams.get('term');
```

- If the parameter is not in the URL (for example, a plain `/search` with no `?term=...`), `.get('term')` returns `null`. Use that to decide between the two `/search` responses: send `You searched for: <term>` when you have a value, and `Please provide a search term` when it is `null`.

---

Course 3, Module 2 - practice assignment (ungraded): [Practice: Request Types](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/2qUuv/practice-request-types) - `Lesson 2.3`

The files here are the starter you get in the course. The finished `main.js` is in the [solution folder on GitHub](https://github.com/soney/Practical-JavaScript/tree/main/assignments/Course%203/Module%202/Lesson%202/Lesson%202.3/solution); in the course codespace that folder is hidden so you can work the problem first.
