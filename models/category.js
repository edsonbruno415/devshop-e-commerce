const category = (dbConnection) => {
    return {
        getCategories: () => {
            return dbConnection.from("categories").select("*");
        },
        getCategoryById: (id) => {
            return dbConnection.from("categories").select("*").where("id",id);
        }
    }
}

module.exports = category;