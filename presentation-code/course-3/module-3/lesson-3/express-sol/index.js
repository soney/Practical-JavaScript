import express from "express"; // express module (create a web server)
import path from "path"; // path module (work with paths)
import { fileURLToPath } from "url"; // convert module URL to a file path

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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

// Serve the static files (index.html, css, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// GET /search?query=...&maxPrice=... -> returns matching product names as JSON
app.get("/search", (req, res) => {
    const response = { results: [] };
    const query = req.query.query;
    const maxPrice = Number(req.query.maxPrice);
    console.log(query);
    console.log(maxPrice);

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
