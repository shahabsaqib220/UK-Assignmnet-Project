const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel'); // Assuming you have an Order model

// GET route to fetch all completed orders
router.get('/complete', async (req, res) => {
  try {
    // Find all orders with status 'completed'
    const completedOrders = await Order.find({ status: 'completed' }).select('name email phone academicLevel  wordCount paperType orderId status');

    if (completedOrders.length === 0) {
      return res.status(404).json({ message: "No completed orders found." });
    }

    // Return the completed orders
    res.json(completedOrders);
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// DELETE route to delete a specific order by ObjectId
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ObjectId and delete it
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Return a success message
    res.json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// DELETE route to delete all completed orders
router.delete('/delete-completed', async (req, res) => {
  try {
    // Delete all orders with status 'completed'
    const result = await Order.deleteMany({ status: 'completed' });

    // Return a success message with the number of deleted orders
    res.json({ message: `${result.deletedCount} completed orders deleted successfully.` });
  } catch (error) {
    console.error("Error deleting completed orders:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});






module.exports = router;
