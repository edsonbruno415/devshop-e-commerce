const slug = require("../utils/arrayWithSlug");
const categoryValidation = require('../models/validation/category');

const getCategory = async(db, req, res) => {
    const { id } = req.params;
    const productsDB = await db.getProductsByCategoryId(id);
    const products = slug.products(productsDB);
    const category = await db.getCategoryById(id);
    res.render("category", {
        category: category[0],
        products
    });
}

const adminGetCategories = async(db, req, res) =>{
    const categories = await db.getCategories();

    res.render("admin/categories/index",{ categories });
}

const adminCreateCategory = async(db, req, res) => {
    if(req.method === "GET"){
        res.render("admin/categories/create");
    }else{
        try{
            const category = req.body;
            await db.createCategory(category);
            res.send('SUCESSS');
        }catch(error){
            res.send('ERRORRRR');
        }
       // await db.createCategory(category);
    }
}

module.exports = {
    getCategory,
    adminGetCategories,
    adminCreateCategory
}