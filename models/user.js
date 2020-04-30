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

const checkPassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}

const User = db => {
    return {
        hasAdmin: async () => {
            const count = await db.from("users").count("id as total");

            if (count[0].total === 0) {
                await db.from("users").insert({
                    name: "Admin",
                    email: "admin@devshop.com",
                    password: getHash("root"),
                    email_checked: true,
                    roles: "Admin, Financial, Customer",
                    created: new Date(),
                    updated: new Date()
                });
            }
        },
        login: async (email, password) => {
            const user = await db.from("users").where({ email: email }).limit(1);
            console.log(user[0]);
            if (user[0].email !== email) {
                throw new Error("This email is invalid.");
            }
            if (!checkPassword(password, user[0].password)) {
                throw new Error("This password is invalid.");
            }
            return user;
        }
    }
}

module.exports = User;