const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");
const authMiddleware = require("../../../middleware/auth");

router.post("/", ordersController.createOrder); // Public route to create an order
router.delete("/:id", authMiddleware, ordersController.deleteOrder); // Admin only
router.put("/:id", authMiddleware, ordersController.updateOrderStatus); // Admin only
router.get("/:id", authMiddleware, ordersController.getOrderById); // Admin only
router.get("/", authMiddleware, ordersController.getAllOrders); // Admin only

module.exports = router;