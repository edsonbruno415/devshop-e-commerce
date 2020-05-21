const category = (dbConnection) => {

    const getCategories = async () => {
        const categories = await dbConnection.from("categories").select("*");
        return categories;
    }

    const getCategoryById = async (id) => {
        const category = await dbConnection.from("categories").select("*").where("id", id);
        return category;
    }

    const createCategory = async (category) => {
        const result = await dbConnection.from("categories").insert(category);
        return result;
    }

    const removeCategoryById = async (id) => {
        const result = await dbConnection.from("categories").where({ id }).del();
        return result;
    }

    const updateCategory = async (id, category) => {
        const result = await dbConnection.from("categories").where({ id }).update(category);
        return result;
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