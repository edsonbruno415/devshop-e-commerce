const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const db = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "devshop"
    }
});

db.on("query", query => {
    console.log("SQL method Query:", query);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",async(req, res)=>{
    const categories = await db.from("categories").select("*");
    res.render("home", { categories });
});

app.get("/categorias/:id", async(req, res)=>{
    const categories = await db.from("categories").select("*");
    const products = await db.from("products").select("*").where("id", function(){
        this
            .from("categories_products")
            .select("categories_products.product_id")
            .whereRaw("categories_products.product_id = products.id")
            .where("categories_products.category_id", req.params.id);
    });
    res.render("category", {
        categories, 
        category: categories[req.params.id-1], 
        products
    });
});

app.listen(port,(err)=>{
    if(err){
        console.log("application dont running because ", err);
    }else{
        console.log("DevShop running on port", port);
    }
});