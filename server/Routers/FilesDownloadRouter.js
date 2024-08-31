const express = require('express');
const router = express.Router();
const { bucket } = require('../Configurations/firebase');
const Order = require('../Models/orderCreationModel');

router.get('/download/:orderId/:fileType', async (req, res) => {
    const { orderId, fileType } = req.params;

    if (!orderId || !fileType) {
        console.error('Missing orderId or fileType in request parameters');
        return res.status(400).json({ message: 'Missing orderId or fileType in request parameters' });
    }

    try {
        const order = await Order.findOne({ orderId });
        if (!order) {
            console.error(`Order not found: ${orderId}`);
            return res.status(404).json({ message: 'Order not found' });
        }

        let filePath;
        switch (fileType) {
            case 'problem':
                filePath = order.problemFilePath;
                break;
            case 'description':
                filePath = order.descriptionFilePath;
                break;
            case 'requirement':
                filePath = order.requirementFilePath;
                break;
            case 'paymentReceipt': // Add case for paymentReceipt
                filePath = order.paymentReceiptUrl;
                break;
            default:
                console.error(`Invalid file type: ${fileType}`);
                return res.status(400).json({ message: 'Invalid file type' });
        }

        if (!filePath) {
            console.error(`No ${fileType} file uploaded for order: ${orderId}`);
            return res.status(404).json({ message: `No ${fileType} file uploaded` });
        }

       

        // Create a reference to the file in Firebase Storage
        const file = bucket.file(filePath);

        // Generate a signed URL for the file
        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        res.json({ fileUrl: url });
    } catch (error) {
        console.error(`Error fetching file for order: ${orderId}`, error);
        res.status(500).json({ message: 'Error fetching file', error });
    }
});

module.exports = router;
