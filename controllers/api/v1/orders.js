const Order = require("../../models/api/v1/Order");

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);

    // Emit the new order event to all connected clients
    if (req.io) {
      req.io.emit("newOrder", newOrder);
    }

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort(req.query.sortby || "-createdAt");
    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single order
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an order
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};