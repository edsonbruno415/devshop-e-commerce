const slug = require("../utils/arrayWithSlug");

const getCategory = async(db, req, res) => {
    const { id, cat } = req.params;
    const productsDB = await db.getProductsByCategoryId(id);
    const products = slug.products(productsDB);
    const category = await db.getCategoryById(id);
    res.render("category", {
        category: category[0],
        products
    });
}

module.exports = {
    getCategory
}