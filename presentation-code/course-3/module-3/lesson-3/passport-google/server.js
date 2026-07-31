import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import express from 'express';
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const db = new Low(new JSONFile('users.json'), { users: [] });

await db.read();
if(!db.data) { // database does not exist
    db.data = { users: [] };
}
if(!db.data.users) {
    db.data.users = [];
}

const app = express();

app.use(session({
    secret: "change-this-in-a-real-app",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        { 
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            await db.read();

            const foundUser = db.data.users.find((user) => {
                return user.googleId === profile.id;
            });
            if(!foundUser) {
                const newUser = {
                    created: Date.now(),
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName
                };

                db.data.users.push(newUser);
                await db.write();
                return done(null, newUser);
            }
            return done(null, foundUser);
            /*

            if(foundUser) {
                const match = await bcrypt.compare(password, foundUser.password);
                if(match) {
                    return done(null, foundUser);
                } else {
                    return done(null, false); // incorrect password
                }
            } else {
                return done(null, false); // never found the user
            }
                */
        }
    )
);

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

app.use(express.static("static"));

app.post("/login", passport.authenticate("google"), (req, res) => {
    res.send("Login successful");
});
// app.post("/register", async (req, res) => {
//     const {email, password} = req.body;
//     await db.read();

//     const userExists = db.data.users.find((user) => {
//         return user.email.toLowerCase() === email.toLowerCase();
//     });

//     if(userExists) {
//         res.writeHead(409); // conflict
//         return res.end("User already exists");
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//         created: Date.now(),
//         email,
//         password: hashedPassword 
//     };
//     db.data.users.push(newUser);
//     await db.write();

//     res.writeHead(201);
//     res.end('User registered successfully');
// });

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"]}));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login.html"}), (req, res) => {
    res.redirect("/");
});

app.post("/logout", (req, res) => {
    req.logout(() => {
        res.send("Logged out");
    });
});
app.get("/me", (req, res) => {
    if(req.isAuthenticated()) {
        res.json( { email: req.user.email });
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});