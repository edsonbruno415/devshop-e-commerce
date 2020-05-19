const init = (db) => {
    const router = require("express").Router();

    const admin = require('./admin')(db);
    const home = require("./home");
    const categories = require("./categories")(db);
    const products = require("./products")(db);
    const auth = require("../controllers/auth");

    //auth
    router.use("/", home());
    router.post("/login", auth.login(db));
    router.get("/logout", auth.logout);

    //router
    router.use('/admin', admin);
    router.use("/categorias", categories);
    router.use("/produtos", products);
    return router;
}

module.exports = init;