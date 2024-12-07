const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Email = require('../Models/RegisterStudentEmailModel');
const { sendEmail } = require('../utils/emailService');




router.post('/registerBulkEmails', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { emails } = req.body;
  
      const validEmails = [];
  
      // Filter emails to exclude duplicates already in the database
      for (const email of emails) {
        const existingEmail = await Email.findOne({ email });
        if (!existingEmail) {
          const newEmail = new Email({ email });
          await newEmail.save({ session });
          validEmails.push(email); // Only include successfully saved emails for sending
        }
      }
  
      // Send welcome email to each valid, newly registered email
      for (const email of validEmails) {
        await sendEmail(
          email,
          'Welcome to Assignmentask3 - Email Registration Successful',
  `
  <div style="font-family: Arial, sans-serif; background-color: #2E2E2E; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #2E2E2E; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #ffffff; text-align: center; text-transform: uppercase;">Welcome to Assignmentask3</h2>
      <p style="color: #ffffff; font-size: 16px; line-height: 1.8;">Dear Student,</p>
      <p style="color: #ffffff; font-size: 16px; line-height: 1.8;">We are pleased to inform you that your email has been successfully registered with Assignmentask3.</p>
      <p style="color: #ffffff; font-size: 16px; line-height: 1.8;">This registration enables you to receive important updates, notifications, and exclusive content tailored to your preferences.</p>
      <p style="color: #ffffff; font-size: 16px; line-height: 1.8;">If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
      <p style="color: #ffffff; font-size: 16px; line-height: 1.8;">Thank you for choosing us.</p>
      <p style="text-align: center; color: #ffffff; font-size: 16px; line-height: 1.8;">
        Best regards,<br>
        <a href="http://www.assignmentask3.com" style="color: #007BFF; text-decoration: none;">Assignmentask3</a><br>
        <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF; text-decoration: none;">assignmentask3@gmail.com</a><br>
        +44 7851 410518
      </p>

      <!-- Logo below text -->
      <div style="text-align: center; margin-top: 20px;">
        <img src="https://firebasestorage.googleapis.com/v0/b/assignment-ask3.appspot.com/o/logo.jpeg?alt=media&token=6664b601-898d-4354-a17d-1cb70dd3d887" 
             alt="Assignmentask3 Logo" 
             style="width: 150px; height: auto;" />
      </div>
    </div>
  </div>
  `
        );
      }
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json({ message: 'Bulk emails registered successfully' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ error: 'An error occurred during bulk registration' });
    }
  });