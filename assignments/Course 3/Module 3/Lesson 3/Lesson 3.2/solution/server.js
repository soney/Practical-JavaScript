// This registration and login server WORKS, but it has a serious problem:
// it stores every password as plain text. If anyone ever got a copy of the
// server's data, they would have every user's real password.
//
// Your job is to fix it with bcryptjs: hash the password during
// registration, and compare against the hash during login. The two spots
// to change are marked with TODO comments.

const express = require("express");
// bcryptjs is already installed and imported for you.
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// In-memory storage (already set up for you). users maps an email to a
// record object. Right now that record is { password }; after your fix it
// should be { passwordHash }.
const users = {};

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }
  if (users[email]) {
    res.status(409).json({ message: "User already exists" });
    return;
  }
  // SOLUTION: hash the password and store only the hash
  const passwordHash = await bcrypt.hash(password, 10);
  users[email] = { passwordHash };
  res.json({ message: "Registration successful" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  // SOLUTION: compare the submitted password against the stored hash
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  res.json({ message: "Login successful" });
});

// Provided for checking your work: shows what the server actually stores
// for each account. In a real app you would NEVER expose stored
// credentials like this; it exists here only so you and the tests can see
// whether the stored value is a hash. Do not change this route.
app.get("/stored-users", (req, res) => {
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
