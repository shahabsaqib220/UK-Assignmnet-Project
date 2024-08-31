const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");

const Order = require("../Models/orderCreationModel");

router.use(cors());

// Route to get all pending orders with isPaymentApproved set to true
router.get("/", async (req, res) => {
  try {
    // Fetch all pending orders where isPaymentApproved is true
    const pendingOrders = await Order.find({ status: "pending", isPaymentApproved: true });

    if (!pendingOrders.length) {
      return res.status(404).json({ message: "No pending orders found" });
    }

    // Prepare response data
    const ordersData = pendingOrders.map(order => ({
      name: order.name,
      email: order.email,
      phone: order.phone,
      academicLevel: order.academicLevel,
      deadline: order.deadline,
      wordCount: order.wordCount,
      paperType: order.paperType,
      orderId: order.orderId,
      createdAt: order.createdAt,
      problemFilePath: order.problemFilePath,
      requirementFilePath: order.requirementFilePath,
      descriptionFilePath: order.descriptionFilePath
    }));

    res.status(200).json(ordersData);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
