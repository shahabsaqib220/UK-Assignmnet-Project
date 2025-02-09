const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Order = require('../Models/orderCreationModel');
const generateRandomOrderId = require('../utils/generateOrderId');
const connectDB = require('../db');

dotenv.config();
connectDB();

// Create reusable transporter object using SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // For Gmail or replace with your SMTP provider
  port: 465, // Secure port
  secure: true, // Use SSL
  auth: {
    user: process.env.GMAIL, // Your email address
    pass: process.env.GMAIL_APP_PASSWORD, // App password or SMTP credentials
  },
});

// Approve Payment and Notify Route
router.post('/approve-payment/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status
    order.paymentStatus = 'approved';
    order.orderId = generateRandomOrderId();

    await order.save();

    // Construct email
    const mailOptions = {
      from: `"Assignment Ask 3" <${process.env.GMAIL}>`, // Sender's name and email
      to: order.email, // Recipient's email
      subject: 'Payment Approved - Your Order with Assignment Ask 3',
      html: `
        <div style="background-color: #759FBC; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333;">Payment Approved</h2>
            <p>Dear ${order.name},</p>
            <p>We are pleased to inform you that your payment has been approved. Your Order ID is:</p>
            <p style="font-weight: bold; color: #333;">${order.orderId}</p>
            <p>Your order is now being processed. You will be notified once it is complete.</p>
            <p style="text-align: center; color: #333;">Best regards,</p>
            <p style="text-align: center; color: #333;">
              Assignmentask3<br>
              <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a><br>
              <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a>
            </p>
          </div>
        </div>
      `,
      headers: {
        'X-Custom-Header': 'AssignmentAsk3',
        'Message-ID': `<${order.orderId}@assignmentask3.com>`, // Unique ID for the email
      },
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ message: 'Email not sent', error });
      }
      console.log(`Email sent: ${info.response}`);
      res.status(200).json({
        message: 'Payment approved and notification sent',
        order,
      });
    });
  } catch (error) {
    console.error('Error approving payment:', error.message);
    res.status(500).json({ message: 'Error approving payment', error });
  }
});

module.exports = router;
