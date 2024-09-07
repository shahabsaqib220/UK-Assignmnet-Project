const EmailSetup = require('../Models/EmailSetupModel');
const multer = require('multer');
const orders = require("../Models/orderCreationModel");
const registerstudentemails = require("../Models/RegisterStudentEmailModel");
const { transporter } = require('../utils/emailService');
const { bucket } = require('../Configurations/firebase');
const path = require('path');

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload a file to Firebase
const uploadFileToFirebase = (file, folder) => {
  return new Promise((resolve, reject) => {
    const filename = `${folder}/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(filename);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      console.error(`${folder} stream error:`, err);
      reject(new Error(`Failed to upload ${folder} to Firebase`));
    });

    blobStream.on('finish', async () => {
      try {
        await fileUpload.makePublic();
        const fileURL = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve({ fileURL, filename: file.originalname });
      } catch (error) {
        console.error(`Error making ${folder} public:`, error);
        reject(new Error(`Failed to make ${folder} public`));
      }
    });

    blobStream.end(file.buffer);
  });
};

// Route to update email setup
exports.updateEmailSetup = async (req, res) => {
  try {
    const { text, subject } = req.body;
    const file = req.files?.file?.[0]; // Access file from req.files
    const poster = req.files?.poster?.[0]; // Access poster from req.files

    // Find the current email setup or create a new one if it doesn't exist
    let emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      emailSetup = new EmailSetup();
    }

    // Update text and subject fields
    emailSetup.text = text;
    emailSetup.subject = subject;

    // Upload the file and poster to Firebase, if provided
    const fileUploadPromise = file ? uploadFileToFirebase(file, 'email') : Promise.resolve(null);
    const posterUploadPromise = poster ? uploadFileToFirebase(poster, 'poster') : Promise.resolve(null);

    // Wait for uploads to complete
    const [fileResult, posterResult] = await Promise.all([fileUploadPromise, posterUploadPromise]);

    // If a file or poster was uploaded, update the respective fields
    if (fileResult) {
      emailSetup.filePath = fileResult.fileURL;
      emailSetup.fileName = fileResult.filename;
    }
    if (posterResult) {
      emailSetup.poster = posterResult.fileURL;
      emailSetup.posterName = posterResult.filename;
    }

    // Save the updated email setup in MongoDB
    await emailSetup.save();

    return res.json(emailSetup);
  } catch (err) {
    console.error('Error updating email setup:', err);
    return res.status(500).json({ error: 'Failed to update email setup' });
  }
};

// Route to get the current email setup dynamically
exports.getEmailSetup = async (req, res) => {
  try {
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      return res.status(404).json({ error: 'Email setup not found' });
    }

    // Return the email setup with dynamic filenames if they exist
    const result = {
      text: emailSetup.text,
      subject: emailSetup.subject,
      poster: emailSetup.poster,
      posterName: emailSetup.posterName || 'No poster uploaded',
      filePath: emailSetup.filePath,
      fileName: emailSetup.fileName || 'No file uploaded',
    };

    res.json(result);
  } catch (err) {
    console.error('Error retrieving email setup:', err);
    return res.status(500).json({ error: 'Failed to retrieve email setup' });
  }
};

// Schedule the function to send advertisement emails
exports.sendAdvertisementEmail = async () => {
  try {
    // Fetch the current email setup
    const emailSetup = await EmailSetup.findOne();
    if (!emailSetup) {
      
      return;
    }

    // Fetch all emails from the "orders" and "registerstudentemails" collections
    const orderEmails = await orders.find().select('email -_id');
    const registeredEmails = await registerstudentemails.find().select('email -_id');

    // Combine and deduplicate emails
    const allEmails = [...orderEmails.map(doc => doc.email), ...registeredEmails.map(doc => doc.email)];
    const uniqueEmails = [...new Set(allEmails)];

    if (uniqueEmails.length === 0) {
     
      return;
    }

    // Setup email options
    const mailOptions = {
      from: process.env.GMAIL,
      to: uniqueEmails,
      subject: emailSetup.subject || 'Advertisement Email!',
      html: `
        <div style="width: 600px; margin: 0 auto; padding: 30px; background-color: #759FBC; box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3), 0px 16px 32px rgba(0, 0, 0, 0.2); border-radius: 10px; text-align: center; font-family: Arial, sans-serif;">
          <!-- Subject as the header -->
          <div style="padding: 15px 0; font-size: 26px; font-weight: bold; color: #333; border-bottom: 2px solid #ddd;">
            ${emailSetup.subject}
          </div>

          <!-- Poster image, only if provided -->
          <div style="padding: 30px 0;">
            ${emailSetup.poster ? `<img src="${emailSetup.poster}" alt="Poster" style="max-width: 100%; height: auto; margin: 0 auto; border-radius: 10px;">` : ''}
          </div>

          <!-- Text content -->
          <div style="padding: 20px 0; font-size: 18px; color: #333 ; line-height: 1.6;">
            ${emailSetup.text}
          </div>
        </div>
      `,
      attachments: emailSetup.filePath ? [
        {
          filename: emailSetup.fileName,
          path: emailSetup.filePath,
          cid: 'attachment@file',
          contentType: 'application/octet-stream'
        }
      ] : [] // Only include attachments if the file exists
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('OK Response', info.response);
      }
    });
  } catch (err) {
    console.error('Failed to send advertisement email:', err);
  }
};
