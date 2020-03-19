const dbConnection = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "devshop"
    }
});
//Showing database methods running on database
/*
dbConnection.on("query", query => {
    console.log("SQL method Query:", query);
});
*/
//Database methods from models
const category = require("./category")(dbConnection);
const product = require("./product")(dbConnection);

const db = {
    ...category,
    ...product
};

module.exports = db;


