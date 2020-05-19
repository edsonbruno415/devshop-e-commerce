const slug = require("../utils/arrayWithSlug");
const categorySchema = require('../models/validation/category');
const validation = require('../models/validation/validation');

const getCategory = async (db, req, res) => {
    const { id } = req.params;
    const productsDB = await db.getProductsByCategoryId(id);
    const products = slug.products(productsDB);
    const category = await db.getCategoryById(id);
    res.render("category", {
        category: category[0],
        products
    });
}

const adminGetCategories = async (db, req, res) => {
    const categories = await db.getCategories();

    res.render("admin/categories/index", { categories });
}

const adminCreateCategory = async (db, req, res) => {
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

const adminUpdateCategory = async (db, req, res) => {
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

const adminRemoveCategory = async (db, req, res) => {
    await db.removeCategoryById(req.params.id);
    res.redirect("/admin/categorias");
}

module.exports = {
    getCategory,
    adminGetCategories,
    adminCreateCategory,
    adminUpdateCategory,
    adminRemoveCategory
}