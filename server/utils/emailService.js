const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Dotenv configuration
dotenv.config();

// Configure the transporter with SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server
  port: 465, // Use 465 for SSL or 587 for STARTTLS
  secure: true, // Set to true for port 465, false for port 587
  auth: {
    user: process.env.GMAIL, // Gmail address
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  },
});

/**
 * Function to send an email
 * @param {string} to - Recipient's email address
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML content for the email
 */
const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"AssignmentAsk3" <${process.env.GMAIL}>`, // Sender's name and email
    to, // Recipient's email
    subject, // Email subject
    html: htmlContent, // HTML content of the email
    headers: {
      'X-Priority': '1', // Mark email as high priority
      'X-Mailer': 'Nodemailer', // Specify the mailer
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
  }
};

module.exports = { transporter, sendEmail };
