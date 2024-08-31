const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/RegistrationAdminModel');
const Otp = require('../Models/OtpPasswordResetModel');
const dotenv = require("dotenv")

const router = express.Router();

dotenv.config();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Request OTP
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

    await Otp.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true }
    );

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset OTP',
      text: `Dear User,

We have received a request to reset your password.

Your One-Time Password (OTP) is: ${otp}

Please note that this OTP is valid for the next 3 minutes. If you do not use it within this time frame, you will need to request a new OTP.

If you did not request this password reset, please disregard this email.

Best regards,
www.assignmentask3.com
`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, otp, password, repeatPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord || otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Admin.updateOne({ email }, { password: hashedPassword });

    await Otp.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
