const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel');

// GET route to fetch specific fields for orders with null payment status
router.get('/allpendingpayment', async (req, res) => {
    try {
        // Fetch orders where isPaymentApproved is null
        const orders = await Order.find({ isPaymentApproved: null }, 'name email phone academicLevel deadline wordCount paperType orderId');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
