const slug = require("../utils/arrayWithSlug");

const getProduct = async(db, req, res)=>{
    const { id } = req.params;
    const product = await db.getProductById(id);
    res.render("product", {
        product: product[0]
    });
}

const getProducts = async(db, req, res) => {
    const products = await db.getProducts();
    const productsWithSlug = slug.products(products);
    res.render("products",{
        products: productsWithSlug
    });
}

module.exports = {
    getProduct,
    getProducts
}