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

        if (user.length === 0) {
            throw new Error("User is invalid!");
        }
        if (!checkPassword(password, user[0].password)) {
            throw new Error("This password is invalid!");
        }

        req.session.user = user[0];
        res.redirect("/");
    }
    catch (err) {
        res.send('Error: ' + err);
    }
}

const logout = (req, res) => {
    req.session.destroy(() => {

    });
    res.redirect("/");
}

module.exports = {
    login,
    logout
}