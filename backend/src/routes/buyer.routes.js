const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getBuyers } = require("../controllers/buyer.controller");

router.get("/", auth, getBuyers);

module.exports = router;
