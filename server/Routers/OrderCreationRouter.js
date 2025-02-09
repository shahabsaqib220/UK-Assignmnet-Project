const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel');
const generateRandomOrderId = require('../utils/generateOrderId');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const connectDB = require('../db');

dotenv.config();
connectDB();

// Nodemailer Transporter with optimized settings
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  },
});

// Utility to extract file paths
const extractRelativePath = (url) => {
  try {
    const parts = url.split('/o/')[1].split('?')[0]; // Extracts path after '/o/'
    return decodeURIComponent(parts); // Decode percent-encoded characters
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

// Route to create a new order
router.post('/create', async (req, res) => {
  const {
    name, email, phone, academicLevel, deadline, wordCount, paperType,
    problemFileUrl, requirementFileUrl, descriptionFileUrl, paymentReceiptUrl,
  } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !academicLevel || !deadline || !wordCount || !paperType || !paymentReceiptUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const orderId = generateRandomOrderId(); // Generate unique order ID

  const newOrder = new Order({
    name,
    email,
    phone,
    academicLevel,
    orderId,
    deadline,
    wordCount,
    paperType,
    problemFilePath: problemFileUrl ? extractRelativePath(problemFileUrl) : null,
    requirementFilePath: requirementFileUrl ? extractRelativePath(requirementFileUrl) : null,
    descriptionFilePath: descriptionFileUrl ? extractRelativePath(descriptionFileUrl) : null,
    paymentReceiptUrl: paymentReceiptUrl ? extractRelativePath(paymentReceiptUrl) : null,
  });

  try {
    const savedOrder = await newOrder.save();

    // Prepare email content
    const mailOptions = {
      from: `"Assignment Ask 3" <${process.env.GMAIL}>`, // Verified sender
      to: email,
      subject: 'Order Pending - Payment Approval Required',
      html: `
        <div style="background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 20px;">
            <h2 style="color: #343a40; text-align: center;">Order Pending - Payment Approval Required</h2>
            <p>Dear ${name},</p>
            <p>Thank you for placing an order with Assignment Ask 3. Your payment receipt has been received, and your order is currently pending while we verify your payment.</p>
            <p>You will be notified once your payment is approved. In the meantime, feel free to contact us if you have any questions.</p>
            <p style="text-align: center;">
              <strong>Contact Us</strong><br>
              <a href="mailto:assignmentask3@gmail.com" style="color: #007bff;">assignmentask3@gmail.com</a><br>
              <a href="http://www.assignmentask3.com" style="color: #007bff;">www.assignmentask3.com</a><br>
              +44 7851 410518
            </p>
            <p style="text-align: center; font-size: 14px; color: #6c757d;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      message: 'Order created successfully and is pending payment approval',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

module.exports = router;
