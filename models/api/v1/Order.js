const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number, required: true },
      country: { type: String, required: true },
    },
    shoeConfig: {
      size: { type: Number, required: true },
      colors: {
        laces: { type: String, required: true },
        sole: { type: String, required: true },
        body: { type: String, required: true },
      },
    },
    status: {
      type: String,
      enum: ["Pending", "In Production", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

module.exports = mongoose.model("Order", orderSchema);