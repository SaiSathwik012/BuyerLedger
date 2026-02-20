const router = require("express").Router();
const {
    register,
    login,
    refresh,
    logout,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);   // ✅ ADD THIS
router.post("/logout", authMiddleware, logout); // ✅ ADD THIS

module.exports = router;
