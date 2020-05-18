const schemaValidation = require('./validation/category');

const category = (dbConnection) => {

    function getCategories() {
        return dbConnection.from("categories").select("*");
    }

    function getCategoryById(id) {
        return dbConnection.from("categories").select("*").where("id", id);
    }

    function extractErrors(error){
        return error.reduce((prev, curr)=>{
            if(prev[curr.path[0]]){
                prev[curr.path[0]].push(curr.type);
            }else{
                prev[curr.path[0]] = [curr.type];
            }
            return prev;
        }, {} );
    }

    function createCategory(category){
        const { error , value } = schemaValidation.validate(category, { abortEarly: false, stripUnknown: true });

        if(error){
            throw new Error({message: 'ValidationError', errors: extractErrors(error.details)});
        }else{
            return dbConnection.from("categories").insert(value);
        }
    }

    return {
        getCategories,
        getCategoryById,
        createCategory
    }
}

module.exports = category;