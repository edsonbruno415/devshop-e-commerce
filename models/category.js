const schemaValidation = require('./validation/category');

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

    function removeCategoryById(id){
        return dbConnection.from("categories").where({ id }).del();
    }

    function updateCategory( id, category ){
        return dbConnection.from("categories").where({ id }).update( category );
    }

    return {
        getCategories,
        getCategoryById,
        createCategory,
        removeCategoryById,
        updateCategory
    }
}

module.exports = category;