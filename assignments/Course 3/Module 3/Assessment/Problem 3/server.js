// A tiny login server. The list of accounts is already loaded for you from
// users.json, and every stored password is a bcrypt HASH, never the real
// password. Your only job is the password check inside POST /login: look up
// the account, compare the submitted password against the stored hash, and
// answer with success or failure. The spots to fill in are marked TODO.

const express = require("express");
const fs = require("fs");
const path = require("path");
// bcryptjs is already installed and imported for you.
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// The accounts are read from users.json when the server starts (already done
// for you). `users` maps a username to a record like
// { name: "Alice Nguyen", passwordHash: "$2a$..." }. Do not edit users.json.
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "users.json"), "utf8")
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // TODO: (1) Look up the account in `users` by username:
  //       const user = users[username];

  // TODO: (2) If there is no such user, reject the login and stop:
  //       res.status(401).json({ message: "Invalid credentials" });
  //       return;

  // TODO: (3) The stored password is a bcrypt hash, so you cannot compare it
  //       with ===. Use bcrypt.compare (await it) to check the submitted
  //       password against the stored hash:
  //       const valid = await bcrypt.compare(password, user.passwordHash);

  // TODO: (4) If it does not match, reject the login and stop the same way:
  //       res.status(401).json({ message: "Invalid credentials" });
  //       return;

  // TODO: (5) If it matches, welcome the user by name:
  //       res.json({ message: "Welcome back, " + user.name + "!" });

  res.status(501).json({ message: "Login route not implemented yet" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
