const http = require("http"); // http module (create a web server)
const fs = require("fs"); // filesystem module (read files)
const path = require("path"); // path module (work with paths)

const express = require('express');

const products = [
    { name: "Milk", price: 3.49 },
    { name: "Eggs", price: 2.99 },
    { name: "Orange Juice", price: 4.29 },
    { name: "Bread", price: 2.49 },
    { name: "Butter", price: 3.79 },
    { name: "Cheese", price: 5.19 },
    { name: "Apples", price: 1.99 },
    { name: "Bananas", price: 0.69 }
];

const app = express();

app.use(express.static('sample-static-page'));
app.get("/search", (req, res) => {
    const response = { 'results': [] };
    const query = req.query.query;
    const maxPrice = Number(req.query.maxPrice);

    for(const product of products) {
        if(product.price <= maxPrice) {
            response.results.push(product.name);
        }
    }
    res.json(response);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});