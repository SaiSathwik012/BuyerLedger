const router = require("express").Router();
const upload = require("../middleware/upload.middleware");
const auth = require("../middleware/auth.middleware");
const { uploadFile } = require("../controllers/upload.controller");

router.post("/", auth, upload.single("file"), uploadFile);

module.exports = router;
