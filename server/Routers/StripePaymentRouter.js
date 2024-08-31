const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel');
const generateRandomOrderId = require('../utils/generateOrderId');
const nodemailer = require('nodemailer');



router.post('/approve-payment/:orderId', async (req, res) => {
    const { orderId } = req.params;
  
    try {
      const order = await Order.findOne({ orderId });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Update payment status to approved and generate the order ID
      order.paymentStatus = 'approved';
      order.orderId = generateRandomOrderId();
  
      await order.save();
  
      // Send email notification to the student about the payment approval
      const mailOptions = {
        from: process.env.GMAIL,
        to: order.email,
        subject: 'Payment Approved - Your Order with Assignment Ask 3',
        text: `Dear ${order.name},
  
  We are pleased to inform you that your payment has been approved. Below is your Order ID:
  
  Order ID: ${order.orderId}
  
  Your order is now being processed. We will keep you updated on the status of your order and notify you once it has been completed.
  
  Best regards,
  
  Assignmentask3
  assignmentask3@gmail.com
  www.assignmentask3.com
  `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email');
        } else {
          console.log('Email sent');
        }
      });
  
      res.status(200).json({
        message: 'Payment approved and Order ID generated',
        order
      });
    } catch (error) {
      res.status(500).json({ message: 'Error approving payment', error });
    }
  });
  

  module.exports = router;