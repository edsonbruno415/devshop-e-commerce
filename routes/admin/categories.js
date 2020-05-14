const express = require("express");
const categories = require("../../controllers/categories");

const categoriesRouter = db => {
    const router = express.Router();

    router.get("/", (req,res)=> res.send('admin/categorias'));

    return router;
}

module.exports = categoriesRouter;
