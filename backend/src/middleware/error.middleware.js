const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    if (err.message === "Invalid file type") {
        return res.status(400).json({ message: "Only CSV or Excel files allowed" });
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }

    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorMiddleware;
