import express from "express"; // express module (create a web server)
import session from "express-session"; // stores a little data per logged-in user
import passport from "passport"; // authentication middleware
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // "Log in with Google"
import path from "path"; // work with file paths
import { fileURLToPath } from "url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read credentials from environment variables (loaded from the .env file by
// "node --env-file=.env" — see the "start" script in package.json).
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;

// Same little JSON "database" of users as before. There is no password column
// this time: Google vouches for the user, so we only store who they are.
const db = new Low(new JSONFile("users.json"), { users: [] });
await db.read();
if(!db.data) { db.data = { users: [] }; }
if(!db.data.users) { db.data.users = []; }

const app = express();

// --- Middleware ---------------------------------------------------------

app.use(express.json()); // parse JSON request bodies (req.body)

// express-session keeps track of who is logged in across requests.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); // turn Passport on
app.use(passport.session()); // let Passport read the logged-in user from the session

app.use(express.static(path.join(__dirname, "public"))); // serve index.html, etc.

// --- Passport configuration --------------------------------------------

// A "strategy" is one way to verify a user. The Google strategy sends the
// user to Google to log in; Google then redirects back to our callbackURL
// with a "profile" describing them.
passport.use(new GoogleStrategy(
    {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        // Google has confirmed who this person is. Look them up by the
        // stable Google id, and create a record the first time we see them.
        const email = profile.emails?.[0]?.value;

        await db.read();
        let user = db.data.users.find((u) => u.googleId === profile.id);
        if(!user) {
            user = { created: Date.now(), googleId: profile.id, email, name: profile.displayName };
            db.data.users.push(user);
            await db.write();
        }
        return done(null, user); // success: hand Passport the user
    }
));

// When a user logs in, store only their Google id in the session.
passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

// On every later request, turn that stored id back into the full user.
passport.deserializeUser(async (googleId, done) => {
    await db.read();
    const user = db.data.users.find((u) => u.googleId === googleId);
    done(null, user);
});

// --- Routes -------------------------------------------------------------

// Step 1: send the user off to Google to log in. We ask for their basic
// profile and email address ("scope").
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

// Step 2: Google redirects back here. Passport runs the strategy above to
// finish logging the user in, then we send them to the home page.
app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login.html" }),
    (req, res) => {
        res.redirect("/");
    }
);

app.post("/logout", (req, res) => {
    req.logout(() => { // Passport clears the user from the session
        res.send("Logged out");
    });
});

app.get("/me", (req, res) => {
    if(req.isAuthenticated()) { // Passport adds this helper
        res.json({ email: req.user.email, name: req.user.name });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
