const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/api/v1/auth");
const authMiddleware = require("../../../middleware/auth");

router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.put("/change-password", authMiddleware, authController.changePassword);

module.exports = router;