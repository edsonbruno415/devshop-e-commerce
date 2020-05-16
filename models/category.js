const category = (dbConnection) => {

    function getCategories() {
        return dbConnection.from("categories").select("*");
    }

    function getCategoryById(id) {
        return dbConnection.from("categories").select("*").where("id", id);
    }

    function createCategory(category){
        return dbConnection.from("categories").insert(category);
    }

    return {
        getCategories,
        getCategoryById,
        createCategory
    }
}

module.exports = category;