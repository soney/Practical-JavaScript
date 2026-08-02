// A registration and login server. The Express setup, the in-memory user
// store, and the provided page are already wired up for you. Your work is
// the two routes, marked with TODO comments.

const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage (already set up for you). users maps an email to
// { password }. For example, after one registration it might look like:
//   { "ada@example.com": { password: "s3cret" } }
const users = {};

app.post("/register", (req, res) => {
  // SOLUTION: validate the submitted values, then store the new user
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
  // SOLUTION: check the credentials, using one generic message for both
  // an unknown email and a wrong password
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  res.json({ message: "Login successful" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
