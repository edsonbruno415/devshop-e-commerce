const express = require("express");
const categories = require("../../controllers/categories");

const categoriesRouter = db => {
    const router = express.Router();

    router.get("/", categories.adminGetCategories.bind(null, db));
    router.use("/criar", categories.adminCreateCategory.bind(null, db));

    return router;
}

module.exports = categoriesRouter;
