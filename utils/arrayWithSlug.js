const slug = require("./slug");

const arrayWithSlug = ()=>{
    return {
        categories: (arrayCategories) => {
            if (arrayCategories !== null) {
                const categories = arrayCategories.map(cat => {
                    return { ...cat, categorySlug: slug(cat.category) };
                });
                return categories;
            }else{
                return arrayCategories;
            }
        },
        products: (arrayProducts) => {
            if (arrayProducts !== null) {
                const products = arrayProducts.map(prod => {
                    return { ...prod, slug: slug(prod.name) };
                });
                return products;
            }else{
                return arrayProducts;
            }
        }
    }
}

module.exports = arrayWithSlug();