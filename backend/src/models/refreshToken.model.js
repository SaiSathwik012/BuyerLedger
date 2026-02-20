const db = require("../config/db");

const saveRefreshToken = (userId, token, expiresAt) => {
    return db.query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
        [userId, token, expiresAt]
    );
};

const findRefreshToken = (token) => {
    return db.query("SELECT * FROM refresh_tokens WHERE token = ?", [token]);
};

const deleteRefreshToken = (token) => {
    return db.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};

module.exports = {
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
};
