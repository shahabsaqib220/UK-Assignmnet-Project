const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel'); // Adjust the path to your Order model
const { sendEmail } = require('../utils/emailService'); // Adjust the path to your email service

// Route to approve payment
router.post("/approvepayment", async (req, res) => {
    const { orderId } = req.body; // Extract orderId from the request body

    try {
        // Find the order by orderId and update isPaymentApproved to true
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId }, // Find the order by orderId
            { isPaymentApproved: true }, // Update the payment status
            { new: true } // Return the updated document
        );

        // If the order is not found, return a 404 status
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
            
        }

        // Send an email to the user to notify them that the payment was approved
        const emailText = `
Dear ${updatedOrder.name},

We are pleased to inform you that your payment has been successfully processed. We truly appreciate your trust in our services.

Order Details:
- Order ID: ${orderId}
- Payment Status: Approved

Our team is now working on your order with the utmost priority. Should you have any further questions or need additional assistance, please do not hesitate to contact us.

Thank you once again for choosing us. We look forward to delivering exceptional results for you.

Best regards,

assignmentask3 
www.assignmentask3.com
assignmentask3@gmail.coom

`;
        await sendEmail(updatedOrder.email, 'Payment Approved', emailText);

        // Respond with a success message and the updated order
        res.status(200).json({ message: 'Payment approved successfully, email sent', order: updatedOrder });
    } catch (error) {
        console.error(`Failed to approve payment for order ${orderId}:`, error);
        res.status(500).json({ message: 'Failed to approve payment' });
    }
});







// Route to decline payment without sending the orderId in the email
router.post('/declinepayment', async (req, res) => {
    const { orderId } = req.body;

    try {
        // Update the order's isPaymentApproved to false
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { isPaymentApproved: false },
            { new: true } // Return the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send email to the user without the orderId
        const emailText = `
Dear Student,

We regret to inform you that your recent payment attempt was unsuccessful. As a result, your order has not been processed.


We apologize for any inconvenience this may cause and appreciate your understanding.

Best regards,

assignmentask3 
www.assignmentask3.com 
assignmentask3@gmail.com 
+44 7851 410518
`;

        await sendEmail(updatedOrder.email, 'Payment Declined', emailText);

        res.status(200).json({ message: 'Payment declined successfully, email sent', order: updatedOrder });
    } catch (error) {
        console.error(`Failed to decline payment for order ${orderId}:`, error);
        res.status(500).json({ message: 'Failed to decline payment' });
    }
});

module.exports = router;
