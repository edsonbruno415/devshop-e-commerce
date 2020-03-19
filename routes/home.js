const express = require("express");

const homeRouter = () => {
    const router = express.Router();
    const home = require("../controllers/home");

    router.get("/",home.getHome);

    return router;
}

module.exports = homeRouter;