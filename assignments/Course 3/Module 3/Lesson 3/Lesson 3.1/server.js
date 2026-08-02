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
  // TODO: (1) Read the submitted values from the request body:
  //   const { email, password } = req.body;
  // TODO: (2) If either value is missing, respond and stop:
  //   res.status(400).json({ message: "Email and password required" });
  //   return;
  // TODO: (3) If users[email] already exists, respond and stop:
  //   res.status(409).json({ message: "User already exists" });
  //   return;
  // TODO: (4) Store the new user: users[email] = { password };
  // TODO: (5) Respond with res.json({ message: "Registration successful" });
  res.status(501).json({ message: "Register route not implemented yet" });
});

app.post("/login", (req, res) => {
  // TODO: (6) Read email and password from req.body, then look up the user:
  //   const { email, password } = req.body;
  //   const user = users[email];
  // TODO: (7) If there is no user, or user.password does not equal the
  // submitted password, respond with the SAME generic message for both
  // cases, and stop:
  //   res.status(401).json({ message: "Invalid credentials" });
  //   return;
  // (Using one shared message means an attacker cannot tell which part
  // was wrong.)
  // TODO: (8) Respond with res.json({ message: "Login successful" });
  res.status(501).json({ message: "Login route not implemented yet" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
