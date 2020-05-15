const slug = require("../utils/arrayWithSlug");

const getCategory = async(db, req, res) => {
    const { id } = req.params;
    const productsDB = await db.getProductsByCategoryId(id);
    const products = slug.products(productsDB);
    const category = await db.getCategoryById(id);
    res.render("category", {
        category: category[0],
        products
    });
}

const adminGetCategories = async(db, req, res) =>{
    const categories = await db.getCategories();

    res.render("admin/categories/index",{ categories });
}

module.exports = {
    getCategory,
    adminGetCategories
}