const express = require("express");
const router = express.Router();
const authController = require("../../../controllers/api/v1/auth");
const authMiddleware = require("../../../middlewares/auth");

router.post("/login", authController.login);
router.put("/change-password", authMiddleware, authController.changePassword);

module.exports = router;