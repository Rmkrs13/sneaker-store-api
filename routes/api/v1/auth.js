const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/api/v1/auth");

router.post("/login", authController.login);
router.post("/change-password", authController.changePassword);

module.exports = router;