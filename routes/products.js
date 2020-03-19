const express = require("express");
const products = require("../controllers/products");

const productsRouter = db => {
    const router = express.Router();

    router.get("/", products.getProducts.bind(null, db));
    router.get("/:id/:prod", products.getProduct.bind(null, db));

    return router;
}

module.exports = productsRouter;
