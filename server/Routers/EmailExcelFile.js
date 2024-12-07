const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const Email = require('../Models/RegisterStudentEmailModel'); // Assuming your Email model is here

router.get('/downloadEmails', async (req, res) => {
  try {
    // Fetch all emails from the collection
    const emails = await Email.find({}, 'email -_id');

    if (!emails || emails.length === 0) {
      return res.status(404).json({ error: 'No emails found in the database' });
    }

    // Convert the data into an array of objects
    const emailData = emails.map((email, index) => ({
      No: index + 1,
      Email: email.email,
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(emailData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registered Emails');

    // Write the workbook to a buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers to trigger a file download
    res.setHeader('Content-Disposition', 'attachment; filename="registered_emails.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the buffer as a response
    res.send(buffer);
  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
});

module.exports = router;
