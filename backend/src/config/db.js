const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 🔥 Test connection immediately
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
        connection.release();
    }
});

module.exports = db.promise();
