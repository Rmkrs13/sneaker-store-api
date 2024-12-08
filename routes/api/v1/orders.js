const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");
const authMiddleware = require("../../../middlewares/auth");

// Orders routes
router.post("/", ordersController.createOrder); // Public route to create an order
router.get("/", authMiddleware, ordersController.getAllOrders); // Admin only: Get all orders
router.get("/:id", authMiddleware, ordersController.getOrderById); // Admin only: Get a specific order
router.patch("/:id", authMiddleware, ordersController.updateOrderStatus); // Admin only: Update order status
router.delete("/:id", authMiddleware, ordersController.deleteOrder); // Admin only: Delete an order

module.exports = router;