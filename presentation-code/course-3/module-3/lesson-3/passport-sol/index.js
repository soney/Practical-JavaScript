import express from "express"; // express module (create a web server)
import session from "express-session"; // stores a little data per logged-in user
import passport from "passport"; // authentication middleware
import { Strategy as LocalStrategy } from "passport-local"; // email + password login
import bcrypt from "bcrypt"; // hash and check passwords
import path from "path"; // work with file paths
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Same little JSON "database" of users as before.
const db = new Low(new JSONFile("users.json"), { users: [] });
await db.read();
if(!db.data) { db.data = { users: [] }; }
if(!db.data.users) { db.data.users = []; }

const app = express();

// --- Middleware ---------------------------------------------------------

app.use(express.json()); // parse JSON request bodies (req.body)

// express-session keeps track of who is logged in across requests.
app.use(session({
    secret: "change-this-secret-in-a-real-app",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // turn Passport on
app.use(passport.session()); // let Passport read the logged-in user from the session

app.use(express.static(path.join(__dirname, "public"))); // serve index.html, etc.

// --- Passport configuration --------------------------------------------

// A "strategy" is one way to verify a user. The local strategy checks an
// email and password. Our login form sends "email", so we name that field.
passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        await db.read();
        const user = db.data.users.find((u) => {
            return u.email.toLowerCase() === email.toLowerCase();
        });
        if(!user) { return done(null, false); } // no such user
        const match = await bcrypt.compare(password, user.password);
        if(!match) { return done(null, false); } // wrong password
        return done(null, user); // success: hand Passport the user
    }
));

// When a user logs in, store only their email in the session.
passport.serializeUser((user, done) => {
    done(null, user.email);
});

// On every later request, turn that stored email back into the full user.
passport.deserializeUser(async (email, done) => {
    await db.read();
    const user = db.data.users.find((u) => u.email === email);
    done(null, user);
});

// --- Routes -------------------------------------------------------------

// Passport runs the local strategy. If it succeeds, we reach this handler;
// if it fails, Passport responds with 401 Unauthorized for us.
app.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("Login successful!");
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    await db.read();
    const userExists = db.data.users.find((u) => {
        return u.email.toLowerCase() === email.toLowerCase();
    });
    if(userExists) {
        return res.status(409).send("User already exists"); // conflict
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.data.users.push({ created: Date.now(), email, password: hashedPassword });
    await db.write();

    res.status(201).send("User registered successfully");
});

app.post("/logout", (req, res) => {
    req.logout(() => { // Passport clears the user from the session
        res.send("Logged out");
    });
});

app.get("/me", (req, res) => {
    if(req.isAuthenticated()) { // Passport adds this helper
        res.json({ email: req.user.email });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
