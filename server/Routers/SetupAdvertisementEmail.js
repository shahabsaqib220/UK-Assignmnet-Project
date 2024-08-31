const EmailSetup = require('../Models/EmailSetupModel');
const multer = require('multer');
const orders = require("../Models/orderCreationModel");
const registerstudentemails = require("../Models/RegisterStudentEmailModel");
const { transporter } = require('../utils/emailService');
const EmailCollection = require('../Models/RegisterStudentEmailModel'); 
const {bucket} = require('../Configurations/firebase');
const path = require('path');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to update email setup
// Route to update email setup
exports.updateEmailSetup = async (req, res) => {
  try {
    const { text, subject } = req.body;
    const file = req.file;

   

    // Find the current email setup or create a new one if it doesn't exist
    let emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      emailSetup = new EmailSetup();
    }

    // Update text and subject fields
    emailSetup.text = text;
    emailSetup.subject = subject;

    if (file) {
     
      const filename = `email/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(filename);

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        return res.status(500).json({ error: 'Failed to upload file to Firebase' });
      });

      blobStream.on('finish', async () => {
        try {
         
          await fileUpload.makePublic();
         

          const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
          emailSetup.filePath = fileURL;

          await emailSetup.save();
         
          return res.json(emailSetup);
        } catch (error) {
          console.error('Error making file public:', error);
          return res.status(500).json({ error: 'Failed to make file public' });
        }
      });

      blobStream.end(file.buffer);
    } else {
      // If no file is uploaded, just save the text and subject
      await emailSetup.save();
     
      return res.json(emailSetup);
    }
  } catch (err) {
    console.error('Error updating email setup:', err);
    return res.status(500).json({ error: 'Failed to update email setup' });
  }
};

// Route to get the current email setup
exports.getEmailSetup = async (req, res) => {
  try {
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      return res.status(404).json({ error: 'Email setup not found' });
    }
    res.json(emailSetup);
  } catch (err) {
    console.error('Error retrieving email setup:', err);
    return res.status(500).json({ error: 'Failed to retrieve email setup' });
  }
};







// Schedule the function to send emails
exports.sendAdvertisementEmail = async () => {
  try {
    // Fetch the current email setup
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      console.log('No email setup found');
      return;
    }

    // Fetch all emails from the "orders" and "registerstudentemails" collections
    const orderEmails = await orders.find().select('email -_id');
    const registeredEmails = await registerstudentemails.find().select('email -_id');

    // Combine and deduplicate emails
    const allEmails = [...orderEmails.map(doc => doc.email), ...registeredEmails.map(doc => doc.email)];
    const uniqueEmails = [...new Set(allEmails)];

    if (uniqueEmails.length === 0) {
      console.log('No recipients found');
      return;
    }

    // Setup email options
    const mailOptions = {
      from: 'shahabsaqib220@gmail.com',
      to: uniqueEmails,
      subject: emailSetup.subject || 'Advertisement Email!',
      text: emailSetup.text,
      attachments: emailSetup.filePath ? [
        {
          filename: path.basename(emailSetup.filePath),
          path: emailSetup.filePath,
          cid: 'poster@offer',
          contentType: 'application/octet-stream'
        }
      ] : []
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Advertisement email sent:', info.response);
      }
    });
  } catch (err) {
    console.error('Failed to send advertisement email:', err);
  }
};



