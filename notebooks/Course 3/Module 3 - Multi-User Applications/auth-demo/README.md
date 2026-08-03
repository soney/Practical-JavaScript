# Auth demo servers

The authentication server from the User Authentication videos, one snapshot
per reading. Stages 1 through 5 grow the same hand-built server; stage 6 is
the small Express demo from the Express.js video; stage 7 rebuilds the auth
server on Express and Passport.

Install the dependencies **once**, here in `auth-demo` (they are shared by
every stage):

    cd "auth-demo"
    npm install

Then start whichever stage you want, still from this folder:

    node 01-registration/server.js

Every stage listens on port 3000, so run **one at a time**: stop the current
one with Ctrl+C before starting the next, or you will see `EADDRINUSE`. Then
visit <http://localhost:3000>.

| Folder | Reading | What it adds |
| --- | --- | --- |
| `01-registration/` | Implementing User Registration | `POST /register` stores accounts in `users.json` (passwords in plain text, on purpose) |
| `02-login/` | Implementing User Login | `POST /login` checks credentials; one vague error message; case-insensitive emails |
| `03-hashing/` | Securing User Data | bcrypt: the database stores password hashes instead of passwords |
| `04-sessions/` | Managing User Sessions | Session IDs in cookies, and `GET /me` says who is logged in |
| `05-logout/` | Logging Out with Sessions | `POST /logout`, and the page shows the right navigation |
| `06-express/` | Local Authentication with Passport (Express.js video) | A separate mini server: the grocery search rebuilt with Express |
| `07-passport/` | Local Authentication with Passport | The auth server rebuilt on Express, express-session, and Passport |

Each stage keeps its accounts in its own `users.json`, created next to its
`server.js` the first time someone registers. That means every stage starts
empty: register an account before trying to log in, and delete the stage's
`users.json` whenever you want a clean slate.

`06-express/` is the odd one out: it serves a grocery search page, not the
auth pages, and its search results appear in the browser console (open it
with F12 or Cmd+Option+I).
