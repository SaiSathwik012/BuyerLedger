const db = require("../config/db");

const createUser = async (name, email, mobile, password) => {
    return db.query(
        "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)",
        [name, email, mobile, password]
    );
};

const findUserByEmailOrMobile = async (emailOrMobile) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ? OR mobile = ?",
        [emailOrMobile, emailOrMobile]
    );
    return rows;
};

const checkExistingUser = async (email, mobile) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ? OR mobile = ?",
        [email, mobile]
    );
    return rows;
};

module.exports = {
    createUser,
    findUserByEmailOrMobile,
    checkExistingUser,
};
