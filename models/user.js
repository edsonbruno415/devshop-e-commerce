const User = db => {

    const getUserByEmail = async (email) => {
        const user = await db.from("users").select("*").where("email", email).limit(1);
        return user;
    }

    const getUsersCount = async () => {
        const totalUsers = await db.from("users").count("id as total");
        return totalUsers;
    }

    const insertUser = async (user) => {
        const result = await db.from("users").insert(user);
        return result;
    }

    return {
        getUserByEmail,
        getUsersCount,
        insertUser
    }
}

module.exports = User;