const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByEmailOrMobile,
} = require("../models/user.model");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../utils/generateTokens");
const {
    saveRefreshToken,
    findRefreshToken,
    deleteRefreshToken,
} = require("../models/refreshToken.model");
const { blacklistToken } = require("../models/blacklist.model");

exports.register = async (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        await createUser(name, email, mobile, hashedPassword);
        res.status(201).json({ message: "Registered successfully" });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { emailOrMobile, password } = req.body;
        const users = await findUserByEmailOrMobile(emailOrMobile);
        if (!users.length)
            return res.status(400).json({ message: "Invalid credentials" });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const decoded = jwt.decode(refreshToken);
        await saveRefreshToken(user.id, refreshToken, new Date(decoded.exp * 1000));

        res.json({ accessToken, refreshToken });
    } catch (err) {
        next(err);
    }
};

exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(401).json({ message: "Refresh token required" });

    const [rows] = await findRefreshToken(refreshToken);
    if (!rows.length)
        return res.status(403).json({ message: "Invalid refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );

    res.json({ accessToken });
};

exports.logout = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);
    await blacklistToken(token, new Date(decoded.exp * 1000));
    res.json({ message: "Logged out successfully" });
};
