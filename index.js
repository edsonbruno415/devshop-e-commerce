const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req, res)=>{
    res.render("home");
});

app.listen(port,(err)=>{
    if(err){
        console.log("application dont running because ", err);
    }else{
        console.log("DevShop running on port", port);
    }
});