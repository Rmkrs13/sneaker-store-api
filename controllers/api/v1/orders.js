const Order = require("../../../models/api/v1/Order");
const io = require("../../../utils/socket"); // For WebSocket updates

// Create a new order
const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Emit the new order to all connected clients
        io.emit("newOrder", order);

        res.status(201).json({ status: "success", data: order });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", message: "Order deleted", data: order });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", data: updatedOrder });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// Get a single order
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", data: order });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ status: "success", data: orders });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

module.exports = {
    createOrder,
    deleteOrder,
    updateOrderStatus,
    getOrderById,
    getAllOrders,
};