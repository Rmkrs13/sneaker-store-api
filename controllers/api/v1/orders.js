const Order = require("../../../models/api/v1/Order");

// POST /api/v1/orders
const createOrder = async (req, res) => {
    try {
        const { user, shoeConfig } = req.body;
        const order = new Order({ user, shoeConfig });
        await order.save();
        res.status(201).json({ status: "success", message: "Order created", data: { order } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

// GET /api/v1/orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({ status: "success", data: { orders } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

// GET /api/v1/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", data: { order } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

// PUT /api/v1/orders/:id
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", message: "Order updated", data: { order } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

// DELETE /api/v1/orders/:id
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ status: "fail", message: "Order not found" });
        }
        res.json({ status: "success", message: "Order deleted", data: { order } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};