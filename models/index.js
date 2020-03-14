const dbMethods = (db) => {
    return {
        categoriesAll: () => {
            return db.from("categories").select("*");
        },
        productsByCategoryId: (id) => {
            return db.from("products").select("*").where("id", function () {
                this
                    .from("categories_products")
                    .select("categories_products.product_id")
                    .whereRaw("categories_products.product_id = products.id")
                    .where("categories_products.category_id", id);
            });
        }
    }
}

module.exports = dbMethods;


