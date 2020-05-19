const categoriesRouter = db => {
    const express = require("express");
    const categories = require("../controllers/categories")(db);
    const router = express.Router();

    router.get("/:id/:cat", categories.getCategory);

    return router;
}

module.exports = categoriesRouter;
