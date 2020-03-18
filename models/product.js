const product = (dbConnection) => {
    return {
        getProductsByCategoryId: (id) => {
            return dbConnection.from("products").select("*").where("id", function () {
                this
                    .from("categories_products")
                    .select("categories_products.product_id")
                    .whereRaw("categories_products.product_id = products.id")
                    .where("categories_products.category_id", id);
            });
        }
    }
}

module.exports = product;