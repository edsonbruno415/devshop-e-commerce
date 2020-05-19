const express = require("express");
const categories = require("../controllers/categories");

const categoriesRouter = db => {
    const router = express.Router();

    router.get("/:id/:cat", categories.getCategory.bind(null, db));
    

    return router;
}

module.exports = categoriesRouter;
