const categoriesRouter = db => {
    const express = require("express");
    const categories = require("../../controllers/categories")(db);
    const router = express.Router();

    router.get("/", categories.adminGetCategories);
    router.use("/criar", categories.adminCreateCategory);

    router.get("/excluir/:id", categories.adminRemoveCategory);

    router.use("/editar/:id", categories.adminUpdateCategory);

    return router;
}

module.exports = categoriesRouter;
