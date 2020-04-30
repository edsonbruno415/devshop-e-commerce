const init = (db) => {
    const router = require("express").Router();

    const home = require("./home");
    const categories = require("./categories");
    const products = require("./products");
    const auth = require("../controllers/auth");

    router.use("/",home());
    router.use("/categorias",categories(db));
    router.use("/produtos", products(db));
    router.post("/login", auth.login(db));
    return router;
}

module.exports = init;