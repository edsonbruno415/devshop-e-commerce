const productsRouter = db => {
    const express = require("express");
    const products = require("../controllers/products")(db);
    const router = express.Router();

    router.get("/", products.getProducts);
    router.get("/:id/:prod", products.getProduct);

    return router;
}

module.exports = productsRouter;
