const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel'); // Assuming you have an Order model

// POST route to search for orders by email and orderId
router.post('/search', async (req, res) => {
  try {
    const { email, orderId } = req.body;

    // Validate input
    if (!email || !orderId) {
      return res.status(400).json({ message: "Email and Order ID are required." });
    }

    // Search for the order in the database
    const order = await Order.findOne({ email, orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // If order is found, return it
    res.json(order);
  } catch (error) {
    console.error("Error searching for order:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
