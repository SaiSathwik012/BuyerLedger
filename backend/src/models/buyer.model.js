const db = require("../config/db");

const getBuyersWithPagination = async (userId, search, limit, offset) => {
    const [rows] = await db.query(
        `SELECT * FROM buyers
         WHERE user_id = ?
         AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)
         LIMIT ? OFFSET ?`,
        [userId, `%${search}%`, `%${search}%`, `%${search}%`, limit, offset]
    );

    const [count] = await db.query(
        `SELECT COUNT(*) as total FROM buyers
         WHERE user_id = ?
         AND (name LIKE ? OR email LIKE ? OR mobile LIKE ?)`,
        [userId, `%${search}%`, `%${search}%`, `%${search}%`]
    );

    return { data: rows, total: count[0].total };
};

module.exports = { getBuyersWithPagination };
