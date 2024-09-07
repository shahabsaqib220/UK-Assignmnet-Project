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
        html: `
          <div style="background-color: #759FBC; padding: 20px; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="text-align: center; color: #333; text-transform: uppercase;">Payment Approved - Your Order with Assignment Ask 3</h2>
              <p>Dear ${order.name},</p>
              <p>We are pleased to inform you that your payment has been approved. Below is your Order ID:</p>
              <p style="font-weight: bold; color: #333;">Order ID: ${order.orderId}</p>
              <p>Your order is now being processed. We will keep you updated on the status of your order and notify you once it has been completed.</p>
              <p style="text-align: center; color: #333;">Best regards,</p>
              <p style="text-align: center; color: #333;">
                Assignmentask3<br>
                <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a><br>
                <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a>
              </p>
            </div>
          </div>
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