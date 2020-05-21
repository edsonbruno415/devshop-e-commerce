const product = (dbConnection) => {

    const getProductsByCategoryId = async (id) => {
        const products = await dbConnection.from("products").select("*").whereIn("id", function () {
            this
                .from("categories_products")
                .select("categories_products.product_id")
                .where("categories_products.category_id", id);
        });

        return products;
    }

    const getProducts = async () => {
        const products = await dbConnection.from("products").select("*");
        return products;
    }

    const getProductById = async (id) => {
        const product = await dbConnection.from("products").select("*").where("id", id);
        return product;
    }

    return {
        getProducts,
        getProductById,
        getProductsByCategoryId
    }
}

module.exports = product;