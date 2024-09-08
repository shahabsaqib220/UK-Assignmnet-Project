const express = require('express');
const router = express.Router();
const Email = require('../Models/RegisterStudentEmailModel');
const validateEmail = require('../middlewares/validateStudentEmail');
const { sendEmail } = require('../utils/emailService');

const mongoose = require('mongoose');

// @route   POST /registeremail
// @desc    Register a new email
router.post('/registeremail', validateEmail, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email } = req.body;

    // Check if email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Save new email to the database
    const newEmail = new Email({ email });
    await newEmail.save({ session });

    // Send email notification
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



    
    

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Email registered successfully', email: newEmail });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Transaction failed:', error);
    res.status(500).json({ error: 'Server error. Email was not saved.' });
  }
});

// @route   GET /get-all-emails
// @desc    Retrieve all registered emails
router.get('/get-all-emails', async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json(emails);
  } catch (error) {
    console.error('Failed to retrieve emails:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /delete-email/:id
// @desc    Delete a single email by ID
router.delete('/delete-email/:id', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const email = await Email.findByIdAndDelete(req.params.id, { session });

    if (!email) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'Email not found' });
    }

    // Send email notification
    await sendEmail(
  email.email,
  'Notice of Email Deletion - www.assignmentask3.com',
  `
  <div style="font-family: Arial, sans-serif; background-color: #4B543B; color: #ffffff; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background-color: #4B543B; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <!-- Uppercase subject -->
      <h2 style="font-size: 24px; font-weight: bold; text-transform: uppercase; color: #ffffff; margin-bottom: 20px;">
        Notice of Email Deletion
      </h2>

      <!-- Email content -->
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Dear Student,
      </p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        We would like to inform you that your email has been successfully removed from our system as per your request.
      </p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Please note that you will no longer receive any updates, notifications, or communications from Assignment Ask3 to this email address.
      </p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        If this was not your intention or if you have any concerns, please contact our support team immediately.
      </p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        We value your privacy and are committed to ensuring your data is handled with the utmost care.
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        Thank you for your time, and please do not hesitate to reach out if you need any further assistance.
      </p>

      <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">
        Best regards,<br>
        <a href="http://www.assignmentask3.com" style="color: #ffffff; text-decoration: none;">www.assignmentask3.com</a><br>
        <a href="mailto:assignmentask3@gmail.com" style="color: #ffffff; text-decoration: none;">assignmentask3@gmail.com</a><br>
        +44 7851 410518
      </p>

      <!-- Logo below the text -->
      <div style="text-align: center; margin-top: 20px;">
        <img src="https://firebasestorage.googleapis.com/v0/b/assignment-ask3.appspot.com/o/logo.jpeg?alt=media&token=6664b601-898d-4354-a17d-1cb70dd3d887" 
             alt="Assignmentask3 Logo" 
             style="width: 150px; height: auto;" />
      </div>
    </div>
  </div>
  `
);


    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Failed to delete email:', error);
    res.status(500).json({ error: 'Server error. Email was not deleted.' });
  }
});

// @route   DELETE /delete-all-emails
// @desc    Delete all registered emails
router.delete('/delete-all-emails', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const emails = await Email.find({}, null, { session }); // Get all emails before deletion

    if (emails.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'No emails found' });
    }

    await Email.deleteMany({}, { session });

    // Send email notifications to all users
 const emailPromises = emails.map(({ email }) =>
  sendEmail(
    email,
    'Notice of Email Deletion - www.assignmentask3.com',
    `
    <div style="font-family: Arial, sans-serif; background-color: #2E2E2E; color: #ffffff; padding: 20px; text-align: center;">
      <div style="max-width: 600px; margin: auto; background-color: #2E2E2E; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <!-- Uppercase subject -->
        <h2 style="font-size: 24px; font-weight: bold; text-transform: uppercase; color: #ffffff; margin-bottom: 20px;">
          Notice of Email Deletion
        </h2>
        <!-- Email content -->
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; text-align: center;">
          Dear Student,
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; text-align: center;">
          We would like to inform you that your email has been successfully removed from our system as per your request.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; text-align: center;">
          Please note that you will no longer receive any updates, notifications, or communications from Assignment Ask3 to this email address.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; text-align: center;">
          If this was not your intention or if you have any concerns, please contact our support team immediately.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; text-align: center;">
          We value your privacy and are committed to ensuring your data is handled with the utmost care.
        </p>
        <p style="font-size: 16px; line-height: 1.8; text-align: center;">
          Thank you for your time, and please do not hesitate to reach out if you need any further assistance.
        </p>
        <p style="font-size: 16px; line-height: 1.8; margin-top: 20px; text-align: center;">
          Best regards,<br>
          <a href="http://www.assignmentask3.com" style="color: #ffffff; text-decoration: none;">www.assignmentask3.com</a><br>
          <a href="mailto:assignmentask3@gmail.com" style="color: #ffffff; text-decoration: none;">assignmentask3@gmail.com</a><br>
          +44 7851 410518
        </p>

        <!-- Logo below the text -->
        <div style="text-align: center; margin-top: 20px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/assignment-ask3.appspot.com/o/logo.jpeg?alt=media&token=6664b601-898d-4354-a17d-1cb70dd3d887" 
               alt="Assignmentask3 Logo" 
               style="width: 150px; height: auto;" />
        </div>
      </div>
    </div>
    `
  )
);

    
    

    await Promise.all(emailPromises);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'All emails deleted successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Failed to delete all emails:', error);
    res.status(500).json({ error: 'Server error. Emails were not deleted.' });
  }
});

module.exports = router;
