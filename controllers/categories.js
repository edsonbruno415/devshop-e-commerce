const init = db => {

    const slug = require("../utils/arrayWithSlug");
    const categorySchema = require('../models/validation/category');
    const validation = require('../models/validation/validation');

    const getCategory = async (req, res) => {
        const { id } = req.params;
        const data = await db.getProductsByCategoryId(id, req.query);
        data.products = slug.products(data.products);
        const category = await db.getCategoryById(id);
        res.render("category", {
            category: category[0],
            products: data.products,
            pagination: data.pagination
        });
    }

    const adminGetCategories = async (req, res) => {
        const categories = await db.getCategories();

        res.render("admin/categories/index", { categories });
    }

    const adminCreateCategory = async (req, res) => {
        if (req.method === "GET") {
            res.render("admin/categories/create", {
                errors: [],
                form: {}
            });
        } else {
            try {
                const category = req.body;
                const categoryValidate = validation.validation(category, categorySchema);
                await db.createCategory(categoryValidate);
                res.redirect("/admin/categorias");
            } catch (err) {
                res.render("admin/categories/create", {
                    errors: err.errors,
                    form: req.body
                });
            }
        }
    }

    const adminUpdateCategory = async (req, res) => {
        if (req.method === "GET") {
            const categoryDB = await db.getCategoryById(req.params.id);
            res.render("admin/categories/create", {
                errors: [],
                form: categoryDB[0]
            });
        } else {
            try {
                const category = req.body;
                const categoryValidate = validation.validation(category, categorySchema);
                await db.updateCategory(req.params.id, categoryValidate);
                res.redirect("/admin/categorias");
            } catch (err) {
                res.render("admin/categories/create", {
                    errors: err.errors,
                    form: req.body
                });
            }
        }
    }

    const adminRemoveCategory = async (req, res) => {
        await db.removeCategoryById(req.params.id);
        res.redirect("/admin/categorias");
    }

    return {
        getCategory,
        adminGetCategories,
        adminCreateCategory,
        adminUpdateCategory,
        adminRemoveCategory
    }
}

module.exports = init; 