const category = (dbConnection) => {

    function getCategories() {
        return dbConnection.from("categories").select("*");
    }

    function getCategoryById(id) {
        return dbConnection.from("categories").select("*").where("id", id);
    }

    return {
        getCategories,
        getCategoryById
    }
}

module.exports = category;