// auth-demo, stage 7: authentication with Passport
// Reading: "Local Authentication with Passport"
//
// The auth server one last time, rebuilt on libraries instead of by hand:
//   - Express (stage 6) replaces the http / fs / path plumbing
//   - express-session replaces the sessions object, the cookie parsing, and
//     the Set-Cookie headers from stages 4 and 5
//   - Passport's local strategy runs the login check, and its serializeUser /
//     deserializeUser pair decides what a session remembers
//
// What survives from stage 3 untouched: the lowdb database, bcrypt, and the
// registration logic. The static/ pages are the same files as stage 5; the
// client cannot tell which server it is talking to.
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 07-passport/server.js
// Then visit http://localhost:3000

// #region setup
import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// #endregion

// #region database
const db = new Low(new JSONFile(path.join(__dirname, 'users.json')), { users: [] });

await db.read();
if (!db.data) { // the database file does not exist yet
    db.data = { users: [] };
}
if (!db.data.users) { // ...or an older file is missing the users field
    db.data.users = [];
}
// #endregion

// #region middleware
const app = express();

app.use(session({
    secret: 'change-this-in-a-real-app',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
// #endregion

// #region strategy
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            await db.read();

            const foundUser = db.data.users.find((user) => {
                return user.email.toLowerCase() === email.toLowerCase();
            });

            if (foundUser) {
                const match = await bcrypt.compare(password, foundUser.password);
                if (match) {
                    return done(null, foundUser);
                } else {
                    return done(null, false); // incorrect password
                }
            } else {
                return done(null, false); // never found the user
            }
        }
    )
);
// #endregion

// #region serialize
passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
    await db.read();

    const foundUser = db.data.users.find((user) => {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    done(null, foundUser);
});
// #endregion

// #region static
app.use(express.static(path.join(__dirname, 'static')));
// #endregion

// #region login-route
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.send('Login successful');
});
// #endregion

// #region register-route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    await db.read();

    const userExists = db.data.users.find((user) => {
        return user.email.toLowerCase() === email.toLowerCase();
    });

    if (userExists) {
        res.writeHead(409); // conflict
        return res.end('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        created: Date.now(),
        email,
        password: hashedPassword
    };
    db.data.users.push(newUser);
    await db.write();

    res.writeHead(201); // created
    res.end('User registered successfully');
});
// #endregion

// #region logout-route
app.post('/logout', (req, res) => {
    req.logout(() => {
        res.send('Logged out');
    });
});
// #endregion

// #region me-route
app.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ email: req.user.email });
    } else {
        res.status(401).send('Unauthorized');
    }
});
// #endregion

// #region listen
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
// #endregion
