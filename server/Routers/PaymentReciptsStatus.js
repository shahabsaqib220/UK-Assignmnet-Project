const express = require('express');
const cors = require('cors');
const router = express.Router();
const Order = require('../Models/orderCreationModel'); // Adjust the path to your Order model
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Enable CORS
router.use(cors());

// Create a secure transporter for Nodemailer
const transporter = nodemailer.createTransport({
    host:  'smtp.gmail.com', // Adjust host (e.g., Gmail, Outlook)
    port:  465, // Use 465 for SSL or 587 for STARTTLS
    secure: true, // True for 465, false for other ports
    auth: {
        user: process.env.GMAIL, // Your SMTP username (e.g., email)
        pass: process.env.GMAIL_APP_PASSWORD // Your SMTP password or app-specific password
    }
});

// Helper function to send emails
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"AssignmentAsk3" <${process.env.GMAIL}>`, // Sender address
            to, // Recipient email
            subject, // Email subject
            html // Email content
        });
        
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw new Error('Email sending failed');
    }
};

// Route to approve payment
router.post('/approvepayment', async (req, res) => {
    const { orderId } = req.body;

    try {
        console.log(`Attempting to approve payment for order ID: ${orderId}`);

        // Find and update the order
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { isPaymentApproved: true },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Email content for payment approval
        const emailText = `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; text-align: center;">Payment Approved</h2>
                <p>Dear ${updatedOrder.name},</p>
                <p>Your payment has been successfully approved for Order ID: ${orderId}.</p>
                <p>Our team will prioritize your order. For assistance, contact us.</p>
                <p style="text-align: center;">
                    <strong>AssignmentAsk3</strong><br>
                    <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a><br>
                    <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a>
                </p>
            </div>
        </div>
        `;

        await sendEmail(updatedOrder.email, 'Payment Approved', emailText);

        res.status(200).json({
            message: 'Payment approved successfully, email sent.',
            order: updatedOrder
        });
    } catch (error) {
        console.error(`Failed to approve payment for order ID ${orderId}:`, error);
        res.status(500).json({ message: 'Failed to approve payment' });
    }
});

// Route to decline payment
router.post('/declinepayment', async (req, res) => {
    const { orderId } = req.body;

    try {
        console.log(`Attempting to decline payment for order ID: ${orderId}`);

        // Update the order
        const updatedOrder = await Order.findOneAndUpdate(
            { orderId },
            { isPaymentApproved: false },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Email content for payment decline
        const emailText = `
        Dear Student,
        <p>We regret to inform you that your payment was unsuccessful. Your order has not been processed.</p>
        <p>If you need further assistance, contact us.</p>
        <p>
            <strong>AssignmentAsk3</strong><br>
            <a href="http://www.assignmentask3.com" style="color: #007BFF;">www.assignmentask3.com</a><br>
            <a href="mailto:assignmentask3@gmail.com" style="color: #007BFF;">assignmentask3@gmail.com</a><br>
            +44 7851 410518
        </p>
        `;

        await sendEmail(updatedOrder.email, 'Payment Declined', emailText);

        res.status(200).json({
            message: 'Payment declined successfully, email sent.',
            order: updatedOrder
        });
    } catch (error) {
        console.error(`Failed to decline payment for order ID ${orderId}:`, error);
        res.status(500).json({ message: 'Failed to decline payment' });
    }
});

module.exports = router;
