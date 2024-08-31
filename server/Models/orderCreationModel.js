// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  academicLevel: { type: String, required: true },
  deadline: { type: Date, required: true },
  wordCount: { type: String, required: true },
  paperType: { type: String, required: true },
  orderId: { type: String, required: true, unique: true },
  problemFilePath: { type: String, required: true },
  requirementFilePath: { type: String, default: null },
  descriptionFilePath: { type: String, default: null },
  solutionFilePath1: { type: String, default: null },
  solutionFilePath2: { type: String, default: null },
  isPaymentApproved: { type: Boolean, default: null },
  paymentReceiptUrl: { type: String, default: null },
  status: { 
    type: String, 
    default: 'pending', 
    enum: ['pending', 'completed'] 
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
