const express = require("express");
const router = express.Router();
const ordersController = require("../../../controllers/api/v1/orders");

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrderById);
router.put("/:id", ordersController.updateOrderStatus);
router.delete("/:id", ordersController.deleteOrder);

module.exports = router;