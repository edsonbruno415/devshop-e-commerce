const product = (dbConnection) => {

    const getPagination = (params, registros) => {
        const sizePage = params.sizePage ? parseInt(params.sizePage) : 3;
        const currentPage = params.currentPage ? parseInt(params.currentPage) : 0 ;
        const pages = Math.ceil(registros / sizePage);

        return {
            sizePage,
            currentPage,
            pages
        }
    }
    const getProductsByCategoryId = async (id, params) => {
        const counter = await dbConnection.from("products").count("*",{ as: "total"});
        const pagination = getPagination(params, counter[0].total);
        const products = await dbConnection.from("products").select("*").whereIn("id", function () {
            this
                .from("categories_products")
                .select("categories_products.product_id")
                .where("categories_products.category_id", id);
        }).offset(pagination.sizePage*pagination.currentPage).limit(pagination.sizePage);

        return {
            products,
            pagination
        }
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