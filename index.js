const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const slug = require("./utils/arrayWithSlug");
const dbConnection = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "devshop"
    }
});

dbConnection.on("query", query => {
    console.log("SQL method Query:", query);
});

const db = require("./models/index")(dbConnection);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    const categoriesDB = await db.categoriesAll();
    const categories = slug.categories(categoriesDB);
    res.render("home", { categories });
});

app.get("/categorias/:id/:cat", async (req, res) => {
    const { id, cat} = req.params;
    const categoriesDB = await db.categoriesAll();
    const categories = slug.categories(categoriesDB);
    const products = await db.productsByCategoryId(id);
    res.render("category", {
        categories,
        category: categories[id-1],
        products
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log("application dont running because ", err);
    } else {
        console.log("DevShop running on port", port);
    }
});