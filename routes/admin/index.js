const init = (db) => {
    const router = require("express").Router();

    /*
    router.use((req, res, next)=>{
        if(req.session.user){
            if(req.session.user.roles.indexOf("Admin") >= 0){
                next();
            }else{
               res.redirect("/");
            }
        }else{
            res.redirect("/login");
        }
    });
    */

    const categories = require("./categories");
    //const products = require("./products");

    router.get("/", (req, res)=> res.render("admin/index"));
    router.use("/categorias",categories(db));
    //router.use("/produtos", products(db));

    return router;
}

module.exports = init;