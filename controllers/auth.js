/*
const user = {
    name: "Admin",
    email: "admin@devshop.com",
    password: getHash("root"),
    email_checked: true,
    roles: "Admin, Financial, Customer",
    created: new Date(),
    updated: new Date()
}
*/
const bcryptjs = require("bcryptjs");

const getHash = password => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
}

const checkPassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}

const login = db => async (req, res) => {
    let { email, password } = req.body;

    try {
        const user = await db.getUserByEmail(email);
        console.log(user.length);
        if(user.length === 0){
            throw new Error("User is invalid!");
        }
        if (!checkPassword( password, user[0].password)) {
            throw new Error("This password is invalid!");
        }
        res.send(user);
    }
    catch (err) {
        res.send('Error: '+ err);
    }
}

module.exports = {
    login
}