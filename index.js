const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const slug = require("./utils/arrayWithSlug");
const db = require("./models/index");
const categories = require("./controllers/categories");
const products = require("./controllers/products");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
    const categoriesDB = await db.getCategories();
    const categories = slug.categories(categoriesDB);
    res.locals.categories = categories;
    next();
});

app.get("/", async (req, res) => {
    res.render("home");
});

app.get("/categorias/:id/:cat", categories.getCategory.bind(null, db));

app.get("/produtos", async(req, res) => {
    const products = await db.getProducts();
    const productsWithSlug = slug.products(products);
    res.render("products",{
        products: productsWithSlug
    });
});

app.get("/produtos/:id/:prod", products.getProduct.bind(null, db));

app.listen(port, (err) => {
    if (err) {
        console.log("application dont running because ", err);
    } else {
        console.log("DevShop running on port", port);
    }
});