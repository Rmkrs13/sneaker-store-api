const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  shoeConfig: {
    type: {
      laces: { type: String, required: true },
      sole: { type: String, required: true },
      material: { type: String, required: false },
      additionalFeatures: { type: Array, default: [] }
    },
    required: true
  },
  status: { type: String, enum: ['Pending', 'In Production', 'Shipped'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);