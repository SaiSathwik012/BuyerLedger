const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../models/blacklist.model");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    if (await isBlacklisted(token))
        return res.status(401).json({ message: "Token invalidated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};
