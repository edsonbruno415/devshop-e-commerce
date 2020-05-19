const init = db => {

    const slug = require("../utils/arrayWithSlug");

    const getProduct = async (req, res) => {
        const { id } = req.params;
        const product = await db.getProductById(id);
        res.render("product", {
            product: product[0]
        });
    }

    const getProducts = async (req, res) => {
        const products = await db.getProducts();
        const productsWithSlug = slug.products(products);
        res.render("products", {
            products: productsWithSlug
        });
    }
    
    return {
        getProduct,
        getProducts
    }
}

module.exports = init;