const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customer: {
        name: String,
        email: String,
        phone: String,

        adress: String,
        city: String,
        state: String,
        zip: String,
        country: String,
    },
    shoeConfig: {
        size: Number,
        colors: {
            laces: String,
            sole: String,
            body: String,
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