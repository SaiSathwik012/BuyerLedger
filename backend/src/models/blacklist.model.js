const db = require("../config/db");

const blacklistToken = (token, expiresAt) => {
    return db.query(
        "INSERT INTO token_blacklist (token, expires_at) VALUES (?, ?)",
        [token, expiresAt]
    );
};

const isBlacklisted = async (token) => {
    const [rows] = await db.query(
        "SELECT * FROM token_blacklist WHERE token = ?",
        [token]
    );
    return rows.length > 0;
};

module.exports = { blacklistToken, isBlacklisted };
