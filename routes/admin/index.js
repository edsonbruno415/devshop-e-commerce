const init = (db) => {
    const router = require("express").Router();

    const categories = require("./categories");
    //const products = require("./products");

    router.use("/categorias",categories(db));
    //router.use("/produtos", products(db));

    return router;
}

module.exports = init;