const getProduct = async(db, req, res)=>{
    const { id, prod } = req.params;
    const product = await db.getProductById(id);
    res.render("product", {
        product: product[0]
    });
}

module.exports = {
    getProduct
}