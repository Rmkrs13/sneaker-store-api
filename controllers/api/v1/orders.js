const Order = require("../../../models/api/v1/Order");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    req.io.emit("newOrder", order); // Notify via WebSocket
    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ status: "fail", message: "Order not found" });
    }
    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ status: "success", data: orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ status: "fail", message: "Order not found" });
    }
    req.io.emit("updateOrder", order); // Notify via WebSocket
    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ status: "fail", message: "Order not found" });
    }
    req.io.emit("deleteOrder", { id: req.params.id }); // Notify via WebSocket
    res.status(200).json({ status: "success", message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};