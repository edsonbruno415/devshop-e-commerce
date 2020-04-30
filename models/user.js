const User = db => {
    return {
        getUserByEmail: (email) => {
            return db.from("users").select("*").where("email",email).limit(1);
        },
        getUsersCount: () =>{
            return db.from("users").count("id as total");
        },
        insertUser: (user) => {
            return db.from("users").insert(user);
        }
    }
}

module.exports = User;