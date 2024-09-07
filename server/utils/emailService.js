const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Dotenv configuration
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., Gmail, Outlook, etc.
  auth: {
    user: process.env.GMAIL, // Replace with your email
    pass: process.env.GMAIL_APP_PASSWORD,  // Replace with your email password or an app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.GMAIL, // Replace with your email
    to,
    subject,
    html: htmlContent, // Changed from `text` to `html` to support HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

module.exports = { transporter, sendEmail };
