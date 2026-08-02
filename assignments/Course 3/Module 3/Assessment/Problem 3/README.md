# Problem 3: Checking a Password Against a Stored Hash

Edit `Problem 3/server.js`:

Finish the login server for a small app whose accounts live in a file. The server already loads the accounts and serves the page; your only job is the password check in the `POST /login` route. All of your work is server-side code in `server.js`.

The browser side is finished for you: `index.html` and `main-3.js` are complete. The page has a username box, a password box, and a Log In button that sends `POST /login` and shows the server's message. Do not edit `index.html`, `main-3.js`, or `users.json`.

**Setup:** the server uses the `express` and `bcryptjs` packages. Both are preinstalled in the course lab; if you are working on your own computer, run `npm install` in the `Problem 3` folder first, then start the server with `node server.js`.

**What the starter already does for you:**

- Reads the accounts from `users.json` into a `users` object. Each key is a username and each value is a record like `{ name: "Alice Nguyen", passwordHash: "$2a$..." }`. The stored `passwordHash` is a bcrypt hash, never the real password.
- Sets up Express, parses JSON request bodies (so `req.body` is ready), and serves the page.
- Declares `POST /login` as an `async` route and reads `username` and `password` from `req.body`, so `await` works and the two values are ready to use.

**Why you cannot just compare with `===`:** the server never stores the real password, only a bcrypt hash of it. You cannot un-hash it, and you cannot compare a typed password to a hash directly. Instead you hand both to `bcrypt.compare(password, storedHash)`, which hashes the typed password the same way and reports whether they match. It returns a promise, so you `await` it.

**Implement the `POST /login` route.** The TODO comments in `server.js` name the exact code for each step:

1. Look up the account for the submitted username: `const user = users[username];`.
2. If there is no such user, reject the login with status `401` and a JSON message, then `return`.
3. Compare the submitted password against the stored hash with `await bcrypt.compare(password, user.passwordHash)`.
4. If it does not match, reject the login with status `401` and a JSON message, then `return`.
5. If it matches, respond (status `200`) with a JSON message that welcomes the user by name, for example `Welcome back, Alice Nguyen!`.

Use the same generic message for both failure cases (a missing user and a wrong password) so the server never reveals which usernames exist.

For reference, `users.json` contains these accounts and passwords you can log in with:

- `alice` / `wonderland`
- `bob` / `sunflower`
- `carol` / `opensesame`

**How to test your code:** In the Coursera lab, open a terminal and start your server by running `node server.js` inside the `Problem 3` folder. Then open a browser preview in the lab and go to `localhost:3000`. Log in as `alice` with `wonderland` (it should succeed and greet Alice), then try `alice` with a wrong password and a made-up username (both should fail with the same message).

---

Course 3, Module 3 - graded assignment: [Module 3 Graded Assignment](https://www.coursera.org/learn/developing-full-stack-applications-with-javascript/programming/FRlxO/module-3-graded-assignment) - `Problem 3`

The files here are the starter you get in the course. Solutions to graded
assignments are not published.
