const category = (dbConnection) => {
    return {
        getCategories: () => {
            return dbConnection.from("categories").select("*");
        }
    }
}

module.exports = category;