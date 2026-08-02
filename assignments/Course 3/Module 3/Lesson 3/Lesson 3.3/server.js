// A login server that should remember who is logged in using a session
// cookie. Registration and the password check are already written. Your
// work is the session handling, marked with TODO comments.
//
// Passwords are stored as plain text here to keep this problem focused on
// sessions; Problem 2 covered hashing.

const express = require("express");
// crypto is built into Node. You will use crypto.randomUUID() to create
// session IDs that cannot be guessed.
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage (already set up for you). users maps an email to
// { password }. sessions maps a session ID to { email }.
const users = {};
const sessions = {};

// getSession is already written for you. It reads the "sessionId" cookie
// from the request and looks up the matching session. It returns
// { sessionId, email } for a valid session, or null when there is none.
function getSession(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((part) => part.trim().split("="))
  );
  const sessionId = cookies["sessionId"];
  if (!sessionId || !sessions[sessionId]) return null;
  return { sessionId, email: sessions[sessionId].email };
}

// Already written. Leave this route as it is.
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }
  if (users[email]) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  users[email] = { password };
  res.json({ message: "Registration successful" });
});

app.post("/login", (req, res) => {
  // The credential check is already written. Leave it as it is.
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  // TODO: (1) Create a session for this user. Session IDs must be impossible
  // to guess, so use crypto.randomUUID():
  //   const sessionId = crypto.randomUUID();
  //   sessions[sessionId] = { email };
  // TODO: (2) Send the session ID to the browser as a cookie:
  //   res.setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly; SameSite=Strict; Max-Age=3600`);
  // TODO: (3) Respond with res.json({ message: "Login successful" });
  res.status(501).json({ message: "Login sessions not implemented yet" });
});

app.get("/me", (req, res) => {
  // TODO: (4) Report who is logged in.
  //   1. Look up the session: const session = getSession(req);
  //   2. If there is no session, respond and stop:
  //      res.status(401).json({ message: "Not logged in" });
  //      return;
  //   3. Otherwise respond with the email:
  //      res.json({ email: session.email });
  res.status(501).json({ message: "GET /me not implemented yet" });
});

app.post("/logout", (req, res) => {
  // TODO: (5) End the session.
  //   1. Look up the session: const session = getSession(req);
  //   2. If there is one, remove it from the server:
  //      delete sessions[session.sessionId];
  //   3. Tell the browser to delete its cookie by sending an empty value
  //      that expires immediately:
  //      res.setHeader("Set-Cookie", "sessionId=; HttpOnly; Max-Age=0");
  //   4. Respond with res.json({ message: "Logged out" });
  res.status(501).json({ message: "POST /logout not implemented yet" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
