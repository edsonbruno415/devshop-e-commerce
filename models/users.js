const dbConnection = require("knex")({
    client: "mysql2",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "devshop"
    }
});

const bcryptjs = require("bcryptjs");

const getHash = password => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
}

(async()=>{
    const count = await dbConnection.from("users").count("id as total");
    
    if(count[0].total === 0){
        await dbConnection.from("users").insert({
            name: "Admin",
            email: "admin@devshop.com",
            password: getHash("root"),
            email_checked: true,
            roles: "Admin, Financial, Customer",
            created: new Date(),
            updated: new Date()
        });
    }

    const user = await dbConnection.from("users").where({ id: 2});
    console.log(bcryptjs.compareSync('roo',user[0].password));

})();