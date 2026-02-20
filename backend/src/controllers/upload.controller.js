const db = require("../config/db");
const parseFile = require("../utils/parseFile");

exports.uploadFile = async (req, res, next) => {
    const connection = await db.getConnection();

    try {
        const userId = req.user.id;
        const data = await parseFile(req.file);

        if (!data || data.length === 0) {
            return res.status(400).json({ message: "Empty file" });
        }

        console.log("First Row:", data[0]); // 🔥 DEBUG

        await connection.beginTransaction();

        const values = data.map(row => [
            userId,
            row.name || row.Name,
            row.email || row.Email,
            row.mobile || row.Mobile,
            row.address || row.Address,
            row.total_invoice_amount || row["Total Invoice Amount"],
            row.total_amount_paid || row["Total Amount Paid"],
            row.total_amount_due || row["Total Amount Due"],
        ]);

        await connection.query(
            `INSERT INTO buyers 
            (user_id, name, email, mobile, address, total_invoice_amount, total_amount_paid, total_amount_due)
            VALUES ?`,
            [values]
        );

        await connection.commit();

        res.json({ message: "File uploaded successfully" });

    } catch (err) {
        await connection.rollback();
        next(err);
    } finally {
        connection.release();
    }
};
