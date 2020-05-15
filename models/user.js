const User = db => {

    function getUserByEmail(email) {
        return db.from("users").select("*").where("email", email).limit(1);
    }

    function getUsersCount() {
        return db.from("users").count("id as total");
    }

    function insertUser(user) {
        return db.from("users").insert(user);
    }

    return {
        getUserByEmail,
        getUsersCount,
        insertUser
    }
}

module.exports = User;