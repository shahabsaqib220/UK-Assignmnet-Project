const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { bucket } = require('../Configurations/firebase');
const Order = require('../Models/orderCreationModel'); // Import your Order model
const cors = require('cors');
const connectDB = require('../db');

const router = express.Router();
dotenv.config();

connectDB();

router.use(cors());

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Set up nodemailer transporter with secure SMTP connection
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Use port 587 for secure connection with TLS
  secure: false, // Use TLS
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD, // Ensure this is an app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates in dev
  },
});

router.post('/:orderId', upload.fields([{ name: 'solutionFile1' }, { name: 'solutionFile2' }]), async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = req.files;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updateData = { status: 'completed' };

    if (files.solutionFile1) {
      const file1 = files.solutionFile1[0];
      const filePath1 = `solutions/${orderId}/solutionFile1_${file1.originalname}`;
      const file = bucket.file(filePath1);

      await file.save(file1.buffer);
      const fileUrl1 = `https://storage.googleapis.com/${bucket.name}/${filePath1}`;

      updateData.solutionFilePath1 = fileUrl1;
    }

    if (files.solutionFile2) {
      const file2 = files.solutionFile2[0];
      const filePath2 = `solutions/${orderId}/solutionFile2_${file2.originalname}`;
      const file = bucket.file(filePath2);

      await file.save(file2.buffer);
      const fileUrl2 = `https://storage.googleapis.com/${bucket.name}/${filePath2}`;

      updateData.solutionFilePath2 = fileUrl2;
    }

    await Order.updateOne({ orderId }, { $set: updateData });

    // Send email notification
    const mailOptions = {
      from: `"Assignment Ask 3" <${process.env.GMAIL}>`, // Ensure recognizable sender
      to: order.email,
      subject: `Order Completed: [Order ID: ${orderId}]`,
      html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333;">Your Order [Order ID: ${orderId}] Has Been Successfully Completed</h2>
            <p>Dear ${order.name},</p>
            <p>We are pleased to inform you that your order with ID <strong>${orderId}</strong> has been successfully completed.</p>
            <p>If you have any questions or need further assistance, please feel free to contact us.</p>
            <p>Thank you for choosing Assignment Ask 3.</p>
            <p style="text-align: center; color: #333;">Best regards,</p>
            <p style="text-align: center; color: #333;">
              Assignment Ask 3<br>
              <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a><br>
              <a href="tel:+447851410518" style="color: #007BFF;">+44 7851 410518</a><br>
              <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a>
            </p>
          </div>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ error: 'Error sending email', details: error.message });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Files uploaded and email sent successfully' });
    });
  } catch (error) {
    console.error('Error uploading files:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
