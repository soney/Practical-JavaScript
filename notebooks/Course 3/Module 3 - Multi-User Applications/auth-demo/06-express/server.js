// auth-demo, stage 6: a first Express server
// Reading: "Local Authentication with Passport" (first half: the Express.js video)
//
// Not a step in the auth server: this is the little grocery-search server
// the Express.js video builds, to introduce Express before stage 7 rebuilds
// the auth server with it. Compare it with the Module 2 demo servers: the
// routing ifs, the static-file code, and the manual JSON responses have all
// disappeared into Express calls.
//
// (The Express documentation shows require('express'); this project uses
// import statements throughout, which Express supports equally well.)
//
// Run it (from the auth-demo folder, after `npm install`):
//     node 06-express/server.js
// Then visit http://localhost:3000 and search; the results appear in the
// browser console (open it with F12 or Cmd+Option+I)

// #region whole-server
// #region setup
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// #endregion

// #region products
// The same grocery list the Module 2 "Serving Dynamic Content" server used.
const products = [
    { name: 'Milk', price: 3.49 },
    { name: 'Eggs', price: 2.99 },
    { name: 'Orange Juice', price: 4.29 },
    { name: 'Bread', price: 2.49 },
    { name: 'Butter', price: 3.79 },
    { name: 'Cheese', price: 5.19 },
    { name: 'Apples', price: 1.99 },
    { name: 'Bananas', price: 0.69 }
];
// #endregion

// #region app
const app = express();
// #endregion

// #region static
// One line replaces the whole static file server from Module 2: the
// fs.readFile call, the content types, and the 404 handling.
app.use(express.static(path.join(__dirname, 'sample-static-page')));
// #endregion

// #region search
app.get('/search', (req, res) => {
    const response = { 'results': [] };
    const query = req.query.query;
    const maxPrice = Number(req.query.maxPrice);

    for (const product of products) {
        if (product.price <= maxPrice) {
            response.results.push(product.name);
        }
    }
    res.json(response);
});
// #endregion

// #region listen
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
// #endregion
// #endregion
