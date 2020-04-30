const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

const slug = require("./utils/arrayWithSlug");
const db = require("./models/index");
const routes = require("./routes/index");
const session = require("express-session");

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "MyDevShopRoles",
    name: "sessionId"
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use(async (req, res, next) => {
    const categoriesDB = await db.getCategories();
    const categories = slug.categories(categoriesDB);
    res.locals.user = req.session.user;
    res.locals.categories = categories;
    next();
});

app.use(routes(db));

app.listen(port, (err) => {
    if (err) {
        console.log("application dont running because ", err);
    } else {
        console.log("DevShop running on port", port);
    }
});