// routes/uploadSolution.js
const express = require('express');
const dotenv = require('dotenv')
const multer = require('multer');
const nodemailer = require('nodemailer');
const { bucket } = require('../Configurations/firebase');
const Order = require('../Models/orderCreationModel'); // Import your Order model
const cors = require('cors');

const router = express.Router();
dotenv.config();

router.use(cors());


// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service you prefer
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD // Make sure to use an app-specific password
  }
});

router.post('/:orderId', upload.fields([{ name: 'solutionFile1' }, { name: 'solutionFile2' }]), async (req, res) => {
  try {
    const { orderId } = req.params;
    const files = req.files;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

 
    const updateData = {
      status: 'completed' // Set the status to 'completed'
    };

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
      from: process.env.GMAIL,
      to: order.email,
      subject: `Your Order [Order ID: ${orderId}] Has Been Successfully Completed`,
      html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333; text-transform: uppercase;">Your Order [Order ID: ${orderId}] Has Been Successfully Completed</h2>
            <p>Dear Student,</p>
            <p>We are pleased to inform you that your order with the ID ${orderId} has been successfully completed.</p>
            <p>Thank you for choosing our services. We hope to work with you again in the future.</p>
            <p>If you have any questions or need further assistance, please do not hesitate to reach out to our support team.</p>
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
        console.error("Error sending email:", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'Files uploaded and paths updated successfully' });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
