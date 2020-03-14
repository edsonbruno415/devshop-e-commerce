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
        }
    }
}

module.exports = arrayWithSlug();