const init = (db) => {
    const router = require("express").Router();

    const admin = require('./admin');
    const home = require("./home");
    const categories = require("./categories");
    const products = require("./products");
    const auth = require("../controllers/auth");

    //auth
    router.use("/",home());
    router.post("/login", auth.login(db));
    router.get("/logout", auth.logout );

    //router
    router.use('/admin', admin(db));
    router.use("/categorias",categories(db));
    router.use("/produtos", products(db));
    return router;
}

module.exports = init;