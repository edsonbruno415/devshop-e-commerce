const dbConnection = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "devshop"
    }
});

dbConnection.on("query", query => {
    console.log("SQL method Query:", query);
});

const dbMethods = (dbConnection) => {
    return {
        getCategories: () => {
            return dbConnection.from("categories").select("*");
        },
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
const db = dbMethods(dbConnection);

module.exports = db;

