const express = require('express');
const router = express.Router();
const Order = require('../Models/orderCreationModel');
const generateRandomOrderId = require('../utils/generateOrderId');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD  // Make sure to use an app-specific password
  }
});

// Function to extract relative path from full URL
const extractRelativePath = (url) => {
  try {
    const parts = url.split('/o/')[1].split('?')[0]; // Extracts the part after '/o/' and before any query parameters
    return decodeURIComponent(parts); // Decode any percent-encoded characters
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
};

router.post('/create', async (req, res) => {
  const { 
    name, email, phone, academicLevel, deadline, wordCount, paperType, 
    problemFileUrl, requirementFileUrl, descriptionFileUrl, 
    paymentReceiptUrl 
  } = req.body;

  if (!name || !email || !phone || !academicLevel || !deadline || !wordCount || !paperType || !paymentReceiptUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

   // Generate a unique orderId
   const orderId = generateRandomOrderId();

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
    paymentReceiptUrl: paymentReceiptUrl ? extractRelativePath(paymentReceiptUrl) : null 
    
  });
  

  try {
    const savedOrder = await newOrder.save();

    // Send an email notifying the student that their order is pending due to payment approval
    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: 'Order Pending Due to Payment Approval',
      html: `
        <div style="background-color: #759FBC; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333;">Order Pending Due to Payment Approval</h2>
            <p>Dear ${name},</p>
            <p>Thank you for your recent order with Assignment Ask 3. We have received your payment receipt, and your order is currently pending while we verify your payment.</p>
            <p>You will receive an email with your Order ID once your payment has been approved.</p>
            <p>Thank you for your patience.</p>
            <p style="text-align: center; color: #333;">Best regards,</p>
            <p style="text-align: center; color: #333;">
              Assignmentask3<br>
              <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a><br>
              <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a><br>
              +44 7851 410518
            </p>
          </div>
        </div>
      `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      message: 'Order created successfully and is pending payment approval',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});

module.exports = router;
