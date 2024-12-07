const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        name: String,
        email: String,
        phone: String,
    },
    shoeConfig: {
        size: Number,
        colors: {
            laces: String,
            sole: String,
            extras: String,
        },
    },
    status: {
        type: String,
        enum: ["in production", "shipped", "cancelled"],
        default: "in production",
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);